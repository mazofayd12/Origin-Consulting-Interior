'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Upload, Image as ImageIcon, Trash, Copy, Check } from 'lucide-react';

export default function MediaImagesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const images = [
    { name: 'logo.png', url: '/images/logo.png' },
    { name: 'villa-cover.jpg', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80' },
    { name: 'horizon-hq.jpg', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
    { name: 'interior-hero.jpg', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Media Library - Images (مكتبة الصور)</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Upload, manage, and copy URLs of compressed high-res image assets</p>
          </div>
          <Button variant="gold" size="sm" className="gap-2">
            <Upload className="w-4 h-4" />
            <span>Upload New Images</span>
          </Button>
        </div>

        {/* Drag & Drop Upload Zone */}
        <div className="border-2 border-dashed border-brand-gold/40 hover:border-brand-gold p-8 rounded-lg text-center cursor-pointer transition-colors glass-panel">
          <Upload className="w-10 h-10 text-brand-gold mx-auto mb-3" />
          <span className="text-sm font-bold text-white block">Drag & Drop Image Files to Upload</span>
          <span className="text-xs text-neutral-400 block mt-1">Automatic WebP/AVIF compression & Sharp optimization</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((img, idx) => (
            <Card key={idx} className="p-3 group relative overflow-hidden">
              <div className="h-40 rounded overflow-hidden mb-3 border border-neutral-800">
                <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <span className="text-xs font-mono text-neutral-300 truncate block">{img.name}</span>
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
