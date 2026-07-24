'use client';

import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Skeleton';
import { ShieldCheck, KeyRound } from 'lucide-react';

export default function UserRolesPage() {
  const roles = [
    { id: '1', roleName: 'ADMIN', description: 'Full system access including security, users, database backups, and settings.', usersCount: 2 },
    { id: '2', roleName: 'EDITOR', description: 'Can publish and update projects, blog posts, testimonials, and team members.', usersCount: 5 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">System Roles Configuration (الأدوار والصلاحيات)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Define access control tiers for administrative team members</p>
        </div>

        <Table
          columns={[
            { header: 'Role Title', accessor: (row) => <Badge variant="gold">{row.roleName}</Badge> },
            { header: 'Description', accessor: 'description' },
            { header: 'Assigned Administrators', accessor: (row) => `${row.usersCount} Active Users` },
          ]}
          data={roles}
        />
      </div>
    </AdminLayout>
  );
}
