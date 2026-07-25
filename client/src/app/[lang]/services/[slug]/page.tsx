'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CheckCircle, ChevronDown, ArrowLeft, Loader2 } from 'lucide-react';
import axios from 'axios';

interface ServiceDetailData {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descEn: string;
  descAr: string;
  heroImage: string;
  benefitsEn: string[];
  benefitsAr: string[];
  processEn: { step: string; title: string; desc: string }[];
  processAr: { step: string; title: string; desc: string }[];
  faqEn: { q: string; a: string }[];
  faqAr: { q: string; a: string }[];
  gallery: string[];
}

export default function ServiceDetailPage() {
  const params = useParams();
  const rawSlug = (params?.slug as string) || '';
  const slug = decodeURIComponent(rawSlug);
  const { lang } = useI18n();

  const [service, setService] = useState<ServiceDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fallbackService: ServiceDetailData = {
    id: '1',
    slug: 'interior-design',
    titleEn: 'Interior Design',
    titleAr: 'التصميم الداخلي',
    subtitleEn: 'Bespoke Luxury Interiors',
    subtitleAr: 'تصاميم داخلية فاخرة مخصصة',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    descEn: 'Our Interior Design team brings together master architects and precision engineers to deliver extraordinary space concepts.',
    descAr: 'يقدم فريق التصاميم الداخلية لدينا أرقى مفاهيم المساحات الفاخرة للفلل والمشاريع التجارية.',
    benefitsEn: ['Custom Luxury Finishes', 'Architectural Precision', 'Smart Lighting Integration'],
    benefitsAr: ['تشطيبات فاخرة مخصصة', 'دقة معمارية فائقة', 'دمج أنظمة الإضاءة الذكية'],
    processEn: [
      { step: '01', title: 'Consultation & Discovery', desc: 'Understanding functional scope & spatial parameters.' },
      { step: '02', title: 'Schematic Engineering', desc: 'Developing load calculations & material moodboards.' },
    ],
    processAr: [
      { step: '01', title: 'الاستشارة والاكتشاف', desc: 'فهم النطاق الوظيفي ومتطلبات المساحة.' },
      { step: '02', title: 'الهندسة التخطيطية', desc: 'تطوير الحسابات الإنشائية ومخططات المواد.' },
    ],
    faqEn: [
      { q: 'What is the lead time for projects?', a: 'Initial concept blueprints take 2-4 weeks.' },
    ],
    faqAr: [
      { q: 'ما هي مدة تسليم المخططات؟', a: 'تستغرق المفاهيم الأولية بين 2 إلى 4 أسابيع.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    ],
  };

  useEffect(() => {
    async function fetchServiceDetail() {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await axios.get(`/api/services/${encodeURIComponent(slug)}`);
        if (res.data && res.data.id) {
          setService(res.data);
        } else {
          setService(fallbackService);
        }
      } catch (err) {
        console.error('Failed to fetch service detail', err);
        setService(fallbackService);
      } finally {
        setLoading(false);
      }
    }
    fetchServiceDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
      </div>
    );
  }

  const s = service || fallbackService;
  const title = lang === 'en' ? s.titleEn : s.titleAr;
  const desc = lang === 'en' ? s.descEn : s.descAr;
  const benefits = lang === 'en' ? s.benefitsEn : s.benefitsAr;
  const process = lang === 'en' ? s.processEn : s.processAr;
  const faqs = lang === 'en' ? s.faqEn : s.faqAr;
  const gallery = s.gallery && s.gallery.length > 0 ? s.gallery : [s.heroImage];

  return (
    <>
      <SEOHead title={`${title} | Origin Consulting Interior`} description={desc} />

      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-neutral-800">
        <img src={s.heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm" />
        <div className="relative z-10 text-center max-w-4xl px-4">
          <Link href={`/${lang}/services`} className="inline-flex items-center text-xs uppercase tracking-widest text-brand-gold gap-2 mb-4 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'en' ? 'Back to All Services' : 'العودة لجميع الخدمات'}</span>
          </Link>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">{title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Description & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">{lang === 'en' ? 'Service Overview' : 'نظرة عامة'}</span>
            <h2 className="text-3xl font-extrabold text-white mt-2 mb-4">{lang === 'en' ? 'Precision Engineering & Aesthetics' : 'دقة هندسية وجمالية فائقة'}</h2>
            <p className="text-neutral-300 leading-relaxed" dir={lang === 'ar' ? 'rtl' : 'ltr'}>{desc}</p>
          </div>
          {benefits && benefits.length > 0 && (
            <Card>
              <h3 className="text-xl font-bold text-white mb-6">{lang === 'en' ? 'Key Client Benefits' : 'المميزات الرئيسية للعميل'}</h3>
              <div className="flex flex-col gap-4 text-sm">
                {benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Process */}
        {process && process.length > 0 && (
          <div className="my-24">
            <h2 className="text-3xl font-bold text-center text-white mb-12">{lang === 'en' ? 'Our Execution Methodology' : 'منهجية التنفيذ الإنشائي والمعماري'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {process.map((p, idx) => (
                <div key={idx} className="glass-panel p-6 border-t-2 border-t-brand-gold">
                  <span className="text-2xl font-bold text-brand-gold">{p.step || `0${idx + 1}`}</span>
                  <h4 className="text-lg font-bold text-white mt-2">{p.title}</h4>
                  <p className="text-xs text-neutral-400 mt-2">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {gallery && gallery.length > 0 && (
          <div className="my-24">
            <h2 className="text-3xl font-bold text-center text-white mb-12">{lang === 'en' ? 'Project Showcase Gallery' : 'معرض الصور المعمارية'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gallery.map((img, idx) => (
                <div key={idx} className="h-80 rounded-lg overflow-hidden border border-neutral-800 shadow-luxury">
                  <img src={img} alt="Showcase" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {faqs && faqs.length > 0 && (
          <div className="my-24 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-12">{lang === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}</h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="glass-panel rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center font-semibold text-white hover:text-brand-gold"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180 text-brand-gold' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-sm text-neutral-400 border-t border-neutral-800 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center bg-neutral-900 border border-brand-gold/30 rounded-lg p-12">
          <h3 className="text-3xl font-extrabold text-white">{lang === 'en' ? `Require ${title} Consultation?` : `هل ترغب بشرارة استشارة في ${title}؟`}</h3>
          <p className="text-neutral-400 mt-2 mb-6">{lang === 'en' ? 'Our technical team is ready to evaluate your architectural schematics.' : 'فريقنا الهندسي جاهز لتقييم المخططات المعمارية الخاصة بك.'}</p>
          <Link href={`/${lang}/contact`}>
            <Button size="lg" variant="gold">{lang === 'en' ? 'Inquire Now' : 'طلب استشارة الآن'}</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
