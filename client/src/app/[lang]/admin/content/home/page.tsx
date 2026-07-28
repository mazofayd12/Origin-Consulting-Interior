'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Upload, Loader2, Image as ImageIcon, Video } from 'lucide-react';
import axios from 'axios';

export default function ManageHomePageContent() {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingAbout, setUploadingAbout] = useState(false);
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);

  const [hero, setHero] = useState({
    headlineEn: 'Designing Spaces. Creating Experiences.',
    headlineAr: 'تصميم المساحات. صناعة التجارب.',
    subtitleEn: 'Origin Consulting Interior delivers ultra-luxury Architecture, Interior Design, MEP Engineering, and Project Management.',
    subtitleAr: 'تقدم أوريجين للإستشارات تصاميم معمارية وفخامة داخلية وهندسة كهروميكانيكية وإنشائية وإدارة مشاريع فائقة الدقة.',
    videoUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90',
  });

  const [aboutPreview, setAboutPreview] = useState({
    titleEn: 'Crafting Architectural Excellence Since 2011',
    titleAr: 'صناعة التتميز المعماري منذ 2011',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  });

  const [beforeAfter, setBeforeAfter] = useState({
    beforeImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    beforeLabelEn: 'Raw Concrete Structure',
    afterLabelEn: 'Handover Finish',
  });

  const [servicesHeader, setServicesHeader] = useState({
    titleEn: 'Comprehensive Engineering & Design Solutions',
    titleAr: 'حلول هندسية وتصميمية شاملة متكاملة',
    subtitleEn: 'Our Disciplines',
    subtitleAr: 'تخصصاتنا ومجالاتنا',
  });

  useEffect(() => {
    axios.get('/api/settings')
      .then((res) => {
        if (res.data?.homepage_hero) {
          setHero((prev) => ({ ...prev, ...res.data.homepage_hero }));
        }
        if (res.data?.about_preview) {
          setAboutPreview((prev) => ({ ...prev, ...res.data.about_preview }));
        }
        if (res.data?.before_after) {
          setBeforeAfter((prev) => ({ ...prev, ...res.data.before_after }));
        }
        if (res.data?.services_section) {
          setServicesHeader((prev) => ({ ...prev, ...res.data.services_section }));
        }
      })
      .catch(() => {});
  }, []);

  const uploadFile = async (file: File, setter: (url: string) => void, setLoadingState: (val: boolean) => void) => {
    setLoadingState(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.url) {
        setter(res.data.url);
      }
    } catch (err: any) {
      alert('Upload failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoadingState(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post('/api/settings', {
        homepage_hero: hero,
        about_preview: aboutPreview,
        before_after: beforeAfter,
        services_section: servicesHeader,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      alert('Failed to save homepage settings: ' + (err.response?.data?.error || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="max-w-4xl space-y-8">
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Homepage Sections Manager (محتوى وصور الرئيسية)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">
            Upload & customize Hero media backdrop, About preview photo, Before/After photos, and Section headers
          </p>
        </div>

        {saved && <Alert type="success" message="Homepage content & section images updated successfully." />}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Hero Section */}
          <div className="glass-panel p-8 rounded-lg border border-brand-gold/30 space-y-6">
            <h3 className="text-xl font-bold text-amber-400 border-b border-neutral-800 pb-2 flex items-center gap-2">
              <Video className="w-5 h-5 text-amber-400" />
              <span>Fullscreen Hero Section (صورة أو فيديو الغلاف الرئيسي)</span>
            </h3>
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

            <div className="space-y-2">
              <Input label="Hero Cover Media / Video URL" value={hero.videoUrl} onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })} />
              <label className="inline-flex items-center gap-2 cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-4 py-2 rounded transition-colors">
                {uploadingHero ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 text-amber-400" />}
                <span>Upload New Hero Image/Video from Computer</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) uploadFile(e.target.files[0], (url) => setHero({ ...hero, videoUrl: url }), setUploadingHero);
                  }}
                />
              </label>
            </div>
          </div>

          {/* Section 2: About Preview Section Photo */}
          <div className="glass-panel p-8 rounded-lg border border-brand-gold/30 space-y-6">
            <h3 className="text-xl font-bold text-amber-400 border-b border-neutral-800 pb-2 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-400" />
              <span>About Section Photo (صورة غلاف سيكشن من نحن في الصفحة الرئيسية)</span>
            </h3>
            <Input label="Section Title (English)" value={aboutPreview.titleEn} onChange={(e) => setAboutPreview({ ...aboutPreview, titleEn: e.target.value })} />
            <Input label="Section Title (Arabic)" value={aboutPreview.titleAr} onChange={(e) => setAboutPreview({ ...aboutPreview, titleAr: e.target.value })} />

            <div className="space-y-2">
              <Input label="About Cover Photo URL" value={aboutPreview.image} onChange={(e) => setAboutPreview({ ...aboutPreview, image: e.target.value })} />
              <label className="inline-flex items-center gap-2 cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-4 py-2 rounded transition-colors">
                {uploadingAbout ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 text-amber-400" />}
                <span>Upload About Photo from Computer</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) uploadFile(e.target.files[0], (url) => setAboutPreview({ ...aboutPreview, image: url }), setUploadingAbout);
                  }}
                />
              </label>
            </div>
          </div>

          {/* Section 3: Before & After Photos */}
          <div className="glass-panel p-8 rounded-lg border border-brand-gold/30 space-y-6">
            <h3 className="text-xl font-bold text-amber-400 border-b border-neutral-800 pb-2 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-400" />
              <span>Before & After Comparison Photos (صور المقارنة قبل وبعد في الرئيسية)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input label="Before Image URL (صورة قبل الإكتمال)" value={beforeAfter.beforeImage} onChange={(e) => setBeforeAfter({ ...beforeAfter, beforeImage: e.target.value })} />
                <label className="inline-flex items-center gap-2 cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-4 py-2 rounded transition-colors">
                  {uploadingBefore ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 text-amber-400" />}
                  <span>Upload Before Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) uploadFile(e.target.files[0], (url) => setBeforeAfter({ ...beforeAfter, beforeImage: url }), setUploadingBefore);
                    }}
                  />
                </label>
              </div>

              <div className="space-y-2">
                <Input label="After Image URL (صورة بعد التسليم)" value={beforeAfter.afterImage} onChange={(e) => setBeforeAfter({ ...beforeAfter, afterImage: e.target.value })} />
                <label className="inline-flex items-center gap-2 cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-4 py-2 rounded transition-colors">
                  {uploadingAfter ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 text-amber-400" />}
                  <span>Upload After Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) uploadFile(e.target.files[0], (url) => setBeforeAfter({ ...beforeAfter, afterImage: url }), setUploadingAfter);
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Section 4: Services Header */}
          <div className="glass-panel p-8 rounded-lg border border-brand-gold/30 space-y-6">
            <h3 className="text-xl font-bold text-amber-400 border-b border-neutral-800 pb-2">Our Disciplines & Services Section Header</h3>
            <Input label="Section Subtitle (English)" value={servicesHeader.subtitleEn} onChange={(e) => setServicesHeader({ ...servicesHeader, subtitleEn: e.target.value })} />
            <Input label="Section Subtitle (Arabic)" value={servicesHeader.subtitleAr} onChange={(e) => setServicesHeader({ ...servicesHeader, subtitleAr: e.target.value })} />
            <Input label="Section Main Title (English)" value={servicesHeader.titleEn} onChange={(e) => setServicesHeader({ ...servicesHeader, titleEn: e.target.value })} />
            <Input label="Section Main Title (Arabic)" value={servicesHeader.titleAr} onChange={(e) => setServicesHeader({ ...servicesHeader, titleAr: e.target.value })} />
          </div>

          <Button type="submit" variant="gold" size="lg" className="w-full mt-4" isLoading={saving}>
            Save All Homepage Sections & Photos
          </Button>
        </form>
      </div>
    </div>
  );
}
