'use client';

import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Upload, Video } from 'lucide-react';

export default function MediaVideosPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Media Library - Videos (الفيديوهات)</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Manage video fly-throughs, 3D VR renders, and hero background loops</p>
          </div>
          <Button variant="gold" size="sm" className="gap-2">
            <Upload className="w-4 h-4" />
            <span>Upload Video Asset</span>
          </Button>
        </div>

        <Card className="p-8 text-center border-brand-gold/30">
          <Video className="w-12 h-12 text-brand-gold mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">Video Asset Manager</h3>
          <p className="text-neutral-400 text-xs mt-1">Upload MP4/WebM video files for hero backdrops and architectural walk-throughs.</p>
        </Card>
      </div>
    </AdminLayout>
  );
}
