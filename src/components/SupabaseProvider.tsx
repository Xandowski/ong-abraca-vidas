"use client";

import { createBrowserClient } from '@supabase/ssr';
import type { Session } from '@supabase/supabase-js';
import { createContext, useMemo } from 'react';

interface SupabaseProviderProps {
  children: React.ReactNode;
  initialSession: Session | null;
}

const SupabaseContext = createContext<{ supabase: ReturnType<typeof createBrowserClient>; session: Session | null } | undefined>(undefined);

export function SupabaseProvider({ children, initialSession }: SupabaseProviderProps) {
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);

  return (
    <SupabaseContext.Provider value={{ supabase, session: initialSession }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export { SupabaseContext };
