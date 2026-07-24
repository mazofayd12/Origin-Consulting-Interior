'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import { SEOHead } from '@/components/layout/SEOHead';
import { ArrowLeft, User, Clock, Calendar } from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'future-of-sustainable-architecture-gcc-2026';
  const { lang } = useI18n();

  const post = {
    title: 'The Future of Sustainable Architecture in the GCC',
    excerpt: 'How biophilic design, net-zero energy codes, and smart glass facades are revolutionizing Middle Eastern architecture.',
    category: 'Architecture Trends',
    author: 'Dr. Tariq Al-Mansoor',
    date: 'July 24, 2026',
    readingTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    content: `
      <p class="mb-6 text-neutral-300 leading-relaxed text-lg">The modern architectural landscape in the Gulf region is witnessing a historic paradigm shift towards net-zero carbon building performance and biophilic integration.</p>
      <h3 class="text-2xl font-bold text-white mb-4">1. Kinetic Double-Skin Facades</h3>
      <p class="mb-6 text-neutral-300 leading-relaxed">By integrating solar-responsive dynamic louvers, corporate towers reduce HVAC cooling load by up to 35% during peak GCC summer months.</p>
      <h3 class="text-2xl font-bold text-white mb-4">2. Biophilic Atrium Choreography</h3>
      <p class="mb-6 text-neutral-300 leading-relaxed">Infusing indoor vertical gardens and water cascades creates micro-climates that enhance human wellness while naturally purifying indoor air quality.</p>
    `,
  };

  return (
    <>
      <SEOHead title={`${post.title} | Origin Insights`} description={post.excerpt} />

      <div className="relative h-[55vh] flex items-center justify-center border-b border-neutral-800 overflow-hidden">
        <img src={post.coverImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xs" />
        <div className="relative z-10 text-center max-w-3xl px-4">
          <Link href={`/${lang}/blog`} className="inline-flex items-center text-xs uppercase tracking-widest text-brand-gold gap-2 mb-4 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </Link>
          <span className="block text-xs uppercase tracking-widest text-brand-gold font-bold mb-2">{post.category}</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{post.title}</h1>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-6 border-b border-neutral-800 pb-6 mb-10 text-xs text-neutral-400">
          <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-brand-gold" />{post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-brand-gold" />{post.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-gold" />{post.readingTime}</span>
        </div>

        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
}
