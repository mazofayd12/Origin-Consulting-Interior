'use client';

import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Skeleton';
import { ShieldCheck, KeyRound } from 'lucide-react';

export default function UserRolesPage() {
  const roles = [
    { id: '1', roleName: 'ADMIN', description: 'Full system access including security, user management, site settings, and database controls.', level: 'Level 10 - High' },
    { id: '2', roleName: 'CONTENT_MANAGER', description: 'Can publish and update homepage builder, about page, services, team members, testimonials, clients, and FAQ.', level: 'Level 7 - Medium' },
    { id: '3', roleName: 'BLOG_WRITER', description: 'Dedicated access to write, edit, and publish posts in the Blog & Journal section only.', level: 'Level 5 - Targeted' },
    { id: '4', roleName: 'PROJECTS_MANAGER', description: 'Dedicated access to manage projects, categories, and portfolio galleries.', level: 'Level 5 - Targeted' },
    { id: '5', roleName: 'INQUIRIES_MANAGER', description: 'Dedicated access to view customer contact inquiries, messages, and newsletter subscribers.', level: 'Level 4 - Limited' },
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
            { header: 'Description (الوصف والنطاق)', accessor: 'description' },
            { header: 'Access Level', accessor: 'level' },
          ]}
          data={roles}
        />
      </div>
    </AdminLayout>
  );
}
