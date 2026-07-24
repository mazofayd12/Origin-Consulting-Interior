'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Alert } from '@/components/ui/Alert';
import { Plus, Edit, Trash, FolderTree } from 'lucide-react';

interface CategoryData {
  id: string;
  nameEn: string;
  nameAr: string;
  slug: string;
  projectCount: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export default function ProjectCategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [alertMsg, setAlertMsg] = useState('');

  const [categories, setCategories] = useState<CategoryData[]>([
    { id: '1', nameEn: 'Luxury Villas', nameAr: 'الفلل الفاخرة', slug: 'luxury-villas', projectCount: 14, status: 'ACTIVE' },
    { id: '2', nameEn: 'Residential', nameAr: 'المباني السكنية', slug: 'residential', projectCount: 18, status: 'ACTIVE' },
    { id: '3', nameEn: 'Commercial', nameAr: 'المشاريع التجارية', slug: 'commercial', projectCount: 12, status: 'ACTIVE' },
    { id: '4', nameEn: 'Office Headquarters', nameAr: 'المقرات الإدارية', slug: 'office', projectCount: 9, status: 'ACTIVE' },
    { id: '5', nameEn: 'Hospitality & Resorts', nameAr: 'الضيافة والمنتجعات', slug: 'hospitality', projectCount: 6, status: 'ACTIVE' },
    { id: '6', nameEn: 'Industrial Developments', nameAr: 'المشاريع الصناعية', slug: 'industrial', projectCount: 4, status: 'ACTIVE' },
  ]);

  const [form, setForm] = useState({ nameEn: '', nameAr: '', slug: '' });

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
    if (confirm('Are you sure you want to delete this project category?')) {
      setCategories(categories.filter((c) => c.id !== id));
      setAlertMsg('Category deleted successfully.');
      setTimeout(() => setAlertMsg(''), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = form.slug || form.nameEn.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    if (editingId) {
      setCategories(
        categories.map((c) => (c.id === editingId ? { ...c, nameEn: form.nameEn, nameAr: form.nameAr, slug: generatedSlug } : c))
      );
      setAlertMsg('Category updated successfully!');
    } else {
      setCategories([
        ...categories,
        {
          id: String(Date.now()),
          nameEn: form.nameEn,
          nameAr: form.nameAr,
          slug: generatedSlug,
          projectCount: 0,
          status: 'ACTIVE',
        },
      ]);
      setAlertMsg('New Project Category added!');
    }

    setIsModalOpen(false);
    setTimeout(() => setAlertMsg(''), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Project Categories Manager (إدارة تصنيفات المشاريع)</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Create, update, and manage categories used across portfolio filters</p>
          </div>
          <Button variant="gold" size="sm" onClick={handleOpenCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Add New Category (إضافة تصنيف جديد)</span>
          </Button>
        </div>

        {alertMsg && <Alert type="success" message={alertMsg} />}

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
            { header: 'Associated Projects', accessor: (row) => <Badge variant="gold">{row.projectCount} Projects</Badge> },
            { header: 'Status', accessor: (row) => <Badge variant="success">{row.status}</Badge> },
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
            <Button type="submit" variant="gold" size="lg" className="w-full mt-4">
              {editingId ? 'Save Category Changes' : 'Create Category'}
            </Button>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
