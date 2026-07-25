'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthContext';

export default function AdminIndexPage() {
  const router = useRouter();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(`/${lang}/admin/dashboard`);
    } else {
      router.replace(`/${lang}/admin/login`);
    }
  }, [isAuthenticated, lang, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <div className="animate-pulse text-brand-gold text-sm font-semibold tracking-widest uppercase">
        Redirecting to Executive Control Portal...
      </div>
    </div>
  );
}
