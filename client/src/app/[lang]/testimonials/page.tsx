'use client';

import React from 'react';
import { useI18n } from '@/i18n/context';
import { SEOHead } from '@/components/layout/SEOHead';
import { Card } from '@/components/ui/Card';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsPage() {
  const { lang } = useI18n();

  const reviews = [
    {
      name: lang === 'en' ? 'Sheikh Mansoor Al-Qasimi' : 'الشيخ منصور القاسمي',
      company: lang === 'en' ? 'Al Qasimi Real Estate Holdings' : 'مجموعة القاسمي العقارية',
      role: lang === 'en' ? 'Chairman & Managing Director' : 'رئيس مجلس الإدارة',
      commentEn: 'Origin Consulting Interior transformed our flagship luxury tower into an architectural masterpiece. Their MEP engineering accuracy and interior elegance exceeded all expectations.',
      commentAr: 'حوّلت أوريجين برجنا الفاخر إلى تحفة معمارية. دقة الهندسة الكهروميكانيكية وأناقة التصميم الداخلي تجاوزت كل التوقعات.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: lang === 'en' ? 'Elena Rostova' : 'يلينا روستوفا',
      company: lang === 'en' ? 'Rostova Hospitality Group' : 'مجموعة روستوفا للضيافة',
      role: lang === 'en' ? 'VP of Development' : 'نائب رئيس التطوير',
      commentEn: 'Working with Origin on our desert luxury resort in Al Ula was seamless. Their 3D visualization matched the finished construction down to every texture.',
      commentAr: 'العمل مع أوريجين في منتجعنا الفاخر بالعلا كان سلسًا ومثمرًا للغاية. تطابق الإظهار ثلاثي الأبعاد مع التنفيذ الميداني بدقة.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <>
      <SEOHead
        title={lang === 'en' ? 'Client Testimonials | Origin Consulting Interior' : 'آراء وتقييمات العملاء | أوريجين للإستشارات والديكور'}
        description={lang === 'en' ? 'Read verified reviews and testimonials from chairmen and developers.' : 'اقرأ آراء وتقييمات عملائنا وشركائنا التنفيذيين في الخليج.'}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">
            {lang === 'en' ? 'Client Trust' : 'ثقة العملاء'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2">
            {lang === 'en' ? 'Endorsements & Verified Reviews' : 'شهادات وآراء شركائنا'}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((r, idx) => {
            const comment = lang === 'en' ? r.commentEn : r.commentAr;
            return (
              <Card key={idx} className="relative flex flex-col justify-between p-8">
                <Quote className="w-12 h-12 text-brand-gold/20 absolute top-6 right-6" />
                <div>
                  <div className="flex gap-1 text-brand-gold mb-4">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold" />
                    ))}
                  </div>
                  <p className="text-neutral-300 text-base italic leading-relaxed">"{comment}"</p>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-neutral-800">
                  <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover border border-brand-gold" />
                  <div>
                    <h4 className="text-white font-bold text-sm">{r.name}</h4>
                    <span className="text-xs text-brand-gold font-medium">{r.role} — {r.company}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
