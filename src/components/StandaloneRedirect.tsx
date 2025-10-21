"use client";

import { useSupabase } from "@/hooks/useSupabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

export function StandaloneRedirect() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkStandalone = async () => {
      const nav = navigator as NavigatorStandalone;
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || nav.standalone;
      
      if (isStandalone) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          router.push('/dashboard');
        } else {
          router.push('/login');
        }
      }
      setChecking(false);
    };

    checkStandalone();
  }, [router, supabase]);

  // O componente não renderiza nada visualmente
  if (checking) return null;
  return null;
}