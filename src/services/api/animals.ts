import { Animal } from '@/types/database';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function fetchAnimals(params?: { limit?: number, type?: string }) {
  try {
    let query = supabase
      .from('animals')
      .select('*')
      .order('created_at', { ascending: false });

    if (params?.limit) {
      query = query.limit(params.limit);
    }

    if (params?.type) {
      query = query.eq('type', params.type);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to fetch animals');
    }

    return (data || []) as Animal[];
  } catch (error) {
    console.error('Error fetching animals:', error);
    return [];
  }
}