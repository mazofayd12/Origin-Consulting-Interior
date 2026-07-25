'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Upload, Copy, Check, Loader2 } from 'lucide-react';
import axios from 'axios';

interface MediaItem {
  name: string;
  url: string;
}

export default function MediaImagesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const [images, setImages] = useState<MediaItem[]>([
    { name: 'logo.png', url: '/images/logo.png' },
    { name: 'villa-cover.jpg', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80' },
    { name: 'horizon-hq.jpg', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
    { name: 'interior-hero.jpg', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80' },
  ]);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (res.data?.url) {
          const newItem = { name: res.data.filename || file.name, url: res.data.url };
          setImages((prev) => [newItem, ...prev]);
          successCount++;
        }
      } catch (err: any) {
        console.error('Failed to upload image:', file.name, err);
      }
    }

    setUploading(false);
    if (successCount > 0) {
      setAlertMsg(`Successfully uploaded ${successCount} image(s) to VPS server!`);
      setTimeout(() => setAlertMsg(''), 4000);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Media Library - Images (مكتبة الصور والوسائط)</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Upload files directly to VPS server & copy high-res URLs for projects and blogs</p>
          </div>
          <label className="cursor-pointer bg-brand-gold text-black hover:bg-brand-gold/80 px-4 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>{uploading ? 'Uploading...' : 'Upload Image to VPS'}</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} disabled={uploading} />
          </label>
        </div>

        {alertMsg && <Alert type="success" message={alertMsg} />}

        {/* Upload Dropzone */}
        <label className="border-2 border-dashed border-brand-gold/40 hover:border-brand-gold p-8 rounded-lg text-center cursor-pointer transition-colors glass-panel block">
          {uploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-10 h-10 text-brand-gold animate-spin mb-3" />
              <span className="text-sm font-bold text-white block">Uploading Image File(s) to VPS...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-10 h-10 text-brand-gold mx-auto mb-3" />
              <span className="text-sm font-bold text-white block">Click or Select Image Files to Upload directly to VPS</span>
              <span className="text-xs text-neutral-400 block mt-1">Uploaded files are permanently stored on VPS server at /public/uploads/</span>
            </div>
          )}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} disabled={uploading} />
        </label>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((img, idx) => (
            <Card key={idx} className="p-3 group relative overflow-hidden">
              <div className="h-40 rounded overflow-hidden mb-3 border border-neutral-800 bg-neutral-900">
                <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <span className="text-xs font-mono text-neutral-300 truncate block" title={img.name}>{img.name}</span>
              <div className="mt-3 flex justify-between items-center">
                <button
                  onClick={() => handleCopy(img.url)}
                  className="text-[10px] uppercase font-bold tracking-wider text-brand-gold flex items-center gap-1 hover:underline"
                >
                  {copied === img.url ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied === img.url ? 'Copied!' : 'Copy URL'}</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
