"use client";

import { createPagesBrowserClient, Session } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

export function SupabaseProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: Session | null;
}) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={initialSession}
    >
      {children}
    </SessionContextProvider>
  );
}