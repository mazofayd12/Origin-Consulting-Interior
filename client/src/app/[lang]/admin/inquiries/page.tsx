'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import axios from 'axios';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function ManageInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('origin_token');
      const res = await axios.get('/api/contact', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInquiries(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'NEW' ? 'RESOLVED' : 'NEW';
    try {
      const token = localStorage.getItem('origin_token');
      await axios.put(`/api/contact/${id}`, { status: nextStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchInquiries();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Client Inquiries (مسترجعة حياً من قاعدة البيانات Prisma DB)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Real-time client leads & project messages saved directly from contact forms</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-neutral-400 font-semibold">Loading live inquiry leads from database...</div>
        ) : (
          <Table
            columns={[
              { header: 'Client Name', accessor: 'name' },
              { header: 'Email', accessor: 'email' },
              { header: 'Phone', accessor: 'phone' },
              { header: 'Discipline', accessor: 'subject' },
              { header: 'Status', accessor: (row) => <Badge variant={row.status === 'NEW' ? 'gold' : 'success'}>{row.status}</Badge> },
              { header: 'Submitted', accessor: (row) => new Date(row.createdAt).toLocaleDateString() },
              {
                header: 'Toggle Status',
                accessor: (row) => (
                  <Button size="sm" variant="outline" onClick={() => toggleStatus(row.id, row.status)}>
                    Mark {row.status === 'NEW' ? 'Resolved' : 'New'}
                  </Button>
                ),
              },
            ]}
            data={inquiries}
          />
        )}
      </div>
    </AdminLayout>
  );
}
