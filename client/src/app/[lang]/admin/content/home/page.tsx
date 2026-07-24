'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

export default function ManageHomePageContent() {
  const [saved, setSaved] = useState(false);
  const [hero, setHero] = useState({
    headlineEn: 'Designing Spaces. Creating Experiences.',
    headlineAr: 'تصميم المساحات. صناعة التجارب.',
    subtitleEn: 'Origin Consulting Interior delivers ultra-luxury Architecture, Interior Design, MEP Engineering, and Project Management.',
    subtitleAr: 'تقدم أوريجين للإستشارات تصاميم معمارية وفخامة داخلية وهندسة كهروميكانيكية وإنشائية وإدارة مشاريع فائقة الدقة.',
    videoUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-8">
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Homepage Sections Manager (محتوى الصفحة الرئيسية)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Customize hero video/image, main headline, subtitles, and featured banners</p>
        </div>

        {saved && <Alert type="success" message="Homepage content updated successfully." />}

        <form onSubmit={handleSave} className="glass-panel p-8 rounded-lg border border-brand-gold/30 space-y-6">
          <h3 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">Fullscreen Hero Section</h3>
          <Input label="Hero Headline (English)" value={hero.headlineEn} onChange={(e) => setHero({ ...hero, headlineEn: e.target.value })} />
          <Input label="Hero Headline (Arabic - العنوان الرئيسي)" value={hero.headlineAr} onChange={(e) => setHero({ ...hero, headlineAr: e.target.value })} />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Hero Subtitle (English)</label>
            <textarea
              rows={2}
              className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold"
              value={hero.subtitleEn}
              onChange={(e) => setHero({ ...hero, subtitleEn: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Hero Subtitle (Arabic - الوصف الفرعي)</label>
            <textarea
              rows={2}
              className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold text-right"
              dir="rtl"
              value={hero.subtitleAr}
              onChange={(e) => setHero({ ...hero, subtitleAr: e.target.value })}
            />
          </div>

          <Input label="Backdrop Video / Hero Image URL" value={hero.videoUrl} onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })} />

          <Button type="submit" variant="gold" size="lg" className="w-full mt-4">
            Save Homepage Section Changes
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
