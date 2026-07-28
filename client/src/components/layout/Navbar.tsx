'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from '@/i18n/context';
import { useTheme } from '@/theme/context';
import { Globe, Sun, Moon, Menu, X, Shield } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ar' : 'en';
    setLang(nextLang);

    // Replace /[lang]/ in pathname with /[nextLang]/
    const segments = pathname.split('/');
    if (segments[1] === 'en' || segments[1] === 'ar') {
      segments[1] = nextLang;
      const newPath = segments.join('/');
      router.push(newPath);
    } else {
      router.push(`/${nextLang}`);
    }
  };

  const navLinks = [
    { href: `/${lang}`, label: t('nav.home') },
    { href: `/${lang}/about`, label: t('nav.about') },
    { href: `/${lang}/services`, label: t('nav.services') },
    { href: `/${lang}/portfolio`, label: t('nav.portfolio') },
    { href: `/${lang}/blog`, label: t('nav.blog') },
    { href: `/${lang}/testimonials`, label: t('nav.testimonials') },
    { href: `/${lang}/contact`, label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-brand-gold/20 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo - Using Official Uploaded Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-3 group">
          <img
            src="/images/logo.png"
            alt="Origin Design Logo"
            className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_10px_rgba(183,154,91,0.4)]"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest text-neutral-300 hover:text-brand-gold font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Utility Controls & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-full text-neutral-300 hover:text-brand-gold hover:bg-white/5 transition-colors flex items-center gap-1.5 text-xs uppercase font-bold"
            title="Switch Language"
          >
            <Globe className="w-4 h-4 text-brand-gold" />
            <span>{lang === 'en' ? 'العربية (Arabic)' : 'English'}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-neutral-300 hover:text-brand-gold hover:bg-white/5 transition-colors flex items-center gap-1.5 text-xs font-bold border border-brand-gold/20 px-3"
            title={theme === 'dark' ? 'Switch to Light Mode (الوضع الفاتح)' : 'Switch to Dark Mode (الوضع الداكن)'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-brand-gold" />
                <span>{lang === 'en' ? 'Light' : 'فاتح'}</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-brand-gold" />
                <span>{lang === 'en' ? 'Dark' : 'داكن'}</span>
              </>
            )}
          </button>

          <Link href={`/${lang}/admin/login`}>
            <button className="p-2 rounded-full text-neutral-400 hover:text-brand-gold" title="Admin Login">
              <Shield className="w-4 h-4" />
            </button>
          </Link>

          <Link href={`/${lang}/contact`}>
            <Button size="sm" variant="gold">
              {t('hero.contactUs')}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center gap-3">
          <button onClick={toggleLanguage} className="text-xs text-brand-gold font-bold px-2 py-1 border border-brand-gold/30 rounded">
            {lang === 'en' ? 'العربية' : 'EN'}
          </button>
          <button onClick={toggleTheme} className="p-1.5 text-brand-gold border border-brand-gold/30 rounded">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-2">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden glass-panel border-t border-neutral-800 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm uppercase tracking-widest text-neutral-200 hover:text-brand-gold py-2 border-b border-neutral-800/50"
            >
              {link.label}
            </Link>
          ))}
          <Link href={`/${lang}/contact`} onClick={() => setMobileOpen(false)}>
            <Button className="w-full mt-2" variant="gold">
              {t('hero.contactUs')}
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};
