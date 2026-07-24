'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Shield, Lock } from 'lucide-react';
import axios from 'axios';

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@origin-consulting.com');
  const [password, setPassword] = useState('Admin@Origin2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      login(res.data.token, res.data.user);
      router.push(`/${lang}/admin/dashboard`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md glass-panel p-8 rounded-lg border border-brand-gold/40 shadow-luxury">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold flex items-center justify-center text-brand-gold mb-3">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">Executive Control Portal</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Origin Consulting Administration</p>
        </div>

        {error && <Alert type="danger" message={error} className="mb-6" />}

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            label="Administrator Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="gold" size="lg" className="w-full gap-2" isLoading={loading}>
            <Lock className="w-4 h-4" />
            <span>Authenticate Session</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
