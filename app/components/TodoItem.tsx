'use client';

import { Todo, toggleTodo, deleteTodo } from '../actions';
import { useState } from 'react';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleToggle() {
    try {
      setIsToggling(true);
      setError(null);
      const result = await toggleTodo(todo.id.toString());
      if (result.error) {
        setError(result.error);
      }
    } finally {
      setIsToggling(false);
    }
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);
      setError(null);
      const result = await deleteTodo(todo.id.toString());
      if (result.error) {
        setError(result.error);
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <li className="flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            disabled={isToggling}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <span 
            className={`ml-3 ${todo.completed ? 'line-through text-gray-500' : ''}`}
          >
            {todo.title}
          </span>
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-500 hover:text-red-700 focus:outline-none disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
      {error && (
        <div className="p-2 text-sm text-red-600 bg-red-50">
          {error}
        </div>
      )}
    </li>
  );
}
