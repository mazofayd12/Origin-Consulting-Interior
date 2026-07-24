'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

export default function ManageAboutPageContent() {
  const [saved, setSaved] = useState(false);
  const [about, setAbout] = useState({
    storyEn: 'Origin Consulting Interior was founded on the principle that spaces should elevate human experience...',
    storyAr: 'تأسست أوريجين للإستشارات على مبدأ أن المساحات يجب أن ترتقي بالتجربة الإنسانية...',
    visionEn: 'To be the premier architectural and interior engineering firm across the Middle East.',
    missionEn: 'Delivering unparalleled engineering precision, sustainable luxury, and turnkey project excellence.',
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
          <h1 className="text-3xl font-extrabold text-white">About Page Manager (محتوى عن الشركة)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Update company legacy story, vision, mission, and core values</p>
        </div>

        {saved && <Alert type="success" message="About page content updated successfully." />}

        <form onSubmit={handleSave} className="glass-panel p-8 rounded-lg border border-brand-gold/30 space-y-6">
          <h3 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">Company Legacy & Story</h3>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Story (English)</label>
            <textarea
              rows={3}
              className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold"
              value={about.storyEn}
              onChange={(e) => setAbout({ ...about, storyEn: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Story (Arabic)</label>
            <textarea
              rows={3}
              className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold text-right"
              dir="rtl"
              value={about.storyAr}
              onChange={(e) => setAbout({ ...about, storyAr: e.target.value })}
            />
          </div>

          <Input label="Vision Statement" value={about.visionEn} onChange={(e) => setAbout({ ...about, visionEn: e.target.value })} />
          <Input label="Mission Statement" value={about.missionEn} onChange={(e) => setAbout({ ...about, missionEn: e.target.value })} />

          <Button type="submit" variant="gold" size="lg" className="w-full mt-4">
            Save About Page Content
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
