'use server';

import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

// Define the Todo type
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

// Path to our JSON file that will act as a simple database
const todosFilePath = path.join(process.cwd(), 'todos.json');

// Initialize the todos file if it doesn't exist
const initTodosFile = () => {
  if (!fs.existsSync(todosFilePath)) {
    fs.writeFileSync(todosFilePath, JSON.stringify([], null, 2));
  }
};

// Get all todos
export async function getTodos(): Promise<Todo[]> {
  initTodosFile();
  const todosData = fs.readFileSync(todosFilePath, 'utf-8');
  return JSON.parse(todosData);
}

// Add a new todo
export async function addTodo(formData: FormData) {
  const text = formData.get('text') as string;
  
  if (!text || text.trim() === '') {
    return { error: 'Todo text cannot be empty' };
  }

  initTodosFile();
  const todos = await getTodos();
  
  const newTodo: Todo = {
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
  };
  
  todos.push(newTodo);
  fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
  
  revalidatePath('/');
  return { success: true };
}

// Toggle todo completion status
export async function toggleTodo(id: string) {
  const todos = await getTodos();
  const updatedTodos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  
  fs.writeFileSync(todosFilePath, JSON.stringify(updatedTodos, null, 2));
  
  revalidatePath('/');
  return { success: true };
}

// Delete a todo
export async function deleteTodo(id: string) {
  const todos = await getTodos();
  const updatedTodos = todos.filter(todo => todo.id !== id);
  
  fs.writeFileSync(todosFilePath, JSON.stringify(updatedTodos, null, 2));
  
  revalidatePath('/');
  return { success: true };
}
