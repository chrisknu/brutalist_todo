'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, Mic, MicOff } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { getAllTodos, addTodo, updateTodo, deleteTodo } from '../lib/db';
import type { Todo, Category } from '../lib/types';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { SpeechRecognition, SpeechRecognitionEvent } from '../lib/speech-types';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: 'WORK', color: '#000000' },
  { id: 'personal', name: 'PERSONAL', color: '#000000' },
  { id: 'shopping', name: 'SHOPPING', color: '#000000' },
  { id: 'health', name: 'HEALTH', color: '#000000' },
];

// Memoized TodoItem component
const TodoItem = React.memo(
  ({
    todo,
    onToggle,
    onDelete,
  }: {
    todo: Todo;
    onToggle: (todo: Todo) => void;
    onDelete: (id: string) => void;
  }) => (
    <div
      className="flex items-center gap-2 p-2 border-2 border-border bg-background"
      data-todo-item
    >
      <button onClick={() => onToggle(todo)} className="hover:opacity-70">
        {todo.completed ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
      </button>
      <span className={`flex-1 ${todo.completed ? 'line-through opacity-50' : ''}`}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)} className="hover:opacity-70">
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  )
);

TodoItem.displayName = 'TodoItem';

const TodoApp = () => {
  const [mounted, setMounted] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [alert, setAlert] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [filter, setFilter] = useState<string>('all');
  const [isListening, setIsListening] = useState(false);
  const { theme, setTheme } = useTheme();
  const parentRef = React.useRef<HTMLDivElement>(null);
  const dragCleanupRef = React.useRef<(() => void)[]>([]);

  useEffect(() => {
    setMounted(true);
    loadTodos();
  }, []);

  // Sort todos by order
  const sortedTodos = useMemo(
    () => [...todos].sort((a: Todo, b: Todo) => (a.order || 0) - (b.order || 0)),
    [todos]
  );

  // Filter todos based on current filter
  const filteredTodos = sortedTodos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'done') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return todo.categoryId === filter;
  });

  // Setup drag and drop once
  useEffect(() => {
    if (!parentRef.current) return;

    // Cleanup previous handlers
    dragCleanupRef.current.forEach((cleanup) => cleanup());
    dragCleanupRef.current = [];

    const todoItems = parentRef.current.querySelectorAll('[data-todo-item]');

    todoItems.forEach((item, index) => {
      const cleanup = draggable({
        element: item as HTMLElement,
        getInitialData: () => ({
          index,
          id: filteredTodos[index].id,
          sourceOrder: filteredTodos[index].order,
        }),
      });
      dragCleanupRef.current.push(cleanup);
    });

    const dropCleanup = dropTargetForElements({
      element: parentRef.current,
      onDrop: async ({ source, location }) => {
        const sourceId = source.data.id as string;
        const sourceOrder = source.data.sourceOrder as number;
        const overElement = location.current.dropTargets[0];
        if (!overElement) return;

        const todoElements = Array.from(todoItems);
        const destinationIndex = todoElements.indexOf(overElement.element as HTMLElement);
        const destinationOrder = filteredTodos[destinationIndex].order;

        // Get all todos in their current order
        const newTodos = [...todos].sort((a, b) => (a.order || 0) - (b.order || 0));
        const sourceItem = newTodos.find((t) => t.id === sourceId);
        if (!sourceItem) return;

        // Remove the source item
        newTodos.splice(
          newTodos.findIndex((t) => t.id === sourceId),
          1
        );

        // Find the insertion index based on the destination order
        const insertionIndex = newTodos.findIndex((t) => (t.order || 0) > destinationOrder);
        const finalIndex = insertionIndex === -1 ? newTodos.length : insertionIndex;

        // Insert at the correct position
        newTodos.splice(finalIndex, 0, sourceItem);

        // Update all orders
        const updatedTodos = newTodos.map((todo, idx) => ({
          ...todo,
          order: idx,
        }));

        setTodos(updatedTodos);

        // Update all todos in database
        for (const todo of updatedTodos) {
          await updateTodo(todo);
        }
      },
    });
    dragCleanupRef.current.push(dropCleanup);

    return () => {
      dragCleanupRef.current.forEach((cleanup) => cleanup());
      dragCleanupRef.current = [];
    };
  }, [filteredTodos.length, filteredTodos, todos]);

  const loadTodos = async () => {
    try {
      const loadedTodos = await getAllTodos();
      setTodos(loadedTodos.sort((a: Todo, b: Todo) => (a.order || 0) - (b.order || 0)));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const todo: Omit<Todo, 'id'> & { id: string } = {
        id: crypto.randomUUID(),
        text: newTodo,
        completed: false,
        createdAt: new Date().toISOString(),
        categoryId: selectedCategory,
        order: todos.length,
        subtasks: [],
      };

      const addedTodo = await addTodo(todo);
      setTodos([...todos, addedTodo]);
      setNewTodo('');
      setAlert('Todo added successfully');
    } catch (error) {
      console.error('Error adding todo:', error);
      setAlert('Failed to add todo');
    }
  };

  const rowVirtualizer = useVirtualizer({
    count: filteredTodos.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  const memoizedHandleToggleTodo = useCallback(async (todo: Todo) => {
    try {
      await updateTodo({
        ...todo,
        completed: !todo.completed,
      });
      await loadTodos();
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  const memoizedHandleDeleteTodo = useCallback(
    async (id: string) => {
      try {
        await deleteTodo(id);
        setTodos(todos.filter((todo) => todo.id !== id));
        setAlert('Todo deleted successfully');
      } catch (error) {
        setAlert('Failed to delete todo');
      }
    },
    [todos]
  );

  const toggleVoiceInput = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition() as SpeechRecognition;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const text = event.results[0][0].transcript;
        setNewTodo(text);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <div className="max-w-4xl mx-auto brutalist-container border-border">
        <div className="bg-foreground p-4 flex justify-between items-center border-b-4 border-border">
          <h1 className="text-3xl text-background font-bold tracking-tight">TODO_OR_NOT_TODO</h1>
          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="brutalist-button border-background text-background hover:bg-background hover:text-foreground"
          >
            {theme === 'dark' ? 'LIGHT' : 'DARK'}
          </Button>
        </div>

        <div className="p-4 bg-background text-foreground">
          <div className="h-16 mb-4">
            {alert && (
              <div className="bg-foreground text-background p-4 font-bold border-4 border-border">
                {alert}
              </div>
            )}
          </div>

          <form onSubmit={handleAddTodo} className="mb-6">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="WHAT NEEDS TO BE DONE?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1 brutalist-input border-border bg-background text-foreground placeholder:text-foreground/70"
              />
              <Button
                type="button"
                onClick={toggleVoiceInput}
                className="brutalist-button border-border text-foreground hover:bg-foreground hover:text-background"
              >
                {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              <Button
                type="submit"
                className="brutalist-button border-border text-foreground hover:bg-foreground hover:text-background px-8"
              >
                ADD
              </Button>
            </div>

            <div className="flex gap-2 mt-4">
              {DEFAULT_CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`brutalist-button ${
                    selectedCategory === category.id
                      ? 'bg-foreground text-background'
                      : 'border-border text-foreground hover:bg-foreground hover:text-background'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </form>

          <div className="flex gap-2 mb-4 flex-wrap">
            {['ALL', 'ACTIVE', 'DONE', ...DEFAULT_CATEGORIES.map((c) => c.name)].map(
              (filterName) => (
                <Button
                  key={filterName}
                  onClick={() => setFilter(filterName.toLowerCase())}
                  className={`brutalist-button ${
                    filter === filterName.toLowerCase()
                      ? 'bg-foreground text-background'
                      : 'border-border text-foreground hover:bg-foreground hover:text-background'
                  }`}
                >
                  {filterName}
                </Button>
              )
            )}
          </div>

          <div ref={parentRef} className="h-[400px] overflow-auto">
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow: VirtualItem) => {
                const todo = filteredTodos[virtualRow.index];
                return (
                  <div
                    key={todo.id}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <TodoItem
                      todo={todo}
                      onToggle={memoizedHandleToggleTodo}
                      onDelete={memoizedHandleDeleteTodo}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {todos.length === 0 && (
            <div className="text-center py-12 brutalist-container border-border">
              <p className="text-4xl font-bold text-foreground tracking-tight">NO_TODOS</p>
              <p className="text-xl text-foreground uppercase mt-2">ADD_ONE_ABOVE</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TodoApp);
