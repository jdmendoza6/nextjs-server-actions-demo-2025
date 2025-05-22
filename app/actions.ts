'use server';

import { revalidatePath } from 'next/cache';
import { cache } from 'react';

// Define the Todo type
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

// In-memory storage for todos
// Note: This will reset on server restart/redeploy
let todos: Todo[] = [];

// Get all todos with caching for better performance
export const getTodos = cache(async (): Promise<Todo[]> => {
  return [...todos];
});

// Add a new todo
export async function addTodo(formData: FormData) {
  const text = formData.get('text') as string;
  
  if (!text || text.trim() === '') {
    return { error: 'Todo text cannot be empty' };
  }

  const newTodo: Todo = {
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
  };
  
  todos.push(newTodo);
  
  revalidatePath('/');
  return { success: true };
}

// Toggle todo completion status
export async function toggleTodo(id: string) {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  
  revalidatePath('/');
  return { success: true };
}

// Delete a todo
export async function deleteTodo(id: string) {
  todos = todos.filter(todo => todo.id !== id);
  
  revalidatePath('/');
  return { success: true };
}
