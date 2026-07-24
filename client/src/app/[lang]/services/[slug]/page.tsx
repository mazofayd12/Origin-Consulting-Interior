'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CheckCircle, ChevronDown, ArrowLeft } from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'interior-design';
  const { lang } = useI18n();

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const titleFormatted = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const mockService = {
    title: titleFormatted,
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    desc: `Our ${titleFormatted} team brings together master architects and precision engineers to deliver extraordinary space concepts. We oversee every detail from initial feasibility to site execution.`,
    benefits: [
      'Tailored Bespoke Customization',
      'Authority & Municipal Code Compliance',
      'Advanced 3D BIM Model Coordination',
      'Sustainable Luxury Material Selection',
    ],
    process: [
      { step: '01', title: 'Consultation & Discovery', desc: 'Understanding functional scope, aesthetic intent, and spatial parameters.' },
      { step: '02', title: 'Schematic Engineering', desc: 'Developing load calculations, architectural layouts, and material moodboards.' },
      { step: '03', title: 'BIM & Working Specs', desc: 'Finalizing construction blueprints, MEP schematics, and authority permits.' },
      { step: '04', title: 'Turnkey Site Execution', desc: 'On-site supervision, quality inspection, and project handover.' },
    ],
    faqs: [
      { q: `What is the lead time for ${titleFormatted}?`, a: 'Initial concept blueprints take 2-4 weeks, followed by full working drawing packages.' },
      { q: 'Do you handle regional authority approvals?', a: 'Yes, we manage complete authority submissions in Dubai (DEWA, Municipality) and KSA (Balady).' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    ],
  };

  return (
    <>
      <SEOHead title={`${mockService.title} | Origin Consulting Interior`} description={mockService.desc} />

      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-neutral-800">
        <img src={mockService.heroImage} alt={mockService.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm" />
        <div className="relative z-10 text-center max-w-4xl px-4">
          <Link href={`/${lang}/services`} className="inline-flex items-center text-xs uppercase tracking-widest text-brand-gold gap-2 mb-4 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">{mockService.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Description & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Service Overview</span>
            <h2 className="text-3xl font-extrabold text-white mt-2 mb-4">Precision Engineering & Aesthetics</h2>
            <p className="text-neutral-300 leading-relaxed">{mockService.desc}</p>
          </div>
          <Card>
            <h3 className="text-xl font-bold text-white mb-6">Key Client Benefits</h3>
            <div className="flex flex-col gap-4 text-sm">
              {mockService.benefits.map((b, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Process */}
        <div className="my-24">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Our Execution Methodology</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {mockService.process.map((p, idx) => (
              <div key={idx} className="glass-panel p-6 border-t-2 border-t-brand-gold">
                <span className="text-2xl font-bold text-brand-gold">{p.step}</span>
                <h4 className="text-lg font-bold text-white mt-2">{p.title}</h4>
                <p className="text-xs text-neutral-400 mt-2">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="my-24">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Project Showcase Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockService.gallery.map((img, idx) => (
              <div key={idx} className="h-80 rounded-lg overflow-hidden border border-neutral-800 shadow-luxury">
                <img src={img} alt="Showcase" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="my-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {mockService.faqs.map((faq, idx) => (
              <div key={idx} className="glass-panel rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center font-semibold text-white hover:text-brand-gold"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180 text-brand-gold' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-neutral-400 border-t border-neutral-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-neutral-900 border border-brand-gold/30 rounded-lg p-12">
          <h3 className="text-3xl font-extrabold text-white">Require {mockService.title} Consultation?</h3>
          <p className="text-neutral-400 mt-2 mb-6">Our technical team is ready to evaluate your architectural schematics.</p>
          <Link href={`/${lang}/contact`}>
            <Button size="lg" variant="gold">Inquire Now</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
