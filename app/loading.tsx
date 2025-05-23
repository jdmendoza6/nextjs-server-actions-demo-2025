export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Next.js Todo App
        </h1>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Todo List</h2>
          
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-6"></div>
            
            <div className="mt-4">
              <div className="h-12 bg-gray-200 rounded mb-2"></div>
              <div className="h-12 bg-gray-200 rounded mb-2"></div>
              <div className="h-12 bg-gray-200 rounded mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
