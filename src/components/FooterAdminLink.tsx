"use client";

import { useSupabase } from '@/hooks/useSupabase';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export function FooterAdminLink() {
  const { session } = useSupabase();

  // Se autenticado → vai para Dashboard
  // Se não autenticado → vai para Login
  const href = session ? '/dashboard' : '/login';
  const ariaLabel = session 
    ? 'Ir para o painel administrativo' 
    : 'Acesso administrativo';

  return (
    <Link 
      href={href} 
      className="inline-flex items-center gap-1 mt-3 text-xs text-gray-500 hover:text-gray-300 transition-colors"
      aria-label={ariaLabel}
    >
      <Lock className="h-3 w-3" aria-hidden="true" />
      <span>Admin</span>
    </Link>
  );
}

