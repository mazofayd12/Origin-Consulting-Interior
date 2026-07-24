'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/Alert';
import { Plus, Edit, Trash } from 'lucide-react';

interface BlogPostData {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: string;
  contentAr: string;
  categoryEn: string;
  categoryAr: string;
  tags: string[];
  coverImage: string;
  author: string;
  readingTime: string;
  isPublished: boolean;
  seoTitleEn?: string;
  seoDescEn?: string;
  seoTitleAr?: string;
  seoDescAr?: string;
  publishedAt: string;
}

export default function ManageBlogPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [alertMsg, setAlertMsg] = useState('');

  const [posts, setPosts] = useState<BlogPostData[]>([
    {
      id: '1',
      slug: 'future-of-sustainable-architecture-gcc-2026',
      titleEn: 'The Future of Sustainable Architecture in the GCC',
      titleAr: 'مستقبل العمارة المستدامة في دول مجلس التعاون الخليجي',
      excerptEn: 'How biophilic design, net-zero energy codes, and smart glass facades are revolutionizing Middle Eastern architecture.',
      excerptAr: 'كيف تساهم التصاميم المستدامة والواجهات الذكية في إحداث ثورة في العمارة بالشرق الأوسط.',
      contentEn: '<p>The modern architectural landscape in the Gulf region is witnessing a historic paradigm shift...</p>',
      contentAr: '<p>تشهد الساحة المعمارية الحديثة في منطقة الخليج تحولاً تاريخياً نحو أداء المباني الصفرية...</p>',
      categoryEn: 'Architecture Trends',
      categoryAr: 'اتجاهات العمارة',
      tags: ['Sustainability', 'GCC', 'Smart Buildings', 'LEED'],
      coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      author: 'Dr. Tariq Al-Mansoor',
      readingTime: '5 min read',
      isPublished: true,
      seoTitleEn: 'Future of Sustainable Architecture GCC 2026 | Origin Insights',
      seoDescEn: 'Explore how sustainable architectural engineering is shaping green luxury developments.',
      publishedAt: '2026-07-24',
    },
  ]);

  const defaultForm: Omit<BlogPostData, 'id'> = {
    slug: '',
    titleEn: '',
    titleAr: '',
    excerptEn: '',
    excerptAr: '',
    contentEn: '',
    contentAr: '',
    categoryEn: 'Architecture Trends',
    categoryAr: 'اتجاهات العمارة',
    tags: ['Architecture', 'Design'],
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    author: 'Alexander Wright',
    readingTime: '4 min read',
    isPublished: true,
    seoTitleEn: '',
    seoDescEn: '',
    seoTitleAr: '',
    seoDescAr: '',
    publishedAt: '2026-07-24',
  };

  const [form, setForm] = useState<Omit<BlogPostData, 'id'>>(defaultForm);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(defaultForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: BlogPostData) => {
    setEditingId(p.id);
    setForm({ ...p });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setPosts(posts.filter((p) => p.id !== id));
      setAlertMsg('Article deleted successfully.');
      setTimeout(() => setAlertMsg(''), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slugGen = form.slug || form.titleEn.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    if (editingId) {
      setPosts(posts.map((p) => (p.id === editingId ? { ...form, id: editingId, slug: slugGen } : p)));
      setAlertMsg('Blog article updated with full content & SEO metadata!');
    } else {
      const newPost: BlogPostData = {
        ...form,
        id: String(Date.now()),
        slug: slugGen,
      };
      setPosts([newPost, ...posts]);
      setAlertMsg('New Blog Article published successfully!');
    }

    setIsModalOpen(false);
    setTimeout(() => setAlertMsg(''), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Blog & Content Manager</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Create, edit, and publish SEO-optimized journal articles</p>
          </div>
          <Button variant="gold" size="sm" onClick={handleOpenCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </Button>
        </div>

        {alertMsg && <Alert type="success" message={alertMsg} />}

        <Table
          columns={[
            {
              header: 'Article Title',
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
            { header: 'Category', accessor: 'categoryEn' },
            { header: 'Author', accessor: 'author' },
            { header: 'Reading Time', accessor: 'readingTime' },
            { header: 'Status', accessor: (row) => <Badge variant={row.isPublished ? 'success' : 'neutral'}>{row.isPublished ? 'Published' : 'Draft'}</Badge> },
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
          data={posts}
        />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Article' : 'Write New Article'}>
          <form onSubmit={handleSubmit} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Article Title (English)"
                value={form.titleEn}
                onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                required
              />
              <Input
                label="Article Title (Arabic)"
                value={form.titleAr}
                onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input label="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required />
              <Input label="Reading Time" value={form.readingTime} onChange={(e) => setForm({ ...form, readingTime: e.target.value })} required />
              <Input label="Category" value={form.categoryEn} onChange={(e) => setForm({ ...form, categoryEn: e.target.value, categoryAr: e.target.value })} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Excerpt (English)</label>
                <textarea
                  rows={2}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold"
                  value={form.excerptEn}
                  onChange={(e) => setForm({ ...form, excerptEn: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Excerpt (Arabic)</label>
                <textarea
                  rows={2}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold text-right"
                  dir="rtl"
                  value={form.excerptAr}
                  onChange={(e) => setForm({ ...form, excerptAr: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Full Article Content (English)</label>
                <textarea
                  rows={5}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold font-mono"
                  value={form.contentEn}
                  onChange={(e) => setForm({ ...form, contentEn: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Full Article Content (Arabic)</label>
                <textarea
                  rows={5}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold text-right font-mono"
                  dir="rtl"
                  value={form.contentAr}
                  onChange={(e) => setForm({ ...form, contentAr: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-800 pt-4">
              <Input label="Cover Image URL" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} required />
              <Input label="Tags (comma separated)" value={form.tags.join(', ')} onChange={(e) => setForm({ ...form, tags: e.target.value.split(',').map((t) => t.trim()) })} />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="w-4 h-4 text-brand-gold bg-neutral-900 border-neutral-800 rounded focus:ring-brand-gold"
              />
              <label htmlFor="isPublished" className="text-sm font-semibold text-white cursor-pointer">
                Publish Article Immediately
              </label>
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full mt-6">
              {editingId ? 'Save Changes' : 'Publish Article'}
            </Button>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
