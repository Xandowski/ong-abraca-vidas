import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const type = searchParams.get('type');
    
    let query = supabase
      .from('animals')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Adiciona filtros se necessário
    if (type) {
      query = query.eq('type', type);
    }
    
    if (limit) {
      query = query.limit(limit);
    }
    
    const { data: animals, error } = await query;

    if (error) {
      console.error('Error fetching animals:', error);
      return NextResponse.json(
        { error: 'Error fetching animals' },
        { status: 500 }
      );
    }

    return NextResponse.json(animals);
  } catch (error) {
    console.error('Error in animals route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}