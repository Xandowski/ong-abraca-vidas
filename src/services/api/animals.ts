import { useSupabase } from '@/components/useSupabase';
import { Animal } from '@/types/database';

export const useAnimalService = () => {
  const { supabase } = useSupabase();

  return {
    getFeatured: async (): Promise<Animal[]> => {
        const { data, error } = await supabase
        .from('animals')
        .select('*')
        .eq('isAdopted', false)
        .order('created_at', { ascending: false })
        .limit(4);

        if (error) throw error;
        return data || [];
    },

    getAll: async (): Promise<Animal[]> => {
        const { data, error } = await supabase
        .from('animals')
        .select('*')
        .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    getById: async (id: string): Promise<Animal | null> => {
        const { data, error } = await supabase
        .from('animals')
        .select('*')
        .eq('id', id)
        .single();

        if (error) throw error;
        return data;
    },

    create: async (animal: Omit<Animal, 'id' | 'created_at'>): Promise<Animal> => {
        const { data, error } = await supabase
        .from('animals')
        .insert(animal)
        .select()
        .single();

        if (error) throw error;
        return data;
    },

    update: async (id: string, animal: Partial<Animal>): Promise<Animal> => {
        const { data, error } = await supabase
        .from('animals')
        .update(animal)
        .eq('id', id)
        .select()
        .single();

        if (error) throw error;
        return data;
    }
  }
}