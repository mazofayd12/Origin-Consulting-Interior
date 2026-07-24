'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

export default function GeneralSettingsPage() {
  const [success, setSuccess] = useState(false);
  const [general, setGeneral] = useState({
    siteNameEn: 'Origin Consulting Interior',
    siteNameAr: 'أوريجين للإستشارات والديكور',
    taglineEn: 'Designing Spaces. Creating Experiences.',
    taglineAr: 'تصميم المساحات. صناعة التجارب.',
    faviconUrl: '/favicon.ico',
    logoUrl: '/images/logo.png',
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
          <h1 className="text-3xl font-extrabold text-white">General Website Settings (الإعدادات العامة)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Site name, slogans, official brand logo, and favicon</p>
        </div>

        {success && <Alert type="success" message="General site settings saved successfully!" />}

        <form onSubmit={handleSave} className="glass-panel p-8 rounded-lg border border-brand-gold/30 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Site Name (English)" value={general.siteNameEn} onChange={(e) => setGeneral({ ...general, siteNameEn: e.target.value })} required />
            <Input label="Site Name (Arabic - اسم الموقع)" value={general.siteNameAr} onChange={(e) => setGeneral({ ...general, siteNameAr: e.target.value })} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Tagline Slogan (English)" value={general.taglineEn} onChange={(e) => setGeneral({ ...general, taglineEn: e.target.value })} required />
            <Input label="Tagline Slogan (Arabic - الشعار اللفظي)" value={general.taglineAr} onChange={(e) => setGeneral({ ...general, taglineAr: e.target.value })} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Official Logo Path" value={general.logoUrl} onChange={(e) => setGeneral({ ...general, logoUrl: e.target.value })} required />
            <Input label="Favicon Path" value={general.faviconUrl} onChange={(e) => setGeneral({ ...general, faviconUrl: e.target.value })} required />
          </div>

          <Button type="submit" variant="gold" size="lg" className="w-full mt-4">Save General Settings</Button>
        </form>
      </div>
    </AdminLayout>
  );
}
