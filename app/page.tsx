import { getTodos } from './actions';
import AddTodoForm from './components/AddTodoForm';
import TodoItem from './components/TodoItem';
import ErrorBoundary from './components/ErrorBoundary';

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Next.js Todo App
        </h1>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Todo List</h2>
          
          <ErrorBoundary fallback={<div className="text-red-500">Error adding todo. Please try again.</div>}>
            <AddTodoForm />
          </ErrorBoundary>
          
          <div className="mt-4">
            {todos.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No todos yet. Add one above!</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">About This App</h3>
          <p className="text-gray-600">
            This is a full-stack todo application with a Next.js frontend and Laravel API backend.
            The backend is deployed on AWS ECS, and the frontend is hosted on AWS Amplify.
          </p>
        </div>
      </div>
    </main>
  );
}
