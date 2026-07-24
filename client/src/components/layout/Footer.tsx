'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import { MapPin, Phone, Mail, Instagram, Linkedin, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, t } = useI18n();

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Summary & Official Logo */}
        <div className="flex flex-col gap-4">
          <Link href={`/${lang}`}>
            <img
              src="/images/logo.png"
              alt="Origin Design Logo"
              className="h-12 w-auto object-contain drop-shadow-[0_2px_10px_rgba(183,154,91,0.4)]"
            />
          </Link>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {lang === 'en'
              ? 'Pioneering architectural excellence, luxury interior design, and multi-disciplinary engineering services across Dubai, Riyadh, and international markets.'
              : 'رواد التميز المعماري والتصميم الداخلي الفاخر والهندسة المتكاملة في دبي والرياض والأسواق العالمية.'}
          </p>
          <div className="flex items-center gap-4 mt-2 text-brand-gold">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-4 border-b border-neutral-800 pb-2">
            {lang === 'en' ? 'Navigation' : 'روابط التنقل'}
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs">
            <li><Link href={`/${lang}/about`} className="hover:text-brand-gold transition-colors">{t('nav.about')}</Link></li>
            <li><Link href={`/${lang}/services`} className="hover:text-brand-gold transition-colors">{t('nav.services')}</Link></li>
            <li><Link href={`/${lang}/portfolio`} className="hover:text-brand-gold transition-colors">{t('nav.portfolio')}</Link></li>
            <li><Link href={`/${lang}/blog`} className="hover:text-brand-gold transition-colors">{t('nav.blog')}</Link></li>
            <li><Link href={`/${lang}/contact`} className="hover:text-brand-gold transition-colors">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        {/* Regional Offices */}
        <div>
          <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-4 border-b border-neutral-800 pb-2">
            {lang === 'en' ? 'Regional Head Offices' : 'المقرات الإقليمية'}
          </h4>
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex gap-2">
              <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
              <span>{lang === 'en' ? 'Dubai Marina Plaza, Suite 2804, Dubai, UAE' : 'دبي مارينا بلازا، جناح 2804، دبي، الإمارات'}</span>
            </div>
            <div className="flex gap-2">
              <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
              <span>{lang === 'en' ? 'King Fahd Road, KAFD Tower 12, Riyadh, KSA' : 'طريق الملك فهد، مركز كافد برج 12، الرياض، السعودية'}</span>
            </div>
          </div>
        </div>

        {/* Contact Hotline */}
        <div>
          <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-4 border-b border-neutral-800 pb-2">
            {lang === 'en' ? 'Direct Inquiries' : 'الاستفسارات المباشرة'}
          </h4>
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>+971 4 800 67444 | +966 11 400 9900</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-gold" />
              <span>info@origin-consulting.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500">
        {lang === 'en'
          ? `© ${new Date().getFullYear()} Origin Consulting Interior. All Rights Reserved.`
          : `© ${new Date().getFullYear()} جميع الحقوق محفوظة لشركة أوريجين للإستشارات والديكور.`}
      </div>
    </footer>
  );
};
