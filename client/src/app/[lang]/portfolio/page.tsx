'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import { SEOHead } from '@/components/layout/SEOHead';
import { Input } from '@/components/ui/Input';
import { MapPin } from 'lucide-react';

export default function PortfolioPage() {
  const { lang } = useI18n();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = [
    { key: 'All', labelEn: 'All Projects', labelAr: 'جميع المشاريع' },
    { key: 'Luxury Villas', labelEn: 'Luxury Villas', labelAr: 'الفلل الفاخرة' },
    { key: 'Residential', labelEn: 'Residential', labelAr: 'المباني السكنية' },
    { key: 'Commercial', labelEn: 'Commercial', labelAr: 'المشاريع التجارية' },
    { key: 'Office', labelEn: 'Office', labelAr: 'المقرات الإدارية' },
    { key: 'Hospitality', labelEn: 'Hospitality', labelAr: 'الضيافة والمنتجعات' },
  ];

  const projects = [
    {
      slug: 'royal-palms-villa',
      titleEn: 'Royal Palms Luxury Villa',
      titleAr: 'فيلا رويال بالمس الفاخرة',
      category: 'Luxury Villas',
      locationEn: 'Emirates Hills, Dubai',
      locationAr: 'إمارات هيلز، دبي',
      area: '2,400 SQM',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    },
    {
      slug: 'horizon-corporate-tower',
      titleEn: 'Horizon FinTech HQ',
      titleAr: 'المقر الرئيسي لشركة هورايزون',
      category: 'Commercial',
      locationEn: 'KAFD, Riyadh',
      locationAr: 'كافد، الرياض',
      area: '4,500 SQM',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    },
    {
      slug: 'lumina-boutique-hotel',
      titleEn: 'Lumina Grand Resort & Spa',
      titleAr: 'منتجع لومينا جراندا والسبا',
      category: 'Hospitality',
      locationEn: 'Al Ula, Saudi Arabia',
      locationAr: 'العلا، المملكة العربية السعودية',
      area: '12,000 SQM',
      year: 2026,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filtered = projects.filter((p) => {
    const title = lang === 'en' ? p.titleEn : p.titleAr;
    const location = lang === 'en' ? p.locationEn : p.locationAr;
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = title.toLowerCase().includes(search.toLowerCase()) || location.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title={lang === 'en' ? 'Portfolio & Projects | Origin Consulting Interior' : 'معرض المشاريع | أوريجين للإستشارات والديكور'}
        description={lang === 'en' ? 'Explore luxury residential villas, commercial headquarters, hotels, and developments.' : 'استكشف المشاريع السكنية والتجارية والفلل الفاخرة لشركة أوريجين للإستشارات.'}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">
            {lang === 'en' ? 'Our Masterpieces' : 'تحفنا المعمارية'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2">
            {lang === 'en' ? 'Architectural & Interior Portfolio' : 'معرض التصاميم المعمارية والداخلية'}
          </h1>
        </div>

        {/* Search & Categories Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors ${
                  activeCategory === cat.key
                    ? 'bg-brand-gold text-black'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {lang === 'en' ? cat.labelEn : cat.labelAr}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <Input
              placeholder={lang === 'en' ? 'Search projects...' : 'البحث في المشاريع...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((p) => {
            const title = lang === 'en' ? p.titleEn : p.titleAr;
            const location = lang === 'en' ? p.locationEn : p.locationAr;
            return (
              <Link key={p.slug} href={`/${lang}/portfolio/${p.slug}`} className="group block">
                <div className="glass-panel rounded-lg overflow-hidden border border-neutral-800 group-hover:border-brand-gold transition-colors">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={p.image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest text-brand-gold border border-brand-gold/30 rounded-sm">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">{title}</h3>
                    <div className="mt-4 pt-4 border-t border-neutral-800/80 flex justify-between text-xs text-neutral-400 font-mono">
                      <span>{p.area}</span>
                      <span>{lang === 'en' ? `Completed ${p.year}` : `سنة الإنجاز ${p.year}`}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
