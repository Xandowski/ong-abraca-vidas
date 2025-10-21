import { useSupabase } from '@/hooks/useSupabase';

export async function FetchAnimals(){
    const { supabase } = useSupabase();

    try {
        const { data, error } = await supabase
        .from('animals')
        .select('*')
        .eq('isAdopted', false)
        .order('created_at', { ascending: false });
        
        return data || [];
    } catch (error) {
        console.error("Error fetching animals:", error);
        return [];
    }
}