'use client';

import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Skeleton';

export default function NewsletterSubscribersPage() {
  const subscribers = [
    { id: '1', email: 'executive@qasimi.ae', status: 'SUBSCRIBED', date: '2026-07-20' },
    { id: '2', name: 'Dr. Tariq Al-Mansoor', email: 'tariq@horizon.sa', status: 'SUBSCRIBED', date: '2026-07-22' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Newsletter Subscribers (المشتركين في النشرة)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Manage email marketing leads and subscribers</p>
        </div>

        <Table
          columns={[
            { header: 'Subscriber Email', accessor: 'email' },
            { header: 'Status', accessor: (row) => <Badge variant="success">{row.status}</Badge> },
            { header: 'Subscribed Date', accessor: 'date' },
          ]}
          data={subscribers}
        />
      </div>
    </AdminLayout>
  );
}
