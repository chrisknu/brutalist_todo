'use client';

import React, { useState, useEffect } from 'react';
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

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: 'WORK', color: '#000000' },
  { id: 'personal', name: 'PERSONAL', color: '#000000' },
  { id: 'shopping', name: 'SHOPPING', color: '#000000' },
  { id: 'health', name: 'HEALTH', color: '#000000' },
];

const TodoApp = () => {
  const [mounted, setMounted] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [alert, setAlert] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [filter, setFilter] = useState<string>('all');
  const [isListening, setIsListening] = useState(false);
  const { theme, setTheme } = useTheme();
  const todosContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    loadTodos();
  }, []);

  // Add drag and drop effect after todos load
  useEffect(() => {
    if (!todosContainerRef.current) return;

    const todoItems = todosContainerRef.current.querySelectorAll('[data-todo-item]');
    const cleanupFns: (() => void)[] = [];

    todoItems.forEach((item, index) => {
      const cleanup = draggable({
        element: item as HTMLElement,
        getInitialData: () => ({ index }),
      });
      cleanupFns.push(cleanup);
    });

    const dropCleanup = dropTargetForElements({
      element: todosContainerRef.current,
      onDrop: async ({ source, location }) => {
        const sourceIndex = source.data.index as number;
        const overElement = location.current.dropTargets[0];
        if (!overElement) return;

        const todoElements = Array.from(todoItems);
        const destinationIndex = todoElements.indexOf(overElement.element as HTMLElement);

        if (sourceIndex !== destinationIndex) {
          const newTodos = Array.from(todos);
          const [removed] = newTodos.splice(sourceIndex, 1);
          newTodos.splice(destinationIndex, 0, removed);

          const updatedTodos = newTodos.map((todo, idx) => ({
            ...todo,
            order: idx,
          }));

          setTodos(updatedTodos);
          for (const todo of updatedTodos) {
            await updateTodo(todo);
          }
        }
      },
    });
    cleanupFns.push(dropCleanup);

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, [todos]);

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

  const handleToggleTodo = async (todo: Todo) => {
    try {
      await updateTodo({
        ...todo,
        completed: !todo.completed,
      });
      await loadTodos();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      setAlert('Todo deleted successfully');
    } catch (error) {
      setAlert('Failed to delete todo');
    }
  };

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

  // Sort todos by order
  const sortedTodos = [...todos].sort((a: Todo, b: Todo) => a.order - b.order);

  // Filter todos based on current filter
  const filteredTodos = sortedTodos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'done') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return todo.categoryId === filter;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black font-mono text-black dark:text-white">
      <div className="max-w-4xl mx-auto border-4 border-black dark:border-white">
        <div className="bg-black dark:bg-white p-4 flex justify-between items-center">
          <h1 className="text-2xl text-white dark:text-black font-bold">TODO_OR_NOT_TODO</h1>
          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="border-2 border-white dark:border-black text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
          >
            {theme === 'dark' ? 'LIGHT' : 'DARK'}
          </Button>
        </div>

        <div className="p-4 bg-white dark:bg-black text-black dark:text-white">
          <div className="h-16 mb-4">
            {alert && (
              <div className="bg-black dark:bg-white text-white dark:text-black p-4">{alert}</div>
            )}
          </div>

          <form onSubmit={handleAddTodo} className="mb-6">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="WHAT NEEDS TO BE DONE?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
              />
              <Button
                type="button"
                onClick={toggleVoiceInput}
                className="border-2 border-black dark:border-white text-black dark:text-white"
              >
                {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              <Button
                type="submit"
                className="border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                ADD
              </Button>
            </div>

            <div className="flex gap-2 mt-4">
              {DEFAULT_CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`border-2 ${
                    selectedCategory === category.id
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </form>

          <div className="flex gap-2 mb-4">
            {['ALL', 'ACTIVE', 'DONE', ...DEFAULT_CATEGORIES.map((c) => c.name)].map(
              (filterName) => (
                <Button
                  key={filterName}
                  onClick={() => setFilter(filterName.toLowerCase())}
                  className={`border-2 ${
                    filter === filterName.toLowerCase()
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                  }`}
                >
                  {filterName}
                </Button>
              )
            )}
          </div>

          <div className="space-y-2" ref={todosContainerRef}>
            {filteredTodos.map((todo, index) => (
              <div
                key={todo.id}
                data-todo-item
                className="flex items-center justify-between p-4 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white cursor-move"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleToggleTodo(todo)}
                    className="text-black dark:text-white hover:text-black/70 dark:hover:text-white/70"
                  >
                    {todo.completed ? <CheckCircle2 /> : <Circle />}
                  </button>
                  <span className={todo.completed ? 'line-through opacity-50' : ''}>
                    {todo.text}
                  </span>
                </div>
                <Button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {todos.length === 0 && (
              <div className="text-center py-12 border-4 border-black dark:border-white">
                <p className="text-3xl font-bold text-black dark:text-white">NO_TODOS</p>
                <p className="text-xl text-black dark:text-white">ADD_ONE_ABOVE</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
