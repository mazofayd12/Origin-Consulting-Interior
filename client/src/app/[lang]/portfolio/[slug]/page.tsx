'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MapPin, Calendar, Layers, Maximize2, ArrowLeft } from 'lucide-react';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'royal-palms-villa';
  const { lang } = useI18n();

  const mockProject = {
    title: slug === 'horizon-corporate-tower' ? 'Horizon FinTech HQ' : 'Royal Palms Luxury Villa',
    category: 'Luxury Villas',
    location: 'Emirates Hills, Dubai',
    area: '2,400 SQM',
    year: 2025,
    services: ['Interior Design', 'Architecture', 'MEP Engineering', 'Turnkey Fit-Out'],
    coverImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    ],
    desc: 'An ultra-luxurious private sanctuary engineered with double-height marble foyers, custom Italian millwork, kinetic dynamic lighting, and integrated smart home automation.',
  };

  return (
    <>
      <SEOHead title={`${mockProject.title} | Origin Consulting Interior`} description={mockProject.desc} />

      <div className="relative h-[65vh] flex items-center justify-center border-b border-neutral-800 overflow-hidden">
        <img src={mockProject.coverImage} alt={mockProject.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-neutral-950/75 backdrop-blur-xs" />
        <div className="relative z-10 text-center max-w-4xl px-4">
          <Link href={`/${lang}/portfolio`} className="inline-flex items-center text-xs uppercase tracking-widest text-brand-gold gap-2 mb-4 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
          <span className="block text-xs uppercase tracking-widest text-brand-gold font-bold mb-2">{mockProject.category}</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">{mockProject.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Project Specs Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 glass-panel rounded-lg mb-16 border-brand-gold/30">
          <div>
            <span className="text-xs uppercase text-neutral-400 block">Location</span>
            <span className="text-lg font-bold text-white mt-1 block">{mockProject.location}</span>
          </div>
          <div>
            <span className="text-xs uppercase text-neutral-400 block">Built Area</span>
            <span className="text-lg font-bold text-white mt-1 block">{mockProject.area}</span>
          </div>
          <div>
            <span className="text-xs uppercase text-neutral-400 block">Completion Year</span>
            <span className="text-lg font-bold text-white mt-1 block">{mockProject.year}</span>
          </div>
          <div>
            <span className="text-xs uppercase text-neutral-400 block">Disciplines</span>
            <span className="text-sm font-semibold text-brand-gold mt-1 block">{mockProject.services.join(', ')}</span>
          </div>
        </div>

        {/* Narrative & Gallery */}
        <div className="mb-20">
          <h2 className="text-3xl font-extrabold text-white mb-6">Architectural Narrative</h2>
          <p className="text-neutral-300 text-lg leading-relaxed font-light">{mockProject.desc}</p>
        </div>

        <div className="my-16">
          <h3 className="text-2xl font-bold text-white mb-8">High-Resolution Image Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockProject.gallery.map((img, idx) => (
              <div key={idx} className="h-72 rounded-lg overflow-hidden border border-neutral-800 shadow-luxury">
                <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <Link href={`/${lang}/contact`}>
            <Button size="lg" variant="gold">Inquire About Similar Development</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
