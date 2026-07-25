'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import { SEOHead } from '@/components/layout/SEOHead';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

interface ServiceItem {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  heroImage: string;
}

export default function ServicesPage() {
  const { lang } = useI18n();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackServices: ServiceItem[] = [
    {
      id: '1',
      slug: 'interior-design',
      titleEn: 'Interior Design',
      titleAr: 'التصميم الداخلي',
      descEn: 'Bespoke luxury residential & commercial interiors.',
      descAr: 'تصاميم داخلية فاخرة مخصصة للفلل والمساحات التجارية.',
      heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      slug: 'architecture',
      titleEn: 'Architecture',
      titleAr: 'العمارة والتخطيط',
      descEn: 'Master planning, facade engineering & iconic structures.',
      descAr: 'تخطيط رئيسي وتصميم واجهات معمارية وأيقونات إنشائية.',
      heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    },
  ];

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await axios.get('/api/services');
        if (res.data && res.data.length > 0) {
          setServices(res.data);
        } else {
          setServices(fallbackServices);
        }
      } catch (err) {
        console.error('Failed to fetch services', err);
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <>
      <SEOHead
        title={lang === 'en' ? 'Engineering & Interior Services | Origin Consulting Interior' : 'الخدمات والتخصصات | أوريجين للإستشارات والديكور'}
        description={lang === 'en' ? 'Explore Origin Consulting Interior 9 core disciplines.' : 'استكشف التخصصات والخدمات الهندسية والتصميمية لشركة أوريجين للإستشارات.'}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">
            {lang === 'en' ? 'Our Disciplines' : 'تخصصاتنا'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2">
            {lang === 'en' ? 'Integrated Engineering & Architectural Excellence' : 'تميز معماري وهندسي متكامل'}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => {
              const title = lang === 'en' ? s.titleEn : s.titleAr;
              const desc = lang === 'en' ? s.descEn : s.descAr;
              return (
                <Card key={s.slug} className="flex flex-col justify-between group hover:border-brand-gold">
                  <div>
                    {s.heroImage && (
                      <img src={s.heroImage} alt={title} className="w-full h-44 object-cover rounded-md mb-4 border border-neutral-800" />
                    )}
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">{title}</h3>
                    <p className="text-neutral-400 text-sm mt-3 leading-relaxed">{desc}</p>
                  </div>
                  <Link href={`/${lang}/services/${s.slug}`} className="mt-6 inline-flex items-center text-xs uppercase tracking-widest text-brand-gold font-semibold gap-2">
                    <span>{lang === 'en' ? 'View Details' : 'عرض التفاصيل'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
