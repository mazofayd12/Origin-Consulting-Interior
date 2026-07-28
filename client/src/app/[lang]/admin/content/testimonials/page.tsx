'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Star, Plus, Trash } from 'lucide-react';
import axios from 'axios';

export default function ManageTestimonialsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchReviews = () => {
    axios.get('/api/testimonials')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setReviews(res.data.map((item: any) => ({
            id: item.id,
            clientName: item.clientName,
            company: item.companyEn || item.companyAr || '',
            comment: item.contentEn || item.contentAr || '',
            rating: item.rating || 5,
          })));
        }
      })
      .catch((err) => console.error('Failed to fetch testimonials', err));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const [form, setForm] = useState({ clientName: '', company: '', comment: '', rating: 5 });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/testimonials', form);
      setIsModalOpen(false);
      setForm({ clientName: '', company: '', comment: '', rating: 5 });
      fetchReviews();
    } catch (err: any) {
      alert('Failed to save testimonial: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this testimonial?')) return;
    try {
      await axios.delete(`/api/testimonials?id=${id}`);
      fetchReviews();
    } catch (err: any) {
      alert('Failed to delete testimonial: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Testimonials & Client Reviews (آراء العملاء)</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Manage client endorsements, ratings, and quotes</p>
          </div>
          <Button variant="gold" size="sm" onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </Button>
        </div>

        <Table
          columns={[
            { header: 'Client Name', accessor: 'clientName' },
            { header: 'Company / Position', accessor: 'company' },
            { header: 'Comment', accessor: 'comment' },
            {
              header: 'Rating',
              accessor: (row) => (
                <div className="flex gap-1 text-brand-gold">
                  {[...Array(row.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-brand-gold" />
                  ))}
                </div>
              ),
            },
            {
              header: 'Actions',
              accessor: (row) => (
                <button onClick={() => handleDelete(row.id)} className="p-1.5 text-neutral-400 hover:text-red-500">
                  <Trash className="w-4 h-4" />
                </button>
              ),
            },
          ]}
          data={reviews}
        />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Client Testimonial">
          <form onSubmit={handleAdd} className="space-y-4">
            <Input label="Client Name" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} required />
            <Input label="Company / Position" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Testimonial Quote</label>
              <textarea
                rows={3}
                className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                required
              />
            </div>
            <Button type="submit" variant="gold" size="lg" className="w-full mt-4">Save Testimonial</Button>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
