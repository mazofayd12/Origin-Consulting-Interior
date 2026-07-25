'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/Button';
import { MapPin, ArrowLeft, Loader2 } from 'lucide-react';
import axios from 'axios';

interface ProjectDetailData {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  category: string;
  locationEn: string;
  locationAr: string;
  areaSqm: number;
  year: number;
  servicesEn: string[];
  servicesAr: string[];
  coverImage: string;
  images: string[];
  descEn: string;
  descAr: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const rawSlug = (params?.slug as string) || '';
  const slug = decodeURIComponent(rawSlug);
  const { lang } = useI18n();

  const [project, setProject] = useState<ProjectDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackProject: ProjectDetailData = {
    id: '1',
    slug: 'royal-palms-villa',
    titleEn: 'Royal Palms Luxury Villa',
    titleAr: 'فيلا رويال بالمس الفاخرة',
    category: 'Luxury Villas',
    locationEn: 'Emirates Hills, Dubai',
    locationAr: 'إمارات هيلز، دبي',
    areaSqm: 2400,
    year: 2025,
    servicesEn: ['Interior Design', 'Architecture', 'MEP Engineering', 'Turnkey Fit-Out'],
    servicesAr: ['التصميم الداخلي', 'العمارة', 'الهندسة الكهروميكانيكية', 'التشطيبات والتسليم على المفتاح'],
    coverImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    ],
    descEn: 'An ultra-luxurious private sanctuary engineered with double-height marble foyers, custom Italian millwork, kinetic dynamic lighting, and integrated smart home automation.',
    descAr: 'صرح سكني فاخر مصمم بأعلى مستويات الفخامة مع بهو رخامي مزدوج الارتفاع وأعمال موبيليا إيطالية مخصصة وأنظمة أتمتة ذكية.',
  };

  useEffect(() => {
    async function fetchProjectDetail() {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await axios.get(`/api/projects/${encodeURIComponent(slug)}`);
        if (res.data && res.data.id) {
          setProject(res.data);
        } else {
          setProject(fallbackProject);
        }
      } catch (err) {
        console.error('Failed to fetch project detail', err);
        setProject(fallbackProject);
      } finally {
        setLoading(false);
      }
    }
    fetchProjectDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
      </div>
    );
  }

  const p = project || fallbackProject;
  const title = lang === 'en' ? p.titleEn : p.titleAr;
  const location = lang === 'en' ? p.locationEn : p.locationAr;
  const desc = lang === 'en' ? p.descEn : p.descAr;
  const services = lang === 'en' ? p.servicesEn : p.servicesAr;
  const gallery = p.images && p.images.length > 0 ? p.images : [p.coverImage];

  return (
    <>
      <SEOHead title={`${title} | Origin Consulting Interior`} description={desc} />

      <div className="relative h-[65vh] flex items-center justify-center border-b border-neutral-800 overflow-hidden">
        <img src={p.coverImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-neutral-950/75 backdrop-blur-xs" />
        <div className="relative z-10 text-center max-w-4xl px-4">
          <Link href={`/${lang}/portfolio`} className="inline-flex items-center text-xs uppercase tracking-widest text-brand-gold gap-2 mb-4 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'en' ? 'Back to Portfolio' : 'العودة لمعرض المشاريع'}</span>
          </Link>
          <span className="block text-xs uppercase tracking-widest text-brand-gold font-bold mb-2">{p.category}</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">{title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Project Specs Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 glass-panel rounded-lg mb-16 border-brand-gold/30">
          <div>
            <span className="text-xs uppercase text-neutral-400 block">{lang === 'en' ? 'Location' : 'الموقع'}</span>
            <span className="text-lg font-bold text-white mt-1 block">{location}</span>
          </div>
          <div>
            <span className="text-xs uppercase text-neutral-400 block">{lang === 'en' ? 'Built Area' : 'المساحة المبنية'}</span>
            <span className="text-lg font-bold text-white mt-1 block">{p.areaSqm} SQM</span>
          </div>
          <div>
            <span className="text-xs uppercase text-neutral-400 block">{lang === 'en' ? 'Completion Year' : 'سنة الإنجاز'}</span>
            <span className="text-lg font-bold text-white mt-1 block">{p.year}</span>
          </div>
          <div>
            <span className="text-xs uppercase text-neutral-400 block">{lang === 'en' ? 'Disciplines' : 'التخصصات'}</span>
            <span className="text-sm font-semibold text-brand-gold mt-1 block">{Array.isArray(services) ? services.join(', ') : ''}</span>
          </div>
        </div>

        {/* Narrative & Gallery */}
        <div className="mb-20">
          <h2 className="text-3xl font-extrabold text-white mb-6">{lang === 'en' ? 'Architectural Narrative' : 'الوصف المعماري والهندسي'}</h2>
          <p className="text-neutral-300 text-lg leading-relaxed font-light" dir={lang === 'ar' ? 'rtl' : 'ltr'}>{desc}</p>
        </div>

        {gallery.length > 0 && (
          <div className="my-16">
            <h3 className="text-2xl font-bold text-white mb-8">{lang === 'en' ? 'Image Gallery' : 'معرض الصور'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gallery.map((img, idx) => (
                <div key={idx} className="h-72 rounded-lg overflow-hidden border border-neutral-800 shadow-luxury">
                  <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-20">
          <Link href={`/${lang}/contact`}>
            <Button size="lg" variant="gold">{lang === 'en' ? 'Inquire About Similar Development' : 'طلب استشارة لمشروع مماثل'}</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
