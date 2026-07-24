'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

export default function SEOSettingsPage() {
  const [success, setSuccess] = useState(false);
  const [seo, setSeo] = useState({
    metaTitleEn: 'Origin Consulting Interior | Architecture & Luxury Interior Design',
    metaTitleAr: 'أوريجين للإستشارات والديكور | الهندسة المعمارية والتصميم الداخلي الفاخر',
    metaDescEn: 'Origin Consulting Interior delivers luxury Architecture, Interior Design, MEP Engineering, and Project Management.',
    metaDescAr: 'تقدم أوريجين للإستشارات تصاميم معمارية وفخامة داخلية وهندسة كهروميكانيكية وإنشائية وإدارة مشاريع فائقة الدقة.',
    ogImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    googleAnalyticsId: 'G-ORIGIN2026GCC',
    keywords: 'Architecture, Interior Design, Dubai Villa, Riyadh Engineering, MEP, GCC Architecture',
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
          <h1 className="text-3xl font-extrabold text-white">SEO & Search Engine Settings (تحسين محركات البحث)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Global meta tags, OpenGraph sharing images, Google Analytics ID, and target keywords</p>
        </div>

        {success && <Alert type="success" message="SEO settings updated successfully!" />}

        <form onSubmit={handleSave} className="glass-panel p-8 rounded-lg border border-brand-gold/30 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Default Meta Title (English)" value={seo.metaTitleEn} onChange={(e) => setSeo({ ...seo, metaTitleEn: e.target.value })} required />
            <Input label="Default Meta Title (Arabic)" value={seo.metaTitleAr} onChange={(e) => setSeo({ ...seo, metaTitleAr: e.target.value })} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Default Meta Description (English)</label>
              <textarea
                rows={3}
                className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold"
                value={seo.metaDescEn}
                onChange={(e) => setSeo({ ...seo, metaDescEn: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Default Meta Description (Arabic)</label>
              <textarea
                rows={3}
                className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold text-right"
                dir="rtl"
                value={seo.metaDescAr}
                onChange={(e) => setSeo({ ...seo, metaDescAr: e.target.value })}
                required
              />
            </div>
          </div>

          <Input label="OpenGraph Sharing Image URL" value={seo.ogImage} onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })} required />
          <Input label="Google Analytics Tracking ID" value={seo.googleAnalyticsId} onChange={(e) => setSeo({ ...seo, googleAnalyticsId: e.target.value })} />
          <Input label="Global SEO Keywords (comma separated)" value={seo.keywords} onChange={(e) => setSeo({ ...seo, keywords: e.target.value })} />

          <Button type="submit" variant="gold" size="lg" className="w-full mt-4">Save SEO Settings</Button>
        </form>
      </div>
    </AdminLayout>
  );
}
