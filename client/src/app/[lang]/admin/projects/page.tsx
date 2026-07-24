'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/Alert';
import { Plus, Edit, Trash, Loader2 } from 'lucide-react';
import axios from 'axios';

interface ProjectData {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  category: string;
  locationEn: string;
  locationAr: string;
  areaSqm: number;
  year: number;
  servicesEn: string[];
  servicesAr: string[];
  coverImage: string;
  images: string[];
  descEn: string;
  descAr: string;
  isFeatured: boolean;
}

export default function ManageProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [alertMsg, setAlertMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [projects, setProjects] = useState<ProjectData[]>([]);

  const defaultForm: Omit<ProjectData, 'id'> = {
    slug: '',
    titleEn: '',
    titleAr: '',
    category: 'Luxury Villas',
    locationEn: '',
    locationAr: '',
    areaSqm: 1500,
    year: 2026,
    servicesEn: ['Interior Design', 'Architecture'],
    servicesAr: ['التصميم الداخلي', 'العمارة'],
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    ],
    descEn: '',
    descAr: '',
    isFeatured: true,
  };

  const [form, setForm] = useState<Omit<ProjectData, 'id'>>(defaultForm);

  // Fetch Projects directly from Prisma Database via Express API
  const fetchProjectsFromDB = async () => {
    setFetching(true);
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch from DB', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProjectsFromDB();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(defaultForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: ProjectData) => {
    setEditingId(p.id);
    setForm({ ...p });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project from the database?')) {
      try {
        const token = localStorage.getItem('origin_token');
        await axios.delete(`/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlertMsg('Project permanently deleted from database!');
        fetchProjectsFromDB();
      } catch (err: any) {
        setAlertMsg('Failed to delete from DB: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const slugGenerated = form.slug || form.titleEn.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const token = localStorage.getItem('origin_token');

    try {
      if (editingId) {
        await axios.put(`/api/projects/${editingId}`, { ...form, slug: slugGenerated }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlertMsg('Project updated in database successfully!');
      } else {
        await axios.post('/api/projects', { ...form, slug: slugGenerated }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlertMsg('New Project created and saved into Database!');
      }
      setIsModalOpen(false);
      fetchProjectsFromDB();
    } catch (err: any) {
      setAlertMsg('Database Operation Error: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
      setTimeout(() => setAlertMsg(''), 4000);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Projects Manager (مربوط بقاعدة البيانات Prisma DB)</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Real-time database CRUD operations synced with PostgreSQL / SQLite dev.db</p>
          </div>
          <Button variant="gold" size="sm" onClick={handleOpenCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Project to DB</span>
          </Button>
        </div>

        {alertMsg && <Alert type="success" message={alertMsg} />}

        {fetching ? (
          <div className="text-center py-12 text-neutral-400 font-semibold">Loading project data from database...</div>
        ) : (
          <Table
            columns={[
              {
                header: 'Cover & Title',
                accessor: (row) => (
                  <div className="flex items-center gap-3">
                    <img src={row.coverImage} alt={row.titleEn} className="w-12 h-12 rounded object-cover border border-brand-gold/30" />
                    <div>
                      <h4 className="text-white font-bold text-sm">{row.titleEn}</h4>
                      <span className="text-xs text-brand-gold block font-mono">{row.titleAr}</span>
                    </div>
                  </div>
                ),
              },
              { header: 'Category', accessor: 'category' },
              { header: 'Location', accessor: (row) => `${row.locationEn} (${row.locationAr})` },
              { header: 'Area', accessor: (row) => `${row.areaSqm} SQM` },
              { header: 'Year', accessor: 'year' },
              { header: 'Featured', accessor: (row) => <Badge variant={row.isFeatured ? 'gold' : 'neutral'}>{row.isFeatured ? 'Featured' : 'Standard'}</Badge> },
              {
                header: 'Actions',
                accessor: (row) => (
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenEdit(row)} className="p-2 text-neutral-400 hover:text-brand-gold transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(row.id)} className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ),
              },
            ]}
            data={projects}
          />
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Project in DB' : 'Add New Project to DB'}>
          <form onSubmit={handleSubmit} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Project Title (English)" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} required />
              <Input label="Project Title (Arabic)" value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Category"
                options={[
                  { label: 'Luxury Villas', value: 'Luxury Villas' },
                  { label: 'Residential', value: 'Residential' },
                  { label: 'Commercial', value: 'Commercial' },
                  { label: 'Office', value: 'Office' },
                  { label: 'Hospitality', value: 'Hospitality' },
                  { label: 'Industrial', value: 'Industrial' },
                ]}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              <Input label="Area in SQM" type="number" value={form.areaSqm} onChange={(e) => setForm({ ...form, areaSqm: Number(e.target.value) })} required />
              <Input label="Completion Year" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Location (English)" value={form.locationEn} onChange={(e) => setForm({ ...form, locationEn: e.target.value })} required />
              <Input label="Location (Arabic)" value={form.locationAr} onChange={(e) => setForm({ ...form, locationAr: e.target.value })} required />
            </div>

            <div className="space-y-3 border-t border-b border-neutral-800 py-4">
              <Input label="Cover Image URL" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} required />
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">Gallery Images URLs (comma separated)</label>
              <textarea
                rows={2}
                className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold"
                value={form.images.join(', ')}
                onChange={(e) => setForm({ ...form, images: e.target.value.split(',').map((s) => s.trim()) })}
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Detailed Description (English)</label>
                <textarea
                  rows={3}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold"
                  value={form.descEn}
                  onChange={(e) => setForm({ ...form, descAr: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Detailed Description (Arabic)</label>
                <textarea
                  rows={3}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold text-right"
                  dir="rtl"
                  value={form.descAr}
                  onChange={(e) => setForm({ ...form, descAr: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                className="w-4 h-4 text-brand-gold bg-neutral-900 border-neutral-800 rounded focus:ring-brand-gold"
              />
              <label htmlFor="isFeatured" className="text-sm font-semibold text-white cursor-pointer">Feature on Homepage</label>
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full mt-6" isLoading={loading}>
              Save to Database Permanently
            </Button>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
