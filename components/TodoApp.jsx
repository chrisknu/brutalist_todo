'use client'

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { getAllTodos, addTodo, updateTodo, deleteTodo } from '../lib/db';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [alert, setAlert] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const loadedTodos = await getAllTodos();
      setTodos(loadedTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      setAlert('TYPE SOMETHING');
      setTimeout(() => setAlert(''), 3000);
      return;
    }
    
    const todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    try {
      await addTodo(todo);
      await loadTodos();
      setNewTodo('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleToggleTodo = async (todo) => {
    try {
      await updateTodo({
        ...todo,
        completed: !todo.completed
      });
      await loadTodos();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      await loadTodos();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 font-mono">
      <div className="max-w-4xl mx-auto border-4 border-black">
        <div className="border-b-4 border-black p-4 bg-black">
          <h1 className="text-3xl font-bold text-white uppercase tracking-tight">
            TODO OR NOT TODO
          </h1>
        </div>
        
        <div className="p-4">
          {alert && (
            <div className="mb-6 bg-black text-white p-4 animate-pulse">
              <p className="text-2xl">{alert}</p>
            </div>
          )}
          
          <form onSubmit={handleAddTodo} className="flex gap-0 mb-8">
            <Input
              type="text"
              placeholder="WHAT NEEDS TO BE DONE?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-1 border-4 border-black rounded-none text-lg p-4 placeholder:text-gray-500 focus:outline-none focus:ring-0"
            />
            <Button type="submit" 
              className="bg-black text-white border-4 border-black text-lg px-8 rounded-none hover:bg-white hover:text-black transition-none">
              ADD
            </Button>
          </form>

          <div className="space-y-4">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`
                  flex items-center justify-between p-4 
                  border-4 border-black
                  ${todo.completed ? 'bg-black text-white' : 'bg-white text-black'}
                `}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleToggleTodo(todo)}
                    className="focus:outline-none"
                  >
                    {todo.completed ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  <span className={`text-lg ${todo.completed ? 'line-through' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <Button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className={`
                    rounded-none border-2 border-current p-2
                    ${todo.completed ? 
                      'text-white hover:bg-white hover:text-black' : 
                      'text-black hover:bg-black hover:text-white'}
                  `}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
            
            {todos.length === 0 && (
              <div className="text-center py-12 border-4 border-black">
                <p className="text-2xl font-bold">NO TODOS</p>
                <p className="text-lg">ADD ONE ABOVE</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;