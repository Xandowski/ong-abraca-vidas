'use client';

import { useEffect } from 'react';

export function VersionInfo() {
  useEffect(() => {
    // Pega variáveis injetadas pelo Vercel durante o build
    const commitMessage = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE || 'Desenvolvimento local';
    const commitSha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'local';
    const branch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || 'local';
    
    // Pega apenas a primeira linha da mensagem do commit
    const firstLine = commitMessage.split('\n')[0];
    
    console.log('🚀 ONG Abraça Vidas - Versão Deploy');
    console.log('📅 Última atualização:', new Date().toLocaleString('pt-BR'));
    console.log('✅ Último commit:', firstLine);
    console.log('🔖 Hash:', commitSha.substring(0, 7)); // Mostra apenas os 7 primeiros caracteres
    console.log('💡 Branch:', branch);
  }, []);

  return null; // Componente invisível, só para o log
}

