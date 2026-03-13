'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { contactFormSchema, type ContactFormInput } from '@/lib/validators';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const subjectOptions = [
    { value: '', label: t('subjectPlaceholder') },
    { value: 'General Inquiry', label: 'General Inquiry' },
    { value: 'Booking Question', label: 'Booking Question' },
    { value: 'Partnership', label: 'Partnership' },
    { value: 'Feedback', label: 'Feedback' },
  ];

  const onSubmit = async (data: ContactFormInput) => {
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-brand-black mb-2">
          {t('success')}
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => setStatus('idle')}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label={t('name')}
          id="contact-name"
          placeholder={t('namePlaceholder')}
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label={t('email')}
          id="contact-email"
          type="email"
          placeholder={t('emailPlaceholder')}
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label={t('phone')}
          id="contact-phone"
          type="tel"
          placeholder={t('phonePlaceholder')}
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Select
          label={t('subject')}
          id="contact-subject"
          options={subjectOptions}
          error={errors.subject?.message}
          {...register('subject')}
        />
      </div>

      <Textarea
        label={t('message')}
        id="contact-message"
        placeholder={t('messagePlaceholder')}
        rows={5}
        error={errors.message?.message}
        {...register('message')}
      />

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{t('error')}</span>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            {t('send')}
          </>
        )}
      </Button>
    </form>
  );
}
