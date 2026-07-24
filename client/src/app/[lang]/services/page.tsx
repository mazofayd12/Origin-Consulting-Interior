'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import { SEOHead } from '@/components/layout/SEOHead';
import { Card } from '@/components/ui/Card';
import { ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const { lang } = useI18n();

  const services = [
    {
      slug: 'interior-design',
      title: lang === 'en' ? 'Interior Design' : 'التصميم الداخلي',
      desc: lang === 'en' ? 'Bespoke luxury residential & commercial interiors.' : 'تصاميم داخلية فاخرة مخصصة للفلل والمساحات التجارية.',
    },
    {
      slug: 'architecture',
      title: lang === 'en' ? 'Architecture' : 'العمارة والتخطيط',
      desc: lang === 'en' ? 'Master planning, facade engineering & iconic structures.' : 'تخطيط رئيسي وتصميم واجهات معمارية وأيقونات إنشائية.',
    },
    {
      slug: 'structural-engineering',
      title: lang === 'en' ? 'Structural Engineering' : 'الهندسة الإنتاشئية',
      desc: lang === 'en' ? 'Advanced seismic and high-rise structural design.' : 'تحليل إنشائي متقدم وتصميم خرساني للأبراج والمباني العالية.',
    },
    {
      slug: 'electrical-engineering',
      title: lang === 'en' ? 'Electrical Engineering' : 'الهندسة الكهربائية',
      desc: lang === 'en' ? 'Smart power distribution & low-voltage automation.' : 'أنظمة توزيع الطاقة وتيار خفيف وأتمتة المباني الذكية.',
    },
    {
      slug: 'mechanical-engineering',
      title: lang === 'en' ? 'Mechanical Engineering' : 'الهندسة الميكانيكية',
      desc: lang === 'en' ? 'High-performance thermal & HVAC system engineering.' : 'أنظمة التكييف والتهوية وتبريد المناطق عالية الأداء.',
    },
    {
      slug: 'mep-engineering',
      title: lang === 'en' ? 'MEP Engineering' : 'الهندسة الكهروميكانيكية',
      desc: lang === 'en' ? 'Integrated MEP coordination & authority compliance.' : 'تنسيق كهروميكانيكي متكامل مع تخليص جميع الاعتمادات.',
    },
    {
      slug: 'fit-out',
      title: lang === 'en' ? 'Turnkey Fit-Out' : 'التشطيبات والتسليم على المفتاح',
      desc: lang === 'en' ? 'Precision execution, joinery, and luxury finishes.' : 'تنفيذ فائق الدقة وأعمال الموبيليا والتشطيبات الفاخرة.',
    },
    {
      slug: 'project-management',
      title: lang === 'en' ? 'Project Management' : 'إدارة المشاريع',
      desc: lang === 'en' ? 'Agile cost management, timelines & site supervision.' : 'إدارة ميزانيات وتداول جداول زمنية وإشراف ميداني.',
    },
    {
      slug: '3d-visualization',
      title: lang === 'en' ? '3D Visualization' : 'الإظهار ثلاثي الأبعاد والواقع الافتراضي',
      desc: lang === 'en' ? 'Photorealistic architectural rendering & VR walk-throughs.' : 'رندر ثلاثي الأبعاد فائق الواقعية وجولات واقع افتراضي.',
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <Card key={s.slug} className="flex flex-col justify-between group hover:border-brand-gold">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">{s.title}</h3>
                <p className="text-neutral-400 text-sm mt-3 leading-relaxed">{s.desc}</p>
              </div>
              <Link href={`/${lang}/services/${s.slug}`} className="mt-6 inline-flex items-center text-xs uppercase tracking-widest text-brand-gold font-semibold gap-2">
                <span>{lang === 'en' ? 'View Details' : 'عرض التفاصيل'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
