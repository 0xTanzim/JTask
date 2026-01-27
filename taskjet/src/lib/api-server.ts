import { cookies } from 'next/headers';

const API_BASE_URL = 'http://localhost:8081/api';

async function getAuthHeaders(): Promise<HeadersInit> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    throw new Error('Not authenticated');
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || `Request failed with status ${response.status}`
    );
  }
  if (
    response.status === 204 ||
    response.headers.get('content-length') === '0'
  ) {
    return null;
  }
  return response.json();
}

// Server-side API calls (for data fetching in Server Components)
export const serverApi = {
  categories: {
    async getAll() {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        headers: await getAuthHeaders(),
        cache: 'no-store', // Always get fresh data
      });
      return handleResponse(response);
    },
  },

  tasks: {
    async getAll(categoryId?: string) {
      const url = categoryId
        ? `${API_BASE_URL}/tasks?categoryId=${categoryId}`
        : `${API_BASE_URL}/tasks`;

      const response = await fetch(url, {
        headers: await getAuthHeaders(),
        cache: 'no-store',
      });
      return handleResponse(response);
    },
  },
};
