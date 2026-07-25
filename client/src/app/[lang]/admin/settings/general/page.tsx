'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Upload, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function GeneralSettingsPage() {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [general, setGeneral] = useState({
    siteNameEn: 'Origin Consulting Interior',
    siteNameAr: 'أوريجين للإستشارات والديكور',
    taglineEn: 'Designing Spaces. Creating Experiences.',
    taglineAr: 'تصميم المساحات. صناعة التجارب.',
    faviconUrl: '/favicon.ico',
    logoUrl: '/images/logo.png',
  });

  useEffect(() => {
    async function fetchGeneralSettings() {
      try {
        const res = await axios.get('/api/settings');
        if (res.data?.general) {
          setGeneral((prev) => ({ ...prev, ...res.data.general }));
        }
      } catch (err) {
        console.error('Failed to fetch general settings', err);
      }
    }
    fetchGeneralSettings();
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.url) {
        setGeneral((prev) => ({ ...prev, logoUrl: res.data.url }));
        setSuccess('Official Logo uploaded to VPS successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      alert('Upload failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.put('/api/settings', { general });
      setSuccess('General site settings saved to Database successfully!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError('Failed to save settings: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-4xl space-y-8">
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">General Website Settings (الإعدادات العامة)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Site name, slogans, official brand logo, and favicon synced with Database</p>
        </div>

        {success && <Alert type="success" message={success} />}
        {error && <Alert type="danger" message={error} />}

        <form onSubmit={handleSave} className="glass-panel p-8 rounded-lg border border-brand-gold/30 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Site Name (English)" value={general.siteNameEn} onChange={(e) => setGeneral({ ...general, siteNameEn: e.target.value })} required />
            <Input label="Site Name (Arabic - اسم الموقع)" value={general.siteNameAr} onChange={(e) => setGeneral({ ...general, siteNameAr: e.target.value })} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Tagline Slogan (English)" value={general.taglineEn} onChange={(e) => setGeneral({ ...general, taglineEn: e.target.value })} required />
            <Input label="Tagline Slogan (Arabic - الشعار اللفظي)" value={general.taglineAr} onChange={(e) => setGeneral({ ...general, taglineAr: e.target.value })} required />
          </div>

          {/* Logo Path & VPS Direct File Upload Button */}
          <div className="space-y-3 border-t border-b border-neutral-800 py-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">Official Brand Logo</label>
            <div className="flex items-center gap-3">
              <Input
                className="flex-1"
                placeholder="/images/logo.png or /uploads/..."
                value={general.logoUrl}
                onChange={(e) => setGeneral({ ...general, logoUrl: e.target.value })}
                required
              />
              <label className="cursor-pointer bg-brand-gold text-black hover:bg-brand-gold/80 px-4 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors">
                {uploadingLogo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <span>{uploadingLogo ? 'Uploading...' : 'Upload Logo'}</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploadingLogo} />
              </label>
            </div>
            {general.logoUrl && (
              <img src={general.logoUrl} alt="Logo Preview" className="h-12 w-auto object-contain rounded border border-brand-gold/40 mt-2 bg-neutral-900 p-2" />
            )}
          </div>

          <Input label="Favicon Path" value={general.faviconUrl} onChange={(e) => setGeneral({ ...general, faviconUrl: e.target.value })} required />

          <Button type="submit" variant="gold" size="lg" className="w-full mt-4" isLoading={loading}>
            Save General Settings to DB
          </Button>
        </form>
      </div>
    </div>
  );
}
