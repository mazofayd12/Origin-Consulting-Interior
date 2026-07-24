'use client';

import React from 'react';
import { useI18n } from '@/i18n/context';
import { SEOHead } from '@/components/layout/SEOHead';
import { Card } from '@/components/ui/Card';
import { Target, Eye, Gem } from 'lucide-react';

export default function AboutPage() {
  const { lang, t } = useI18n();

  const timeline = [
    {
      year: '2011',
      title: lang === 'en' ? 'Founding Atelier' : 'تأسيس الأتيليه المعماري',
      desc: lang === 'en' ? 'Established in Dubai Marina as a boutique interior architecture atelier.' : 'تأسست الشركة في دبي مارينا كاستوديو تصميم معماري فاخر.',
    },
    {
      year: '2016',
      title: lang === 'en' ? 'MEP Integration' : 'التوسع في الهندسة الكهروميكانيكية',
      desc: lang === 'en' ? 'Expanded into full-scope MEP and Structural engineering consultancy.' : 'التوسع في تقديم استشارات الهندسة الإنستائية والكهروميكانيكية الشاملة.',
    },
    {
      year: '2021',
      title: lang === 'en' ? 'KAFD Headquarters' : 'مقر مركز الملك عبد الله المالي (كافد)',
      desc: lang === 'en' ? 'Opened regional head office in KAFD, Riyadh to lead GCC mega-projects.' : 'افتتاح المقر الإقليمي في كافد بالرياض لقيادة المشاريع العملاقة.',
    },
    {
      year: '2026',
      title: lang === 'en' ? 'Net-Zero Luxury Pioneer' : 'ريادة العمارة الخضراء المستدامة',
      desc: lang === 'en' ? 'Pioneering sustainable luxury villas and smart architectural developments.' : 'ريادة الفلل السكنية الفاخرة المستدامة والمشاريع المعمارية الذكية.',
    },
  ];

  const team = [
    {
      name: lang === 'en' ? 'Alexander Wright' : 'ألكسندر رايت',
      role: lang === 'en' ? 'Principal Design Director' : 'مدير التصميم الرئيسي',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: lang === 'en' ? 'Eng. Sarah Al-Hassan' : 'م. سارة الحسن',
      role: lang === 'en' ? 'Director of MEP Engineering' : 'مديرة الهندسة الكهروميكانيكية',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: lang === 'en' ? 'Marco Bellini' : 'ماركو بيليني',
      role: lang === 'en' ? 'Head of Interior Joinery' : 'رئيس قسم الديكور والموبيليا الحرفية',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <>
      <SEOHead
        title={lang === 'en' ? 'About Us | Origin Consulting Interior' : 'عن الشركة | أوريجين للإستشارات والديكور'}
        description={lang === 'en' ? 'Learn about Origin Consulting Interior legacy, vision, mission, timeline, and leadership.' : 'تعرف على إرث ورؤية ومهمة شركة أوريجين للإستشارات والديكور وفريق القيادة.'}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">
            {lang === 'en' ? 'About Our Firm' : 'عن شركتنا'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2">
            {lang === 'en' ? 'Engineering Precision. Uncompromised Luxury.' : 'دقة هندسية. فخامة بلا مساومة.'}
          </h1>
          <p className="mt-4 text-neutral-300 leading-relaxed font-light">
            {t('about.story')}
          </p>
        </div>

        {/* Vision, Mission, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
          <Card className="text-center flex flex-col items-center">
            <Eye className="w-10 h-10 text-brand-gold mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{lang === 'en' ? 'Our Vision' : 'رؤيتنا'}</h3>
            <p className="text-neutral-400 text-sm">{t('about.vision')}</p>
          </Card>
          <Card className="text-center flex flex-col items-center">
            <Target className="w-10 h-10 text-brand-gold mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{lang === 'en' ? 'Our Mission' : 'مهمتنا'}</h3>
            <p className="text-neutral-400 text-sm">{t('about.mission')}</p>
          </Card>
          <Card className="text-center flex flex-col items-center">
            <Gem className="w-10 h-10 text-brand-gold mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{lang === 'en' ? 'Core Values' : 'قيمنا الجوهرية'}</h3>
            <p className="text-neutral-400 text-sm">{t('about.values')}</p>
          </Card>
        </div>

        {/* Timeline */}
        <div className="my-24">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            {lang === 'en' ? 'Interactive Milestone Journey' : 'محطات مسيرتنا الإستراتيجية'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {timeline.map((item, idx) => (
              <div key={idx} className="glass-panel p-6 border-l-2 border-l-brand-gold">
                <span className="text-3xl font-extrabold gold-gradient-text">{item.year}</span>
                <h4 className="text-lg font-bold text-white mt-2">{item.title}</h4>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="my-24">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            {lang === 'en' ? 'Executive Leadership' : 'الفريق التنفيذي والإداري'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((m, idx) => (
              <Card key={idx} className="text-center">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border-2 border-brand-gold/40"
                />
                <h4 className="text-lg font-bold text-white">{m.name}</h4>
                <span className="text-xs text-brand-gold font-medium uppercase tracking-widest">{m.role}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
