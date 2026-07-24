'use client';

import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Skeleton';
import { ShieldCheck, Lock, Key, Server, AlertTriangle } from 'lucide-react';

export default function SecurityOverviewPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">System Security Overview (أمان النظام)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Monitor security posture, rate limiting, JWT token expiry, and CORS policies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">Helmet Headers</span>
              <span className="block text-xs text-emerald-400 font-semibold">Active & Enforced</span>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-950 text-blue-400 border border-blue-800">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">Rate Limiter</span>
              <span className="block text-xs text-blue-400 font-semibold">100 req / 15m Window</span>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-brand-gold/10 text-brand-gold border border-brand-gold/30">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">JWT Access Token</span>
              <span className="block text-xs text-brand-gold font-semibold">24h Expiry</span>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-white mb-4">Security Hardening Verification</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-neutral-800">
              <span>Cross-Origin Resource Sharing (CORS) Policy</span>
              <Badge variant="success">Strictly Configured</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-800">
              <span>SQL & NoSQL Injection Protection</span>
              <Badge variant="success">Prisma Prepared Statements</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-800">
              <span>Cross-Site Scripting (XSS) Filtering</span>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-800">
              <span>Password Hashing Algorithm</span>
              <Badge variant="gold">Bcrypt 10 Rounds</Badge>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
