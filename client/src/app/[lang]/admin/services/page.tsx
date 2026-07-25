'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Table } from '@/components/ui/Table';
import { Alert } from '@/components/ui/Alert';
import { Plus, Edit, Trash, Upload, Loader2 } from 'lucide-react';
import axios from 'axios';

interface ServiceData {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descEn: string;
  descAr: string;
  heroImage: string;
  benefitsEn: string[];
  benefitsAr: string[];
  processEn: { step: string; title: string; desc: string }[];
  processAr: { step: string; title: string; desc: string }[];
  faqEn: { q: string; a: string }[];
  faqAr: { q: string; a: string }[];
  gallery: string[];
}

export default function ManageServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [alertMsg, setAlertMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [services, setServices] = useState<ServiceData[]>([]);

  const defaultForm: Omit<ServiceData, 'id'> = {
    slug: '',
    titleEn: '',
    titleAr: '',
    subtitleEn: '',
    subtitleAr: '',
    descEn: '',
    descAr: '',
    heroImage: '',
    benefitsEn: ['Custom Luxury Finishes', 'Architectural Precision', 'Smart BIM Automation'],
    benefitsAr: ['تشطيبات فاخرة مخصصة', 'دقة معمارية فائقة', 'أتمتة المخططات الذكية'],
    processEn: [
      { step: '01', title: 'Consultation & Discovery', desc: 'Understanding functional scope & spatial parameters.' },
      { step: '02', title: 'Schematic Engineering', desc: 'Developing load calculations & material moodboards.' }
    ],
    processAr: [
      { step: '01', title: 'الاستشارة والاكتشاف', desc: 'فهم النطاق الوظيفي ومتطلبات المساحة.' },
      { step: '02', title: 'الهندسة التخطيطية', desc: 'تطوير الحسابات الإنشائية ومخططات المواد.' }
    ],
    faqEn: [
      { q: 'What is the lead time for projects?', a: 'Initial concept blueprints take 2-4 weeks.' }
    ],
    faqAr: [
      { q: 'ما هي مدة تسليم المخططات؟', a: 'تستغرق المفاهيم الأولية بين 2 إلى 4 أسابيع.' }
    ],
    gallery: [],
  };

  const [form, setForm] = useState<Omit<ServiceData, 'id'>>(defaultForm);

  const fetchServicesFromDB = async () => {
    setFetching(true);
    try {
      const res = await axios.get('/api/services');
      setServices(res.data);
    } catch (err) {
      console.error('Failed to fetch services from DB', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchServicesFromDB();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(defaultForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: ServiceData) => {
    setEditingId(s.id);
    setForm({
      ...s,
      benefitsEn: Array.isArray(s.benefitsEn) ? s.benefitsEn : [],
      benefitsAr: Array.isArray(s.benefitsAr) ? s.benefitsAr : [],
      gallery: Array.isArray(s.gallery) ? s.gallery : [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service permanently from database?')) {
      try {
        const token = localStorage.getItem('origin_token');
        await axios.delete(`/api/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlertMsg('Service deleted from database!');
        fetchServicesFromDB();
      } catch (err: any) {
        setAlertMsg('Failed to delete service: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHero(true);
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
          heroImage: uploadedUrl,
          gallery: prev.gallery.length === 0 ? [uploadedUrl] : [...prev.gallery, uploadedUrl],
        }));
        setAlertMsg('Hero Image uploaded to VPS successfully!');
        setTimeout(() => setAlertMsg(''), 3000);
      }
    } catch (err: any) {
      alert('Upload failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploadingHero(false);
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
          gallery: [...prev.gallery, uploadedUrl],
        }));
        setAlertMsg('Gallery Photo added to service!');
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
    const slugGen = form.slug || form.titleEn.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const token = localStorage.getItem('origin_token');

    const finalHero = form.heroImage || (form.gallery.length > 0 ? form.gallery[0] : 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80');

    try {
      if (editingId) {
        await axios.put(`/api/services/${editingId}`, { ...form, slug: slugGen, heroImage: finalHero }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlertMsg('Service updated in database successfully!');
      } else {
        await axios.post('/api/services', { ...form, slug: slugGen, heroImage: finalHero }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlertMsg('New Service created and saved to database!');
      }
      setIsModalOpen(false);
      fetchServicesFromDB();
    } catch (err: any) {
      setAlertMsg('Error saving service: ' + (err.response?.data?.error || err.message));
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
            <h1 className="text-3xl font-extrabold text-white">Services Manager (إدارة وإضافة تفاصيل الخدمات)</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Create full service profiles, benefits, images, and specs synced directly with database</p>
          </div>
          <Button variant="gold" size="sm" onClick={handleOpenCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </Button>
        </div>

        {alertMsg && <Alert type="success" message={alertMsg} />}

        {fetching ? (
          <div className="text-center py-12 text-neutral-400 font-semibold">Loading services from database...</div>
        ) : (
          <Table
            columns={[
              {
                header: 'Service Title',
                accessor: (row) => (
                  <div className="flex items-center gap-3">
                    {row.heroImage && (
                      <img src={row.heroImage} alt={row.titleEn} className="w-12 h-12 rounded object-cover border border-brand-gold/30" />
                    )}
                    <div>
                      <h4 className="text-white font-bold text-sm">{row.titleEn}</h4>
                      <span className="text-xs text-brand-gold block font-mono">{row.titleAr}</span>
                    </div>
                  </div>
                ),
              },
              { header: 'Subtitle (EN)', accessor: 'subtitleEn' },
              { header: 'Subtitle (AR)', accessor: 'subtitleAr' },
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
            data={services}
          />
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Service Details' : 'Add New Service (إضافة خدمة جديدة متكاملة)'}>
          <form onSubmit={handleSubmit} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Service Title (English - عنوان الخدمة)"
                value={form.titleEn}
                onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                required
              />
              <Input
                label="Service Title (Arabic - عنوان الخدمة بالعربي)"
                value={form.titleAr}
                onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Subtitle (English - العنوان الفرعي)"
                value={form.subtitleEn}
                onChange={(e) => setForm({ ...form, subtitleEn: e.target.value })}
                required
              />
              <Input
                label="Subtitle (Arabic - العنوان الفرعي بالعربي)"
                value={form.subtitleAr}
                onChange={(e) => setForm({ ...form, subtitleAr: e.target.value })}
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Full Service Description (English - الوصف التفصيلي)</label>
                <textarea
                  rows={3}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold"
                  value={form.descEn}
                  onChange={(e) => setForm({ ...form, descEn: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Full Service Description (Arabic - الوصف التفصيلي بالعربي)</label>
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

            {/* Hero Image & VPS Upload Button */}
            <div className="space-y-4 border-t border-b border-neutral-800 py-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">Main Hero Image (صورة غلاف الخدمة الرئيسية)</label>
                <div className="flex items-center gap-3">
                  <Input
                    className="flex-1"
                    placeholder="https://... or /uploads/..."
                    value={form.heroImage}
                    onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
                  />
                  <label className="cursor-pointer bg-brand-gold text-black hover:bg-brand-gold/80 px-4 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors">
                    {uploadingHero ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span>{uploadingHero ? 'Uploading...' : 'Upload Image'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} disabled={uploadingHero} />
                  </label>
                </div>
                {form.heroImage && (
                  <img src={form.heroImage} alt="Preview" className="w-32 h-20 object-cover rounded border border-brand-gold/40 mt-3" />
                )}
              </div>

              {/* Gallery Images Upload */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">Service Showcase Gallery (معرض صور الخدمة)</label>
                  <label className="cursor-pointer bg-neutral-800 text-brand-gold border border-brand-gold/40 hover:bg-neutral-700 px-3 py-1.5 rounded-sm font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors">
                    {uploadingGallery ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    <span>{uploadingGallery ? 'Uploading...' : 'Add Photo'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleGalleryUpload} disabled={uploadingGallery} />
                  </label>
                </div>

                {form.gallery.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.gallery.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt={`Gallery ${idx}`} className="w-16 h-12 object-cover rounded border border-neutral-700" />
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, gallery: form.gallery.filter((_, i) => i !== idx) })}
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

            {/* Benefits Inputs */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Client Benefits (English - مميزات الخدمة بالسطر)</label>
                <textarea
                  rows={3}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold"
                  placeholder="Custom Luxury Finishes&#10;Architectural Precision&#10;Smart Lighting Integration"
                  value={form.benefitsEn.join('\n')}
                  onChange={(e) => setForm({ ...form, benefitsEn: e.target.value.split('\n').filter(Boolean) })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Client Benefits (Arabic - مميزات الخدمة بالعربي)</label>
                <textarea
                  rows={3}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold text-right"
                  dir="rtl"
                  placeholder="تشطيبات فاخرة مخصصة&#10;دقة معمارية فائقة&#10;أتمتة المخططات الذكية"
                  value={form.benefitsAr.join('\n')}
                  onChange={(e) => setForm({ ...form, benefitsAr: e.target.value.split('\n').filter(Boolean) })}
                />
              </div>
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full mt-6" isLoading={loading}>
              {editingId ? 'Save Service Changes to DB' : 'Create Service in DB'}
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
