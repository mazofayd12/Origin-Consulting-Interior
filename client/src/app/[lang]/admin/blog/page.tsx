'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/Alert';
import { Plus, Edit, Trash, Upload, Loader2 } from 'lucide-react';
import axios from 'axios';

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
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [posts, setPosts] = useState<BlogPostData[]>([]);

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
    publishedAt: new Date().toISOString().split('T')[0],
  };

  const [form, setForm] = useState<Omit<BlogPostData, 'id'>>(defaultForm);

  const fetchBlogPostsFromDB = async () => {
    setFetching(true);
    try {
      const res = await axios.get('/api/blog');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch blog posts from DB', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBlogPostsFromDB();
  }, []);

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

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article permanently from database?')) {
      try {
        const token = localStorage.getItem('origin_token');
        await axios.delete(`/api/blog/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlertMsg('Article permanently deleted from database!');
        fetchBlogPostsFromDB();
      } catch (err: any) {
        setAlertMsg('Failed to delete: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.url) {
        setForm((prev) => ({ ...prev, coverImage: res.data.url }));
        setAlertMsg('Image uploaded to VPS successfully!');
        setTimeout(() => setAlertMsg(''), 3000);
      }
    } catch (err: any) {
      alert('Upload failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const slugGen = form.slug || form.titleEn.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const token = localStorage.getItem('origin_token');

    try {
      if (editingId) {
        await axios.put(`/api/blog/${editingId}`, { ...form, slug: slugGen }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlertMsg('Blog article updated in database successfully!');
      } else {
        await axios.post('/api/blog', { ...form, slug: slugGen }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlertMsg('New Blog Article published and saved to database!');
      }
      setIsModalOpen(false);
      fetchBlogPostsFromDB();
    } catch (err: any) {
      setAlertMsg('Error saving blog: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
      setTimeout(() => setAlertMsg(''), 4000);
    }
  };

  return (
    <div>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Blog & Content Manager (مربوط بقاعدة البيانات)</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Create, edit, and publish SEO-optimized journal articles directly to Database</p>
          </div>
          <Button variant="gold" size="sm" onClick={handleOpenCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </Button>
        </div>

        {alertMsg && <Alert type="success" message={alertMsg} />}

        {fetching ? (
          <div className="text-center py-12 text-neutral-400 font-semibold">Loading articles from database...</div>
        ) : (
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
        )}

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

            {/* Cover Image URL & Direct VPS Upload Button */}
            <div className="space-y-3 border-t border-b border-neutral-800 py-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">Cover Image</label>
              <div className="flex items-center gap-3">
                <Input
                  className="flex-1"
                  placeholder="https://... or /uploads/..."
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  required
                />
                <label className="cursor-pointer bg-brand-gold text-black hover:bg-brand-gold/80 px-4 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                </label>
              </div>
              {form.coverImage && (
                <img src={form.coverImage} alt="Preview" className="w-24 h-16 object-cover rounded border border-brand-gold/40 mt-2" />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <Button type="submit" variant="gold" size="lg" className="w-full mt-6" isLoading={loading}>
              {editingId ? 'Save Changes to DB' : 'Publish Article to DB'}
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
