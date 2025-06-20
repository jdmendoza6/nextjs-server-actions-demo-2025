'use server';

import { revalidatePath } from 'next/cache';
// Removed cache import as we're not using it anymore

// Define the Todo type
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

// Use environment variable for API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';


// Get all todos without caching
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      // cache: 'no-store',
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    
    // Transform the Laravel API response to match our Todo type
    const data = await response.json();
    return data.map((item: {id: number; title: string; completed: boolean}) => ({
      id: item.id.toString(),
      text: item.title, // Map Laravel's 'title' to our 'text'
      completed: item.completed
    }));
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

// Add a new todo
export async function addTodo(formData: FormData) {
  const text = formData.get('text') as string;
  
  if (!text || text.trim() === '') {
    return { error: 'Todo text cannot be empty' };
  }

  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        title: text.trim() // Send as 'title' for Laravel API
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to add todo' };
    }
    
    // revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error adding todo:', error);
    return { error: 'Failed to add todo' };
  }
}

// Toggle todo completion status
export async function toggleTodo(id: string) {
  try {
    const response = await fetch(`${API_URL}/todos/${id}/toggle`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      return { error: 'Failed to toggle todo' };
    }
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error toggling todo:', error);
    return { error: 'Failed to toggle todo' };
  }
}

// Delete a todo
export async function deleteTodo(id: string) {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok && response.status !== 204) {
      return { error: 'Failed to delete todo' };
    }
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting todo:', error);
    return { error: 'Failed to delete todo' };
  }
}