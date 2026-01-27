import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'http://localhost:8081/api';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  console.log(
    '[FRONTEND] Token from cookie:',
    token ? token.substring(0, 20) + '...' : 'NULL'
  );

  if (!token) {
    console.error('[FRONTEND] No auth token found in cookies');
    return NextResponse.json(
      { error: 'Unauthorized - No token' },
      { status: 401 }
    );
  }

  console.log('[FRONTEND] Sending request to:', `${API_BASE_URL}/categories`);
  console.log(
    '[FRONTEND] Authorization header:',
    `Bearer ${token.substring(0, 20)}...`
  );

  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('[FRONTEND] Backend response status:', response.status);

    const data = await response.json();
    console.log('[FRONTEND] Backend response data:', data);

    if (!response.ok) {
      console.error(
        '[FRONTEND] Backend returned error:',
        response.status,
        data
      );
      return NextResponse.json(
        { error: 'Backend error', details: data },
        { status: response.status }
      );
    }

    console.log('[FRONTEND] Returning successful response');
    return NextResponse.json(data);
  } catch (error) {
    console.error('[FRONTEND] Route handler error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}
