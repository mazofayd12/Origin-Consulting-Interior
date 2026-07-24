'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

export default function HomepageSettingsPage() {
  const [success, setSuccess] = useState(false);
  const [homepage, setHomepage] = useState({
    showHeroVideo: true,
    showStatsSection: true,
    showAboutPreview: true,
    showServicesGrid: true,
    showFeaturedProjects: true,
    showTestimonialsSlider: true,
    showBlogPreview: true,
    ctaHeadingEn: 'Ready to Build Your Architectural Masterpiece?',
    ctaHeadingAr: 'هل أنت جاهز لبناء تحفتك المعمارية؟',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-8">
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Homepage Layout Settings (إعدادات الصفحة الرئيسية)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Enable or disable homepage section visibility and custom CTA banners</p>
        </div>

        {success && <Alert type="success" message="Homepage layout settings saved!" />}

        <form onSubmit={handleSave} className="glass-panel p-8 rounded-lg border border-brand-gold/30 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-neutral-800 pb-2">Section Visibility Toggles</h3>

          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={homepage.showHeroVideo}
                onChange={(e) => setHomepage({ ...homepage, showHeroVideo: e.target.checked })}
                className="w-4 h-4 text-brand-gold bg-neutral-900 border-neutral-800 rounded"
              />
              <span>Fullscreen Hero Video & Render Section</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={homepage.showStatsSection}
                onChange={(e) => setHomepage({ ...homepage, showStatsSection: e.target.checked })}
                className="w-4 h-4 text-brand-gold bg-neutral-900 border-neutral-800 rounded"
              />
              <span>Animated Statistics Counter Banner</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={homepage.showServicesGrid}
                onChange={(e) => setHomepage({ ...homepage, showServicesGrid: e.target.checked })}
                className="w-4 h-4 text-brand-gold bg-neutral-900 border-neutral-800 rounded"
              />
              <span>Services & Engineering Disciplines Grid</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={homepage.showFeaturedProjects}
                onChange={(e) => setHomepage({ ...homepage, showFeaturedProjects: e.target.checked })}
                className="w-4 h-4 text-brand-gold bg-neutral-900 border-neutral-800 rounded"
              />
              <span>Featured Portfolio Projects Showcase</span>
            </label>
          </div>

          <h3 className="text-lg font-bold text-white border-b border-neutral-800 pb-2 pt-4">Call-to-Action (CTA) Banner Heading</h3>
          <Input label="CTA Banner Heading (English)" value={homepage.ctaHeadingEn} onChange={(e) => setHomepage({ ...homepage, ctaHeadingEn: e.target.value })} />
          <Input label="CTA Banner Heading (Arabic)" value={homepage.ctaHeadingAr} onChange={(e) => setHomepage({ ...homepage, ctaHeadingAr: e.target.value })} />

          <Button type="submit" variant="gold" size="lg" className="w-full mt-4">Save Homepage Settings</Button>
        </form>
      </div>
    </AdminLayout>
  );
}
