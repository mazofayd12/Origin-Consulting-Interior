'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18n } from '@/i18n/context';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Alert } from '@/components/ui/Alert';
import { MapPin, Phone, MessageSquare, Send } from 'lucide-react';
import axios from 'axios';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(6, 'Valid phone number required'),
  subject: z.string().min(1, 'Please select a discipline'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { lang, t } = useI18n();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    email: 'info@origin-consulting.com',
    phoneDubai: '+971 4 800 67444',
    phoneRiyadh: '+966 11 400 9900',
    whatsappNumber: '971480067444',
    addressDubai: 'Dubai Marina Plaza, Suite 2804, Dubai, UAE',
    addressRiyadh: 'King Fahd Road, KAFD Tower 12, Riyadh, KSA',
  });

  React.useEffect(() => {
    axios.get('/api/settings')
      .then((res) => {
        if (res.data?.contact) {
          setContactInfo((prev) => ({ ...prev, ...res.data.contact }));
        }
      })
      .catch(() => {});
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: 'Architecture',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    setSuccess(false);
    setErrorMsg('');
    try {
      await axios.post('/api/contact', data);
      setSuccess(true);
      reset();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title={lang === 'en' ? 'Contact Us | Origin Consulting Interior' : 'اتصل بنا | أوريجين للإستشارات والديكور'}
        description={lang === 'en' ? 'Connect with Origin Consulting Interior senior architectural partners.' : 'تواصل مع شركاء أوريجين للإستشارات في دبي والرياض.'}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">
            {lang === 'en' ? 'Executive Connect' : 'التواصل التنفيذي'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2">{t('contact.title')}</h1>
          <p className="mt-4 text-neutral-300 font-light">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-panel p-8 rounded-lg border border-brand-gold/30">
            <h3 className="text-2xl font-bold text-white mb-6">
              {lang === 'en' ? 'Send Executive Inquiry' : 'إرسال طلب استشارة تنفيذي'}
            </h3>

            {success && <Alert type="success" message={t('contact.success')} className="mb-6" />}
            {errorMsg && <Alert type="danger" message={errorMsg} className="mb-6" />}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label={t('contact.name')}
                placeholder={lang === 'en' ? 'Sheikh / Eng. Full Name' : 'الاسم بالكامل'}
                {...register('name')}
                error={errors.name?.message}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label={t('contact.email')}
                  type="email"
                  placeholder="name@company.com"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <Input
                  label={t('contact.phone')}
                  placeholder="+971 50 000 0000"
                  {...register('phone')}
                  error={errors.phone?.message}
                />
              </div>

              <Select
                label={t('contact.subject')}
                options={[
                  { label: lang === 'en' ? 'Architecture' : 'العمارة والتخطيط', value: 'Architecture' },
                  { label: lang === 'en' ? 'Interior Design' : 'التصميم الداخلي', value: 'Interior Design' },
                  { label: lang === 'en' ? 'MEP Engineering' : 'الهندسة الكهروميكانيكية', value: 'MEP Engineering' },
                  { label: lang === 'en' ? 'Turnkey Fit-Out' : 'التشطيبات والتسليم على المفتاح', value: 'Turnkey Fit-Out' },
                  { label: lang === 'en' ? 'Project Management' : 'إدارة المشاريع', value: 'Project Management' },
                ]}
                {...register('subject')}
                error={errors.subject?.message}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {t('contact.message')}
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold"
                  placeholder={lang === 'en' ? 'Describe project scope, location, and timeline...' : 'اكتب تفاصيل نطاق المشروع والموقع والجدول الزمني...'}
                  {...register('message')}
                />
                {errors.message?.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full gap-2" isLoading={loading}>
                <span>{t('contact.submit')}</span>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Contact Details & Direct WhatsApp */}
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6">
              <div className="glass-panel p-6 rounded-lg flex items-start gap-4">
                <MapPin className="w-6 h-6 text-brand-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold">{lang === 'en' ? 'Dubai Head Atelier' : 'المقر الرئيسي دبي'}</h4>
                  <p className="text-neutral-400 text-sm mt-1">{contactInfo.addressDubai}</p>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-lg flex items-start gap-4">
                <MapPin className="w-6 h-6 text-brand-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold">{lang === 'en' ? 'Riyadh Regional Office' : 'المكتب الإقليمي الرياض'}</h4>
                  <p className="text-neutral-400 text-sm mt-1">{contactInfo.addressRiyadh}</p>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-lg flex items-start gap-4">
                <Phone className="w-6 h-6 text-brand-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold">{lang === 'en' ? 'Direct Phone Hotline & Email' : 'الخط المباشر والبريد الإلكتروني'}</h4>
                  <p className="text-neutral-400 text-sm mt-1">{contactInfo.phoneDubai} | {contactInfo.phoneRiyadh}</p>
                  <p className="text-brand-gold text-xs font-mono mt-1">{contactInfo.email}</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Chat Trigger */}
            <a
              href={`https://wa.me/${contactInfo.whatsappNumber.replace(/[^\d]/g, '')}?text=Hello%20Origin%20Consulting,%20I%20would%20like%20to%20discuss%20a%20new%20project.`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-5 rounded-lg flex items-center justify-center gap-3 transition-colors shadow-luxury"
            >
              <MessageSquare className="w-6 h-6" />
              <span>{lang === 'en' ? 'Instant Executive WhatsApp Chat' : 'المحادثات المباشرة عبر الواتساب'}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
