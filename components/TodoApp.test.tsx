import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoApp from './TodoApp';
import type { Todo } from '../lib/types';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

// Mock the database module
jest.mock('../lib/db', () => {
  const mockTodos: Todo[] = [];

  return {
    getAllTodos: jest.fn().mockImplementation(() => Promise.resolve(mockTodos)),
    addTodo: jest.fn().mockImplementation((todo: Partial<Todo>) => {
      const newTodo: Todo = {
        id: '1',
        text: todo.text || '',
        completed: false,
        createdAt: new Date().toISOString(),
        categoryId: todo.categoryId || 'personal',
        subtasks: [],
        order: mockTodos.length,
      };
      mockTodos.push(newTodo);
      return Promise.resolve(newTodo);
    }),
    updateTodo: jest.fn().mockImplementation((todo: Todo) => Promise.resolve(todo)),
    deleteTodo: jest.fn().mockImplementation((id: string) => {
      const index = mockTodos.findIndex((t) => t.id === id);
      if (index !== -1) {
        mockTodos.splice(index, 1);
      }
      return Promise.resolve();
    }),
  };
});

describe('TodoApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the todo form', async () => {
    render(<TodoApp />);

    expect(screen.getByPlaceholderText('WHAT NEEDS TO BE DONE?')).toBeInTheDocument();
    expect(screen.getByText('ADD')).toBeInTheDocument();
  });

  it('adds a new todo', async () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText('WHAT NEEDS TO BE DONE?');
    const button = screen.getByText('ADD');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('New Todo')).toBeInTheDocument();
    });

    expect(input).toHaveValue('');
  });
});
