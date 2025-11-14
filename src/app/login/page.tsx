'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSupabase } from '@/hooks/useSupabase';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Key } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

const Login = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: error.message,
        });
        setIsLoading(false);
        return;
      }
  
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();
  
      if (profileError || profile?.role !== "admin") {
        toast({
          variant: "destructive",
          title: "Acesso negado",
          description: "Apenas administradores podem acessar esta área.",
        });
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando...",
        duration: 500,
      });

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-ong-light py-12">
        <div className="w-full max-w-md px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <div className="inline-flex mb-4">
                <Image src="/logo.png" alt="ONG Abraça Vidas - Logo" width={80} height={80} className="rounded-md"/>
              </div>
              <h1 className="text-2xl font-bold text-ong-dark">Bem-vindo de volta</h1>
              <p className="text-gray-600 mt-1">Faça login para continuar</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input 
                            placeholder="seu@email.com" 
                            className="pl-10" 
                            {...field}
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input 
                            type="password" 
                            placeholder="******" 
                            className="pl-10" 
                            {...field}
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-right">
                  <Link href="/forgot-password" className="text-sm text-ong-primary hover:underline">
                    Esqueceu sua senha?
                  </Link>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-ong-primary hover:bg-ong-orange-dark" 
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
                
                <div className="text-center mt-6">
                  {/* <p className="text-gray-600">
                    Não tem uma conta?{" "}
                    <Link href="/register" className="text-ong-primary hover:underline">
                      Cadastre-se
                    </Link>
                  </p> */}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
