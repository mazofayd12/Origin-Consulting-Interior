'use client';

import React from 'react';
import { useParams, usePathname } from 'next/navigation';
import { I18nProvider } from '@/i18n/context';
import { ThemeProvider } from '@/theme/context';
import { AuthProvider } from '@/features/auth/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function BilingualLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as 'en' | 'ar') || 'en';
  const isAdmin = pathname?.includes('/admin');

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <I18nProvider initialLang={lang}>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col justify-between bg-neutral-950 text-white selection:bg-brand-gold selection:text-black">
              {!isAdmin && <Navbar />}
              <main className="flex-grow">{children}</main>
              {!isAdmin && <Footer />}
            </div>
          </ThemeProvider>
        </I18nProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
