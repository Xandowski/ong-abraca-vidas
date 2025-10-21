"use client";

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    subject: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    subject: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {
      subject: '',
      email: '',
      message: ''
    };
    let isValid = true;

    if (!formData.subject.trim()) {
      newErrors.subject = 'O assunto é obrigatório';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'O email é obrigatório';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Digite um email válido';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'A mensagem é obrigatória';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    
    try {
      console.log('Enviando formulário:', formData);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-lg"
      aria-label="Formulário de contato"
      noValidate
    >
      <div className="mb-4" role="group" aria-labelledby="subject-label">
        <label 
          id="subject-label"
          htmlFor="subject" 
          className="block text-sm font-medium text-gray-700"
        >
          Assunto
          <span aria-hidden="true" className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={['mt-1 block w-full rounded-md shadow-sm focus:ring-ong-teal focus:border-ong-teal',
            errors.subject ? 'border-red-500' : 'border-gray-300'
          ].join(' ')}
          placeholder="Digite o assunto"
          aria-required="true"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          required
        />
        {errors.subject && (
          <p 
            id="subject-error" 
            className="mt-1 text-sm text-red-500" 
            role="alert"
          >
            {errors.subject}
          </p>
        )}
      </div>

      <div className="mb-4" role="group" aria-labelledby="email-label">
        <label 
          id="email-label"
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700"
        >
          Email
          <span aria-hidden="true" className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={['mt-1 block w-full rounded-md shadow-sm focus:ring-ong-teal focus:border-ong-teal',
            errors.email ? 'border-red-500' : 'border-gray-300'
          ].join(' ')}
          placeholder="Digite seu email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          required
          autoComplete="email"
        />
        {errors.email && (
          <p 
            id="email-error" 
            className="mt-1 text-sm text-red-500" 
            role="alert"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div className="mb-4" role="group" aria-labelledby="message-label">
        <label 
          id="message-label"
          htmlFor="message" 
          className="block text-sm font-medium text-gray-700"
        >
          Mensagem
          <span aria-hidden="true" className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={['mt-1 block w-full rounded-md shadow-sm focus:ring-ong-teal focus:border-ong-teal',
            errors.message ? 'border-red-500' : 'border-gray-300'
          ].join(' ')}
          placeholder="Digite sua mensagem"
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          required
        />
        {errors.message && (
          <p 
            id="message-error" 
            className="mt-1 text-sm text-red-500" 
            role="alert"
          >
            {errors.message}
          </p>
        )}
      </div>

      <Button 
        type="submit"
        className="bg-ong-teal text-white hover:bg-teal-600 w-full"
        disabled={submitting}
        aria-busy={submitting}
      >
        {submitting ? 'Enviando...' : 'Enviar'}
      </Button>

      <div className="mt-4" role="note">
        <p className="text-sm text-gray-500">
          <span aria-hidden="true" className="text-red-500">*</span>
          {' '}Campos obrigatórios
        </p>
      </div>
    </form>
  );
}