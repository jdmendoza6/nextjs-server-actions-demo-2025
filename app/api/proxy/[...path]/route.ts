import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'http://localhost:8000/api';

async function handleRequest(
  request: NextRequest,
  path: string[],
  method: string
) {
  const url = `${API_BASE_URL}/${path.join('/')}`;
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const options: RequestInit = {
      method,
      headers,
    };

    // Add body for POST, PUT methods
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const contentType = request.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        options.body = JSON.stringify(await request.json());
      } else {
        options.body = await request.text();
      }
    }

    console.log(`Proxying ${method} request to:`, url);
    const response = await fetch(url, options);
    
    // Handle 204 No Content responses
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    // Handle other responses
    const data = await response.json().catch(() => null);
    
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error);
    return NextResponse.json(
      { error: `Failed to ${method.toLowerCase()} data` },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'DELETE');
}
