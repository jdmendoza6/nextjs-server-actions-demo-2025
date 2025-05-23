'use client';

import { useEffect, useState } from 'react';

export default function ApiStatus() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch('/api/proxy/todos');
        if (response.ok) {
          setStatus('connected');
        } else {
          setStatus('error');
          setErrorMessage(`API returned status: ${response.status}`);
        }
      } catch (error) {
        setStatus('error');
        setErrorMessage('Could not connect to the API');
        console.error('API connection error:', error);
      }
    };

    checkApiStatus();
  }, []);

  return (
    <div className="mt-4 text-sm">
      <div className="flex items-center">
        <span className="mr-2">API Status:</span>
        {status === 'loading' && (
          <span className="flex items-center">
            <span className="h-2 w-2 bg-yellow-400 rounded-full mr-1"></span>
            Checking connection...
          </span>
        )}
        {status === 'connected' && (
          <span className="flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
            Connected to Laravel API
          </span>
        )}
        {status === 'error' && (
          <span className="flex items-center">
            <span className="h-2 w-2 bg-red-500 rounded-full mr-1"></span>
            Connection error
          </span>
        )}
      </div>
      {errorMessage && <p className="text-red-500 mt-1">{errorMessage}</p>}
    </div>
  );
}
