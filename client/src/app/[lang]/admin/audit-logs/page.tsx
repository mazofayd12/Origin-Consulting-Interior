'use client';

import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Skeleton';

export default function SecurityAuditLogsPage() {
  const auditLogs = [
    { id: '1', user: 'Alexander Wright (ADMIN)', action: 'PROJECT_CREATE', resource: 'projects', ip: '192.168.1.1', time: '2026-07-24 15:40:12' },
    { id: '2', user: 'Sarah Al-Hassan (EDITOR)', action: 'SERVICE_UPDATE', resource: 'services', ip: '192.168.1.15', time: '2026-07-24 14:12:05' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Security & Activity Audit Logs</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Immutable audit records of all administrative actions and system modifications</p>
        </div>

        <Table
          columns={[
            { header: 'Administrator User', accessor: 'user' },
            { header: 'Action Code', accessor: (row) => <Badge variant="gold">{row.action}</Badge> },
            { header: 'Target Resource', accessor: 'resource' },
            { header: 'IP Address', accessor: 'ip' },
            { header: 'Timestamp', accessor: 'time' },
          ]}
          data={auditLogs}
        />
      </div>
    </AdminLayout>
  );
}
