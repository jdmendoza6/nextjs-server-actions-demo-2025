'use client';

import { useRef, useState } from 'react';
import { addTodo } from '../actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {pending ? 'Adding...' : 'Add Todo'}
    </button>
  );
}

export default function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  
  async function handleAddTodo(formData: FormData) {
    setError(null);
    const result = await addTodo(formData);
    
    if (result.success) {
      formRef.current?.reset();
    } else if (result.error) {
      setError(result.error);
    }
  }
  
  return (
    <div>
      <form ref={formRef} action={handleAddTodo} className="mb-2 flex gap-2">
        <input
          type="text"
          name="text"
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <SubmitButton />
      </form>
      
      {error && (
        <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
