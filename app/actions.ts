'use server';

import { revalidatePath } from 'next/cache';
import { cache } from 'react';

// Define the Todo type to match Laravel API structure
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
};

// Get all todos with caching for better performance
export const getTodos = cache(async (): Promise<Todo[]> => {
  try {
    const response = await fetch('http://localhost:8000/api/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching to always get fresh data
    });
    
    if (!response.ok) {
      console.error('Failed to fetch todos:', response.statusText);
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
});

// Add a new todo
export async function addTodo(formData: FormData) {
  const title = formData.get('text') as string;
  
  if (!title || title.trim() === '') {
    return { error: 'Todo title cannot be empty' };
  }

  try {
    const response = await fetch('http://localhost:8000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title.trim() }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return { 
        error: errorData?.message || `Failed to add todo: ${response.statusText}` 
      };
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error adding todo:', error);
    return { error: 'Failed to add todo due to a network error' };
  }
}

// Toggle todo completion status
export async function toggleTodo(id: string) {
  try {
    const response = await fetch(`http://localhost:8000/api/todos/${id}/toggle`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to toggle todo:', response.statusText);
      return { error: 'Failed to toggle todo' };
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error toggling todo:', error);
    return { error: 'Failed to toggle todo due to a network error' };
  }
}

// Delete a todo
export async function deleteTodo(id: string) {
  try {
    const response = await fetch(`http://localhost:8000/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok && response.status !== 204) {
      console.error('Failed to delete todo:', response.statusText);
      return { error: 'Failed to delete todo' };
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting todo:', error);
    return { error: 'Failed to delete todo due to a network error' };
  }
}
