'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Skeleton';
import { FolderKanban, MessageSquare, ShieldCheck, TrendingUp } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function AdminDashboardOverview() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Inquiries Received 2026',
        data: [12, 19, 15, 25, 32, 28, 40],
        borderColor: '#B79A5B',
        backgroundColor: 'rgba(183, 154, 91, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const recentInquiries = [
    { id: '1', name: 'Sheikh Mansoor', email: 'mansoor@qasimi.ae', subject: 'Luxury Villa', status: 'NEW', date: '2026-07-24' },
    { id: '2', name: 'Dr. Tariq Al-Mansoor', email: 'tariq@horizon.sa', subject: 'KAFD Corporate HQ', status: 'IN_PROGRESS', date: '2026-07-23' },
  ];

  return (
    <div>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Executive Control Overview</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Origin Consulting Operations Dashboard</p>
          </div>
          <div className="flex gap-3">
            <Link href={`/${lang}/admin/projects`}>
              <Button size="sm" variant="gold">Manage Projects</Button>
            </Link>
            <Link href={`/${lang}/admin/inquiries`}>
              <Button size="sm" variant="outline">View Inquiries</Button>
            </Link>
          </div>
        </div>

        {/* Quick Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-brand-gold/10 text-brand-gold border border-brand-gold/30">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">48</span>
              <span className="block text-xs text-neutral-400 uppercase tracking-wider">Active Projects</span>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">124</span>
              <span className="block text-xs text-neutral-400 uppercase tracking-wider">Total Inquiries</span>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-950 text-blue-400 border border-blue-800">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">98.4%</span>
              <span className="block text-xs text-neutral-400 uppercase tracking-wider">Lighthouse Score</span>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-950 text-purple-400 border border-purple-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">Active</span>
              <span className="block text-xs text-neutral-400 uppercase tracking-wider">Security Audit</span>
            </div>
          </Card>
        </div>

        {/* Analytics Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-white mb-4">Inquiry Traffic & Lead Analytics</h3>
          <div className="h-72">
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </Card>

        {/* Recent Inquiries Table */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Recent Client Inquiries</h3>
          <Table
            columns={[
              { header: 'Client Name', accessor: 'name' },
              { header: 'Email', accessor: 'email' },
              { header: 'Discipline', accessor: 'subject' },
              { header: 'Status', accessor: (row) => <Badge variant={row.status === 'NEW' ? 'gold' : 'success'}>{row.status}</Badge> },
              { header: 'Date', accessor: 'date' },
            ]}
            data={recentInquiries}
          />
        </div>
      </div>
    </div>
  );
}
