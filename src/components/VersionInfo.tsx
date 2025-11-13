'use client';

import { useEffect } from 'react';

export function VersionInfo() {
  useEffect(() => {
    console.log('🚀 ONG Abraça Vidas - Versão Deploy');
    console.log('📅 Última atualização: 13/11/2025');
    console.log('✅ PIX corrigido e funcional');
    console.log('💡 Branch: heber/ajustes-finais-pi2');
  }, []);

  return null; // Componente invisível, só para o log
}

