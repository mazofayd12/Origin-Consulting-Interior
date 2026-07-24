'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

export default function FooterSettingsPage() {
  const [success, setSuccess] = useState(false);
  const [footer, setFooter] = useState({
    copyrightTextEn: '© 2026 Origin Consulting Interior. All Rights Reserved.',
    copyrightTextAr: '© 2026 جميع الحقوق محفوظة لشركة أوريجين للإستشارات والديكور.',
    summaryTextEn: 'Pioneering architectural excellence, luxury interior design, and multi-disciplinary engineering services across Dubai, Riyadh, and international markets.',
    summaryTextAr: 'رواد التميز المعماري والتصميم الداخلي الفاخر والهندسة المتكاملة في دبي والرياض والأسواق العالمية.',
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
          <h1 className="text-3xl font-extrabold text-white">Footer Settings (إعدادات الترويسة السفلية)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Customize footer branding summary text and copyright notices</p>
        </div>

        {success && <Alert type="success" message="Footer settings saved successfully!" />}

        <form onSubmit={handleSave} className="glass-panel p-8 rounded-lg border border-brand-gold/30 space-y-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Footer Brand Summary (English)</label>
            <textarea
              rows={3}
              className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold"
              value={footer.summaryTextEn}
              onChange={(e) => setFooter({ ...footer, summaryTextEn: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Footer Brand Summary (Arabic - ملخص الفوتر بالعربية)</label>
            <textarea
              rows={3}
              className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold text-right"
              dir="rtl"
              value={footer.summaryTextAr}
              onChange={(e) => setFooter({ ...footer, summaryTextAr: e.target.value })}
              required
            />
          </div>

          <Input label="Copyright Notice (English)" value={footer.copyrightTextEn} onChange={(e) => setFooter({ ...footer, copyrightTextEn: e.target.value })} required />
          <Input label="Copyright Notice (Arabic)" value={footer.copyrightTextAr} onChange={(e) => setFooter({ ...footer, copyrightTextAr: e.target.value })} required />

          <Button type="submit" variant="gold" size="lg" className="w-full mt-4">Save Footer Settings</Button>
        </form>
      </div>
    </AdminLayout>
  );
}
