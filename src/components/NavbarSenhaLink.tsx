"use client";

import { useSupabase } from '@/hooks/useSupabase';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export function NavbarSenhaLink() {
  const { session } = useSupabase();

  if (!session) return null;

  return (
    <Link 
      href="/dashboard/alterar-senha" 
      className="text-gray-700 hover:text-ong-primary py-2 transition-colors flex items-center gap-2"
      aria-label="Alterar senha"
    >
      <Lock className='h-5 w-5' aria-hidden="true" />
      <span>Senha</span>
    </Link>
  );
}

