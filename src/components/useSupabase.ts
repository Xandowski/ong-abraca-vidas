import { useContext } from 'react';
import { SupabaseContext } from './SupabaseProvider';

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}
