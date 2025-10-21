import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function FetchAnimals() {
    try {
        const { data, error } = await supabase
            .from('animals')
            .select('*')
            .eq('isAdopted', false)
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error("Error fetching animals:", error);
            return [];
        }
        
        return data || [];
    } catch (error) {
        console.error("Error fetching animals:", error);
        return [];
    }
}