import { Animal } from '@/types/database';

export async function fetchAnimals(params?: { limit?: number, type?: string }) {
  const queryParams = new URLSearchParams();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  if (params?.limit) {
    queryParams.append('limit', params.limit.toString());
  }
  
  if (params?.type) {
    queryParams.append('type', params.type);
  }

  const path = `/api/animals${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  
  try {
    const response = await fetch(`${baseUrl}${path}`);
    if (!response.ok) {
      throw new Error('Failed to fetch animals');
    }
    const data = await response.json();
    return data as Animal[];
  } catch (error) {
    console.error('Error fetching animals:', error);
    throw error;
  }
}