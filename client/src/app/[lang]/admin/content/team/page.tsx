'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Plus, Trash, Upload, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function ManageTeamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [team, setTeam] = useState<any[]>([]);

  const fetchTeam = () => {
    axios.get('/api/team')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTeam(res.data.map((item: any) => ({
            id: item.id,
            name: item.nameEn || item.nameAr,
            role: item.roleEn || item.roleAr,
            image: item.imageUrl || '/images/sample1.jpg',
          })));
        }
      })
      .catch((err) => console.error('Failed to fetch team', err));
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const [form, setForm] = useState({ name: '', role: '', image: '' });

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
        setForm((prev) => ({ ...prev, image: res.data.url }));
      }
    } catch (err: any) {
      alert('Upload failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/team', {
        nameEn: form.name,
        nameAr: form.name,
        roleEn: form.role,
        roleAr: form.role,
        imageUrl: form.image,
      });
      setIsModalOpen(false);
      setForm({ name: '', role: '', image: '' });
      fetchTeam();
    } catch (err: any) {
      alert('Failed to save team member: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;
    try {
      await axios.delete(`/api/team?id=${id}`);
      fetchTeam();
    } catch (err: any) {
      alert('Failed to delete team member: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Executive Team Members (أعضاء الفريق)</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Manage leadership profiles, roles, and avatar photos</p>
          </div>
          <Button variant="gold" size="sm" onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Member</span>
          </Button>
        </div>

        <Table
          columns={[
            {
              header: 'Team Member',
              accessor: (row) => (
                <div className="flex items-center gap-3">
                  <img src={row.image} alt={row.name} className="w-10 h-10 rounded-full object-cover border border-brand-gold" />
                  <span className="font-bold text-white">{row.name}</span>
                </div>
              ),
            },
            { header: 'Role Title', accessor: 'role' },
            {
              header: 'Actions',
              accessor: (row) => (
                <button onClick={() => handleDelete(row.id)} className="p-1.5 text-neutral-400 hover:text-red-500">
                  <Trash className="w-4 h-4" />
                </button>
              ),
            },
          ]}
          data={team}
        />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Team Member">
          <form onSubmit={handleAdd} className="space-y-4">
            <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input label="Role Title" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
            
            {/* Direct VPS Upload Button */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">Avatar Photo</label>
              <div className="flex items-center gap-3">
                <Input
                  className="flex-1"
                  placeholder="https://... or /uploads/..."
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  required
                />
                <label className="cursor-pointer bg-brand-gold text-black hover:bg-brand-gold/80 px-4 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                </label>
              </div>
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full mt-4">Save Member</Button>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
