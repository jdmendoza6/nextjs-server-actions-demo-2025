'use client';

import { Todo, toggleTodo, deleteTodo } from '../actions';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between p-3 border-b border-gray-200">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
        />
        <span 
          className={`ml-3 ${todo.completed ? 'line-through text-gray-500' : ''}`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700 focus:outline-none"
      >
        Delete
      </button>
    </li>
  );
}
