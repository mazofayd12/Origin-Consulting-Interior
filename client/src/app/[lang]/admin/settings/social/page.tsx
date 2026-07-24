'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

export default function SocialMediaSettingsPage() {
  const [success, setSuccess] = useState(false);
  const [social, setSocial] = useState({
    linkedin: 'https://linkedin.com/company/origin-consulting-interior',
    instagram: 'https://instagram.com/origin_interior',
    twitter: 'https://twitter.com/origin_design',
    facebook: 'https://facebook.com/originconsulting',
    youtube: 'https://youtube.com/@origindesign',
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
          <h1 className="text-3xl font-extrabold text-white">Social Media Settings (وسائل التواصل الاجتماعي)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">LinkedIn, Instagram, Twitter, Facebook, and YouTube links</p>
        </div>

        {success && <Alert type="success" message="Social media links updated successfully!" />}

        <form onSubmit={handleSave} className="glass-panel p-8 rounded-lg border border-brand-gold/30 space-y-6">
          <Input label="LinkedIn Company Page URL" value={social.linkedin} onChange={(e) => setSocial({ ...social, linkedin: e.target.value })} />
          <Input label="Instagram Profile URL" value={social.instagram} onChange={(e) => setSocial({ ...social, instagram: e.target.value })} />
          <Input label="Twitter / X Profile URL" value={social.twitter} onChange={(e) => setSocial({ ...social, twitter: e.target.value })} />
          <Input label="Facebook Page URL" value={social.facebook} onChange={(e) => setSocial({ ...social, facebook: e.target.value })} />
          <Input label="YouTube Channel URL" value={social.youtube} onChange={(e) => setSocial({ ...social, youtube: e.target.value })} />

          <Button type="submit" variant="gold" size="lg" className="w-full mt-4">Save Social Media Links</Button>
        </form>
      </div>
    </AdminLayout>
  );
}
