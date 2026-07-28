'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import axios from 'axios';

export default function SocialMediaSettingsPage() {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [social, setSocial] = useState({
    linkedin: 'https://linkedin.com/company/origindesigneg',
    instagram: 'https://instagram.com/origindesigneg',
    twitter: 'https://twitter.com/origindesigneg',
    facebook: 'https://facebook.com/origindesigneg',
    youtube: 'https://youtube.com/@origindesigneg',
    tiktok: 'https://tiktok.com/@origindesigneg',
    behance: 'https://behance.net/origindesigneg',
  });

  useEffect(() => {
    async function fetchSocialSettings() {
      try {
        const res = await axios.get('/api/settings');
        if (res.data?.social) {
          setSocial((prev) => ({ ...prev, ...res.data.social }));
        }
      } catch (err) {
        console.error('Failed to fetch social settings', err);
      }
    }
    fetchSocialSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/settings', { social });
      setSuccess('Social Media links updated and saved to Database!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError('Failed to save social media settings: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-8">
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Social Media Settings (روابط التواصل الاجتماعي)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">
            LinkedIn, Instagram, Twitter/X, Facebook, YouTube, TikTok, and Behance links
          </p>
        </div>

        {success && <Alert type="success" message={success} />}
        {error && <Alert type="danger" message={error} />}

        <form onSubmit={handleSave} className="glass-panel p-8 rounded-lg border border-brand-gold/30 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Instagram Profile URL (انستجرام)" value={social.instagram} onChange={(e) => setSocial({ ...social, instagram: e.target.value })} />
            <Input label="Facebook Page URL (فيسبوك)" value={social.facebook} onChange={(e) => setSocial({ ...social, facebook: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="LinkedIn Company Page URL (لينكد إن)" value={social.linkedin} onChange={(e) => setSocial({ ...social, linkedin: e.target.value })} />
            <Input label="Twitter / X Profile URL (تويتر / إكس)" value={social.twitter} onChange={(e) => setSocial({ ...social, twitter: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="YouTube Channel URL (يوتيوب)" value={social.youtube} onChange={(e) => setSocial({ ...social, youtube: e.target.value })} />
            <Input label="TikTok Profile URL (تيك توك)" value={social.tiktok} onChange={(e) => setSocial({ ...social, tiktok: e.target.value })} />
            <Input label="Behance Portfolio URL (بيهانس)" value={social.behance} onChange={(e) => setSocial({ ...social, behance: e.target.value })} />
          </div>

          <Button type="submit" variant="gold" size="lg" className="w-full mt-4" isLoading={loading}>
            Save Social Media Links to DB
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
