'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, Mic, MicOff } from 'lucide-react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useTheme } from 'next-themes';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { getAllTodos, addTodo, updateTodo, deleteTodo } from '../lib/db';
import { DraggableTodoList } from './DraggableTodoList';
import type { Todo, Category } from '../lib/types';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('personal');
  const [filter, setFilter] = useState<string>('all');
  const [isListening, setIsListening] = useState(false);
  const { theme, setTheme } = useTheme();

  const loadTodos = async () => {
    try {
      const loadedTodos = await getAllTodos();
      // Ensure all todos have an order
      const todosWithOrder = loadedTodos.map((todo, index) => ({
        ...todo,
        order: todo.order ?? index,
      }));
      setTodos(todosWithOrder.sort((a, b) => a.order - b.order));
    } catch (error) {
      setAlert('Failed to load todos');
      console.error('Failed to load todos:', error);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const newTodoItem = {
        id: crypto.randomUUID(),
        text: newTodo,
        completed: false,
        categoryId: selectedCategory,
        createdAt: new Date().toISOString(),
        subtasks: [],
        order: todos.length,
      };

      const addedTodo = await addTodo(newTodoItem);
      setTodos((prev) => [...prev, addedTodo].sort((a, b) => a.order - b.order));
      setNewTodo('');
    } catch (error) {
      setAlert('Failed to add todo');
      console.error('Failed to add todo:', error);
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      const updatedTodo = await updateTodo({
        ...todo,
        completed: !todo.completed,
      });
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updatedTodo : t)));
    } catch (error) {
      setAlert('Failed to update todo');
      console.error('Failed to update todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      setAlert('Failed to delete todo');
      console.error('Failed to delete todo:', error);
    }
  };

  const toggleVoiceInput = () => {
    // Implement voice input functionality here
    setIsListening(!isListening);
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination || result.source.droppableId !== 'droppable-todos') return;

    try {
      const { source, destination } = result;

      // Get the current filtered and sorted list
      const filteredTodos = todos
        .filter((todo) => {
          if (filter === 'all') return true;
          if (filter === 'done') return todo.completed;
          if (filter === 'active') return !todo.completed;
          return todo.categoryId === filter.toLowerCase();
        })
        .sort((a, b) => a.order - b.order);

      // Find the actual todos being moved
      const [movedTodo] = filteredTodos.splice(source.index, 1);
      filteredTodos.splice(destination.index, 0, movedTodo);

      // Update orders for all todos
      const updatedTodos = todos.map((todo) => {
        const filteredIndex = filteredTodos.findIndex((t) => t.id === todo.id);
        return {
          ...todo,
          order: filteredIndex !== -1 ? filteredIndex : todo.order,
        };
      });

      // Update state immediately for smooth UI
      setTodos(updatedTodos);

      // Persist changes to database
      await Promise.all(updatedTodos.map((todo) => updateTodo(todo)));
    } catch (error) {
      setAlert('Failed to reorder todos');
      console.error('Failed to reorder todos:', error);
      // Reload todos to ensure consistency
      await loadTodos();
    }
  };

  useEffect(() => {
    setMounted(true);
    loadTodos();
  }, []);

  if (!mounted) return null;

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === 'all') return true;
      if (filter === 'done') return todo.completed;
      if (filter === 'active') return !todo.completed;
      return todo.categoryId === filter.toLowerCase();
    })
    .sort((a, b) => a.order - b.order);

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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
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

            <div className="mt-4">
              <p className="text-sm mb-2">
                Category:{' '}
                {selectedCategory
                  ? DEFAULT_CATEGORIES.find((c) => c.id === selectedCategory)?.name
                  : 'PERSONAL'}
              </p>
              <div className="flex gap-2">
                {DEFAULT_CATEGORIES.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`border-2 px-4 py-2 ${
                      selectedCategory === category.id
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                    }`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </form>

          <div className="flex gap-2 mb-4">
            {['ALL', 'ACTIVE', 'DONE', ...DEFAULT_CATEGORIES.map((c) => c.name)].map(
              (filterName) => (
                <Button
                  key={filterName}
                  onClick={() => setFilter(filterName.toLowerCase())}
                  className={`border-2 px-4 py-2 ${
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

          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="space-y-2">
              <DraggableTodoList
                todos={filteredTodos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                categories={DEFAULT_CATEGORIES}
              />
              {todos.length === 0 && (
                <div className="text-center py-12 border-4 border-black dark:border-white">
                  <p className="text-3xl font-bold text-black dark:text-white">NO_TODOS</p>
                  <p className="text-xl text-black dark:text-white">ADD_ONE_ABOVE</p>
                </div>
              )}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
