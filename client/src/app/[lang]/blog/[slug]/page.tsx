'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import { SEOHead } from '@/components/layout/SEOHead';
import { ArrowLeft, User, Clock, Calendar, Loader2 } from 'lucide-react';
import axios from 'axios';

interface BlogPostData {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: string;
  contentAr: string;
  categoryEn: string;
  categoryAr: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  coverImage: string;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const rawSlug = (params?.slug as string) || '';
  const slug = decodeURIComponent(rawSlug);
  const { lang } = useI18n();

  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fallbackPost: BlogPostData = {
    id: '1',
    slug: 'future-of-sustainable-architecture-gcc-2026',
    titleEn: 'The Future of Sustainable Architecture in the GCC',
    titleAr: 'مستقبل العمارة المستدامة في دول مجلس التعاون الخليجي',
    excerptEn: 'How biophilic design, net-zero energy codes, and smart glass facades are revolutionizing Middle Eastern architecture.',
    excerptAr: 'كيف يغير التصميم الطبيعي والواجهات الزجاجية الذكية وجه العمارة في الشرق الأوسط.',
    contentEn: '<p class="mb-6 text-neutral-300 leading-relaxed text-lg">The modern architectural landscape in the Gulf region is witnessing a historic paradigm shift towards net-zero carbon building performance and biophilic integration.</p>',
    contentAr: '<p class="mb-6 text-neutral-300 leading-relaxed text-lg" dir="rtl">تشهد الساحة المعمارية الحديثة في منطقة الخليج تحولاً تاريخياً نحو أداء المباني الصفرية والاندمج مع عناصر الطبيعة.</p>',
    categoryEn: 'Architecture Trends',
    categoryAr: 'اتجاهات العمارة',
    author: 'Dr. Tariq Al-Mansoor',
    publishedAt: '2026-07-24',
    readingTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
  };

  useEffect(() => {
    async function fetchArticle() {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await axios.get(`/api/blog/${encodeURIComponent(slug)}`);
        if (res.data && res.data.id) {
          setPost(res.data);
        } else {
          setPost(fallbackPost);
        }
      } catch (err) {
        console.error('Failed to fetch article detail', err);
        setPost(fallbackPost);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
      </div>
    );
  }

  const currentPost = post || fallbackPost;
  const title = lang === 'en' ? currentPost.titleEn : currentPost.titleAr;
  const excerpt = lang === 'en' ? currentPost.excerptEn : currentPost.excerptAr;
  const content = lang === 'en' ? currentPost.contentEn : currentPost.contentAr;
  const category = lang === 'en' ? currentPost.categoryEn : currentPost.categoryAr;
  const publishedDate = currentPost.publishedAt ? new Date(currentPost.publishedAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <>
      <SEOHead title={`${title} | Origin Insights`} description={excerpt} />

      <div className="relative h-[55vh] flex items-center justify-center border-b border-neutral-800 overflow-hidden">
        <img src={currentPost.coverImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xs" />
        <div className="relative z-10 text-center max-w-3xl px-4">
          <Link href={`/${lang}/blog`} className="inline-flex items-center text-xs uppercase tracking-widest text-brand-gold gap-2 mb-4 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'en' ? 'Back to Articles' : 'العودة للمقالات'}</span>
          </Link>
          <span className="block text-xs uppercase tracking-widest text-brand-gold font-bold mb-2">{category}</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{title}</h1>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-wrap items-center gap-6 border-b border-neutral-800 pb-6 mb-10 text-xs text-neutral-400">
          <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-brand-gold" />{currentPost.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-brand-gold" />{publishedDate}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-gold" />{currentPost.readingTime}</span>
        </div>

        <div
          className="prose prose-invert max-w-none text-neutral-300 text-lg leading-relaxed font-light"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </>
  );
}
