'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Table } from '@/components/ui/Table';
import { Alert } from '@/components/ui/Alert';
import { Plus, Edit, Trash, Upload, Loader2 } from 'lucide-react';
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
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [categoriesList, setCategoriesList] = useState<{ label: string; value: string }[]>([
    { label: 'Luxury Villas', value: 'Luxury Villas' },
    { label: 'Residential', value: 'Residential' },
    { label: 'Commercial', value: 'Commercial' },
    { label: 'Office', value: 'Office' },
    { label: 'Hospitality', value: 'Hospitality' },
    { label: 'Industrial', value: 'Industrial' },
  ]);

  const defaultForm: Omit<ProjectData, 'id'> = {
    slug: '',
    titleEn: '',
    titleAr: '',
    category: 'Luxury Villas',
    locationEn: '',
    locationAr: '',
    areaSqm: 2400,
    year: 2026,
    servicesEn: ['Interior Design', 'Architecture'],
    servicesAr: ['التصميم الداخلي', 'العمارة'],
    coverImage: '',
    images: [],
    descEn: '',
    descAr: '',
    isFeatured: false,
  };

  const [form, setForm] = useState<Omit<ProjectData, 'id'>>(defaultForm);

  const fetchProjectsFromDB = async () => {
    setFetching(true);
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);

      const catRes = await axios.get('/api/settings');
      if (catRes.data?.project_categories && Array.isArray(catRes.data.project_categories) && catRes.data.project_categories.length > 0) {
        setCategoriesList(catRes.data.project_categories.map((c: any) => ({ label: `${c.nameEn} (${c.nameAr})`, value: c.nameEn })));
      }
    } catch (err) {
      console.error('Failed to fetch projects from DB', err);
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
    if (confirm('Are you sure you want to delete this project permanently from database?')) {
      try {
        const token = localStorage.getItem('origin_token');
        await axios.delete(`/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlertMsg('Project permanently deleted from database!');
        fetchProjectsFromDB();
      } catch (err: any) {
        setAlertMsg('Failed to delete project: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.url) {
        const uploadedUrl = res.data.url;
        setForm((prev) => ({
          ...prev,
          coverImage: uploadedUrl,
          images: prev.images.length === 0 ? [uploadedUrl] : [...prev.images, uploadedUrl],
        }));
        setAlertMsg('Cover Image uploaded to VPS successfully!');
        setTimeout(() => setAlertMsg(''), 3000);
      }
    } catch (err: any) {
      alert('Upload failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploadingCover(false);
      e.target.value = '';
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingGallery(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.url) {
        const uploadedUrl = res.data.url;
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, uploadedUrl],
        }));
        setAlertMsg('Gallery Image added to project!');
        setTimeout(() => setAlertMsg(''), 3000);
      }
    } catch (err: any) {
      alert('Upload failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploadingGallery(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const slugGenerated = form.slug || form.titleEn.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const token = localStorage.getItem('origin_token');

    const finalCover = form.coverImage || (form.images.length > 0 ? form.images[0] : 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80');

    try {
      if (editingId) {
        await axios.put(`/api/projects/${editingId}`, { ...form, slug: slugGenerated, coverImage: finalCover }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlertMsg('Project updated in database successfully!');
      } else {
        await axios.post('/api/projects', { ...form, slug: slugGenerated, coverImage: finalCover }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlertMsg('New Project created and saved to database!');
      }
      setIsModalOpen(false);
      fetchProjectsFromDB();
    } catch (err: any) {
      setAlertMsg('Error saving project: ' + (err.response?.data?.error || err.message));
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
            <h1 className="text-3xl font-extrabold text-white">Project Portfolio Manager (إدارة المشاريع)</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Create, edit, and publish projects connected directly with database</p>
          </div>
          <Button variant="gold" size="sm" onClick={handleOpenCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </Button>
        </div>

        {alertMsg && <Alert type="success" message={alertMsg} />}

        {fetching ? (
          <div className="text-center py-12 text-neutral-400 font-semibold">Loading projects from database...</div>
        ) : (
          <Table
            columns={[
              {
                header: 'Project Title',
                accessor: (row) => (
                  <div className="flex items-center gap-3">
                    {row.coverImage && (
                      <img src={row.coverImage} alt={row.titleEn} className="w-12 h-12 rounded object-cover border border-brand-gold/30" />
                    )}
                    <div>
                      <h4 className="text-white font-bold text-sm">{row.titleEn}</h4>
                      <span className="text-xs text-brand-gold block font-mono">{row.titleAr}</span>
                    </div>
                  </div>
                ),
              },
              { header: 'Category', accessor: 'category' },
              { header: 'Location', accessor: 'locationEn' },
              { header: 'Area', accessor: (row) => `${row.areaSqm} SQM` },
              { header: 'Year', accessor: 'year' },
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

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Project' : 'Add New Project'}>
          <form onSubmit={handleSubmit} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Project Title (English)"
                value={form.titleEn}
                onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                required
              />
              <Input
                label="Project Title (Arabic)"
                value={form.titleAr}
                onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Category"
                options={categoriesList}
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

            {/* Cover Image URL & Direct Upload Button */}
            <div className="space-y-4 border-t border-b border-neutral-800 py-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">Main Cover Image (صورة الغلاف)</label>
                <div className="flex items-center gap-3">
                  <Input
                    className="flex-1"
                    placeholder="https://... or /uploads/..."
                    value={form.coverImage}
                    onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  />
                  <label className="cursor-pointer bg-brand-gold text-black hover:bg-brand-gold/80 px-4 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors">
                    {uploadingCover ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span>{uploadingCover ? 'Uploading...' : 'Upload Cover'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} disabled={uploadingCover} />
                  </label>
                </div>
                {form.coverImage && (
                  <img src={form.coverImage} alt="Cover Preview" className="w-32 h-20 object-cover rounded border border-brand-gold/40 mt-3" />
                )}
              </div>

              {/* Gallery Images Upload & URLs */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">Gallery Images (معرض صور المشروع)</label>
                  <label className="cursor-pointer bg-neutral-800 text-brand-gold border border-brand-gold/40 hover:bg-neutral-700 px-3 py-1.5 rounded-sm font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors">
                    {uploadingGallery ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    <span>{uploadingGallery ? 'Uploading...' : 'Add Photo'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleGalleryUpload} disabled={uploadingGallery} />
                  </label>
                </div>

                <textarea
                  rows={2}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold"
                  placeholder="/uploads/img1.jpg, /uploads/img2.jpg"
                  value={form.images.join(', ')}
                  onChange={(e) => setForm({ ...form, images: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                />

                {form.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {form.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt={`Gallery ${idx}`} className="w-16 h-12 object-cover rounded border border-neutral-700" />
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, images: form.images.filter((_, i) => i !== idx) })}
                          className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Detailed Description (English)</label>
                <textarea
                  rows={3}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold"
                  value={form.descEn}
                  onChange={(e) => setForm({ ...form, descEn: e.target.value })}
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

            <Button type="submit" variant="gold" size="lg" className="w-full mt-6" isLoading={loading}>
              {editingId ? 'Save Changes to DB' : 'Create Project in DB'}
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
