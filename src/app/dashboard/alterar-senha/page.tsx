'use client';

import { Button } from '@/components/ui/button';
import { useSupabase } from '@/hooks/useSupabase';
import { ArrowLeft, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AlterarSenhaPage() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error('Preencha todos os campos');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('A nova senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      // Supabase não valida senha atual automaticamente na atualização
      // Para validar senha atual, precisamos tentar fazer signIn
      const { data: sessionData } = await supabase.auth.getSession();
      const userEmail = sessionData.session?.user?.email;

      if (!userEmail) {
        toast.error('Usuário não encontrado');
        setLoading(false);
        return;
      }

      // Valida senha atual tentando fazer signIn
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: formData.currentPassword,
      });

      if (signInError) {
        toast.error('Senha atual incorreta');
        setLoading(false);
        return;
      }

      // Atualiza a senha
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });

      if (error) {
        console.error('Erro ao atualizar senha:', error);
        toast.error('Erro ao atualizar senha. Tente novamente.');
        setLoading(false);
        return;
      }

      // Sucesso!
      toast.success('Senha alterada com sucesso!');
      
      // Limpa o formulário
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      // Volta para o dashboard após 1.5s
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="mb-2"
            aria-label="Voltar para o dashboard"
          >
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Alterar Senha</h1>
          <p className="text-gray-600 mt-1">Troque sua senha de acesso ao sistema</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-ong-primary/10 p-3 rounded-full">
              <Lock className="h-6 w-6 text-ong-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Trocar Senha</h2>
              <p className="text-sm text-gray-600">Mantenha sua conta segura</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Senha Atual */}
            <div>
              <label 
                htmlFor="currentPassword" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha Atual <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ong-primary"
                placeholder="Digite sua senha atual"
                aria-required="true"
              />
            </div>

            {/* Nova Senha */}
            <div>
              <label 
                htmlFor="newPassword" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nova Senha <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ong-primary"
                placeholder="Digite a nova senha (mín. 6 caracteres)"
                aria-required="true"
                aria-describedby="password-hint"
              />
              <p id="password-hint" className="text-xs text-gray-500 mt-1">
                Mínimo de 6 caracteres
              </p>
            </div>

            {/* Confirmar Nova Senha */}
            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmar Nova Senha <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ong-primary"
                placeholder="Digite a nova senha novamente"
                aria-required="true"
              />
            </div>

            {/* Botão de Submissão */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-ong-primary hover:bg-ong-orange-dark text-white font-semibold py-2 mt-6"
            >
              {loading ? 'Alterando...' : 'Alterar Senha'}
            </Button>
          </form>

          {/* Dicas de Segurança */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Dicas de segurança:</h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Use uma senha forte e única</li>
              <li>• Misture letras, números e símbolos</li>
              <li>• Não compartilhe sua senha</li>
              <li>• Altere sua senha periodicamente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

