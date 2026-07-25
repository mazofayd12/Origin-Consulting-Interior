'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import { SEOHead } from '@/components/layout/SEOHead';
import { Card } from '@/components/ui/Card';
import { User, Clock, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

interface BlogPostItem {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  categoryEn: string;
  categoryAr: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  coverImage: string;
}

export default function BlogPage() {
  const { lang } = useI18n();
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackPosts: BlogPostItem[] = [
    {
      id: '1',
      slug: 'future-of-sustainable-architecture-gcc-2026',
      titleEn: 'The Future of Sustainable Architecture in the GCC',
      titleAr: 'مستقبل العمارة المستدامة في دول مجلس التعاون الخليجي 2026',
      excerptEn: 'How biophilic design, net-zero energy codes, and smart glass facades are revolutionizing Middle Eastern architecture.',
      excerptAr: 'كيف يغير التصميم الطبيعي والواجهات الزجاجية الذكية وجه العمارة في الشرق الأوسط.',
      categoryEn: 'Architecture Trends',
      categoryAr: 'اتجاهات العمارة',
      author: 'Dr. Tariq Al-Mansoor',
      publishedAt: '2026-07-24',
      readingTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    },
  ];

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const res = await axios.get('/api/blog?public=true');
        if (res.data && res.data.length > 0) {
          setPosts(res.data);
        } else {
          setPosts(fallbackPosts);
        }
      } catch (err) {
        console.error('Failed to fetch blog posts', err);
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogPosts();
  }, []);

  return (
    <>
      <SEOHead
        title={lang === 'en' ? 'Blog & Insights | Origin Consulting Interior' : 'المدونة والمقالات | أوريجين للإستشارات والديكور'}
        description={lang === 'en' ? 'Stay informed with expert insights on GCC architecture, interior design, and MEP engineering.' : 'اقرأ مقالات حصرية في العمارة والتصميم الداخلي والهندسة.'}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">
            {lang === 'en' ? 'Architectural Journal' : 'المجلة المعمارية'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2">
            {lang === 'en' ? 'Latest Insights & Industry Perspectives' : 'أحدث المقالات والرؤى الهندسية'}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {posts.map((post) => {
              const title = lang === 'en' ? post.titleEn : post.titleAr;
              const excerpt = lang === 'en' ? post.excerptEn : post.excerptAr;
              const category = lang === 'en' ? post.categoryEn : post.categoryAr;

              return (
                <Card key={post.slug} className="group overflow-hidden flex flex-col justify-between">
                  <div className="h-64 -mx-6 -mt-6 mb-6 overflow-hidden relative">
                    <img src={post.coverImage} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest text-brand-gold border border-brand-gold/30 rounded-sm">
                      {category}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-brand-gold" />{post.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-gold" />{post.readingTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-brand-gold transition-colors">{title}</h3>
                    <p className="text-neutral-400 text-sm mt-3 leading-relaxed">{excerpt}</p>
                  </div>

                  <Link href={`/${lang}/blog/${post.slug}`} className="mt-6 inline-flex items-center text-xs uppercase tracking-widest text-brand-gold font-semibold gap-2">
                    <span>{lang === 'en' ? 'Read Full Article' : 'قراءة المقال بالكامل'}</span>
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
