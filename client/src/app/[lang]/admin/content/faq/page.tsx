'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Plus, Trash } from 'lucide-react';

export default function ManageFaqPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faqs, setFaqs] = useState([
    { id: '1', question: 'What is your interior design timeline?', answer: 'Typical luxury villa concepts take 4-8 weeks.' },
    { id: '2', question: 'Do you handle municipal approvals?', answer: 'Yes, full architectural submittal is included.' },
  ]);

  const [form, setForm] = useState({ question: '', answer: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setFaqs([...faqs, { ...form, id: String(Date.now()) }]);
    setIsModalOpen(false);
    setForm({ question: '', answer: '' });
  };

  const handleDelete = (id: string) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">FAQ Items Manager (الأسئلة الشائعة)</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Create and modify frequently asked questions across service pages</p>
          </div>
          <Button variant="gold" size="sm" onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Add FAQ</span>
          </Button>
        </div>

        <Table
          columns={[
            { header: 'Question', accessor: 'question' },
            { header: 'Answer', accessor: 'answer' },
            {
              header: 'Actions',
              accessor: (row) => (
                <button onClick={() => handleDelete(row.id)} className="p-1.5 text-neutral-400 hover:text-red-500">
                  <Trash className="w-4 h-4" />
                </button>
              ),
            },
          ]}
          data={faqs}
        />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add FAQ Item">
          <form onSubmit={handleAdd} className="space-y-4">
            <Input label="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Answer</label>
              <textarea
                rows={3}
                className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold"
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                required
              />
            </div>
            <Button type="submit" variant="gold" size="lg" className="w-full mt-4">Save FAQ Item</Button>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
