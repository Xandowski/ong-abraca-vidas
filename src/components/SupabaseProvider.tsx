"use client";

import { createPagesBrowserClient, Session } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export function SupabaseProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: Session | null;
}) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  useEffect(() => {
    const validateSession = async () => {
      if (initialSession?.user) {
        const { data: { user }, error } = await supabaseClient.auth.getUser();
        if (error || !user) {
          await supabaseClient.auth.signOut();
        }
      }
    };
    validateSession();
  }, [supabaseClient, initialSession]);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={initialSession}
    >
      {children}
    </SessionContextProvider>
  );
}