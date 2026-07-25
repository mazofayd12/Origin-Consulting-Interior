'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Alert } from '@/components/ui/Alert';
import { Plus, Edit, Trash, FolderTree, Loader2 } from 'lucide-react';
import axios from 'axios';

interface CategoryData {
  id: string;
  nameEn: string;
  nameAr: string;
  slug: string;
}

export default function ProjectCategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [alertMsg, setAlertMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const defaultCategories: CategoryData[] = [
    { id: '1', nameEn: 'Luxury Villas', nameAr: 'الفلل الفاخرة', slug: 'luxury-villas' },
    { id: '2', nameEn: 'Residential', nameAr: 'المباني السكنية', slug: 'residential' },
    { id: '3', nameEn: 'Commercial', nameAr: 'المشاريع التجارية', slug: 'commercial' },
    { id: '4', nameEn: 'Office', nameAr: 'المقرات الإدارية', slug: 'office' },
    { id: '5', nameEn: 'Hospitality', nameAr: 'الضيافة والمنتجعات', slug: 'hospitality' },
    { id: '6', nameEn: 'Industrial', nameAr: 'المشاريع الصناعية', slug: 'industrial' },
  ];

  const [categories, setCategories] = useState<CategoryData[]>(defaultCategories);
  const [form, setForm] = useState({ nameEn: '', nameAr: '', slug: '' });

  const fetchCategoriesFromDB = async () => {
    setFetching(true);
    try {
      const res = await axios.get('/api/settings');
      if (res.data?.project_categories && Array.isArray(res.data.project_categories) && res.data.project_categories.length > 0) {
        setCategories(res.data.project_categories);
      } else {
        setCategories(defaultCategories);
      }
    } catch (err) {
      console.error('Failed to fetch categories from DB', err);
      setCategories(defaultCategories);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCategoriesFromDB();
  }, []);

  const saveCategoriesToDB = async (updatedCategories: CategoryData[]) => {
    setLoading(true);
    try {
      await axios.post('/api/settings', { project_categories: updatedCategories });
      setCategories(updatedCategories);
      setAlertMsg('Categories saved to database successfully!');
      setTimeout(() => setAlertMsg(''), 3000);
    } catch (err: any) {
      alert('Failed to save categories: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({ nameEn: '', nameAr: '', slug: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: CategoryData) => {
    setEditingId(c.id);
    setForm({ nameEn: c.nameEn, nameAr: c.nameAr, slug: c.slug });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category permanently from database?')) {
      const filtered = categories.filter((c) => c.id !== id);
      saveCategoriesToDB(filtered);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = form.slug || form.nameEn.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    let updated: CategoryData[] = [];
    if (editingId) {
      updated = categories.map((c) => (c.id === editingId ? { ...c, nameEn: form.nameEn, nameAr: form.nameAr, slug: generatedSlug } : c));
    } else {
      updated = [
        ...categories,
        {
          id: String(Date.now()),
          nameEn: form.nameEn,
          nameAr: form.nameAr,
          slug: generatedSlug,
        },
      ];
    }

    setIsModalOpen(false);
    saveCategoriesToDB(updated);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Project Categories Manager (إدارة تصنيفات المشاريع)</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Create, update, and save categories directly in Database</p>
          </div>
          <Button variant="gold" size="sm" onClick={handleOpenCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Add New Category (إضافة تصنيف جديد)</span>
          </Button>
        </div>

        {alertMsg && <Alert type="success" message={alertMsg} />}

        {fetching ? (
          <div className="text-center py-12 text-neutral-400 font-semibold flex justify-center items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-brand-gold" />
            <span>Loading categories from database...</span>
          </div>
        ) : (
          <Table
            columns={[
              {
                header: 'Category Title (English / Arabic)',
                accessor: (row) => (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/30">
                      <FolderTree className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{row.nameEn}</h4>
                      <span className="text-xs text-brand-gold block font-mono">{row.nameAr}</span>
                    </div>
                  </div>
                ),
              },
              { header: 'URL Slug', accessor: (row) => <span className="font-mono text-xs text-neutral-400">/{row.slug}</span> },
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
            data={categories}
          />
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Category' : 'Add New Category'}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Category Name (English)"
              value={form.nameEn}
              onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
              placeholder="e.g. Landscape Architecture"
              required
            />
            <Input
              label="Category Name (Arabic - الاسم بالعربية)"
              value={form.nameAr}
              onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
              placeholder="مثال: هندسة الحدائق والمساحات الخضراء"
              required
            />
            <Input
              label="URL Slug (اختياري - يولد تلقائياً)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="e.g. landscape-architecture"
            />
            <Button type="submit" variant="gold" size="lg" className="w-full mt-4" isLoading={loading}>
              {editingId ? 'Save Category Changes to DB' : 'Create Category in DB'}
            </Button>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
