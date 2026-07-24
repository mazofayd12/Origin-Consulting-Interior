'use client';

import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Check, ShieldAlert } from 'lucide-react';

export default function UserPermissionsPage() {
  const permissions = [
    { module: 'Projects Management', admin: true, editor: true },
    { module: 'Blog & Journal', admin: true, editor: true },
    { header: 'Media Assets Library', admin: true, editor: true },
    { module: 'Inquiries & Leads', admin: true, editor: false },
    { module: 'User Accounts & Roles', admin: true, editor: false },
    { module: 'Security & Audit Logs', admin: true, editor: false },
    { module: 'Site Settings & Integrations', admin: true, editor: false },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Permissions Matrix (مصفوفة الصلاحيات)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Role-based access matrix enforced across API endpoints</p>
        </div>

        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-300">
              <thead className="border-b border-neutral-800 text-brand-gold uppercase text-xs">
                <tr>
                  <th className="py-3 px-4">System Module</th>
                  <th className="py-3 px-4">ADMIN Role</th>
                  <th className="py-3 px-4">EDITOR Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {permissions.map((p, idx) => (
                  <tr key={idx}>
                    <td className="py-4 px-4 font-semibold text-white">{p.module || p.header}</td>
                    <td className="py-4 px-4"><Check className="w-5 h-5 text-emerald-400" /></td>
                    <td className="py-4 px-4">{p.editor ? <Check className="w-5 h-5 text-emerald-400" /> : <ShieldAlert className="w-5 h-5 text-red-500" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
