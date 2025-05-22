import { getTodos } from './actions';
import AddTodoForm from './components/AddTodoForm';
import TodoItem from './components/TodoItem';

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Next.js Server Actions Demo
        </h1>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Todo List</h2>
          
          <AddTodoForm />
          
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
          <h3 className="text-lg font-medium mb-2">About Server Actions</h3>
          <p className="text-gray-600">
            This demo showcases Next.js Server Actions, which allow you to define 
            server-side functions that can be called directly from client components.
            In this example, adding, toggling, and deleting todos are all handled by 
            server actions.
          </p>
        </div>
      </div>
    </main>
  );
}
