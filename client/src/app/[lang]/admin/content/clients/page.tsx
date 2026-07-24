'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Plus, Trash } from 'lucide-react';

export default function ManageClientsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([
    { id: '1', name: 'Al Qasimi Real Estate', category: 'Real Estate Holdings' },
    { id: '2', name: 'Rostova Hospitality', category: 'Luxury Hotels' },
  ]);

  const [form, setForm] = useState({ name: '', category: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setClients([...clients, { ...form, id: String(Date.now()) }]);
    setIsModalOpen(false);
    setForm({ name: '', category: '' });
  };

  const handleDelete = (id: string) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Client & Partner Logos (الشركاء والعملاء)</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Manage corporate logos displayed across homepage and portfolio</p>
          </div>
          <Button variant="gold" size="sm" onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Client Partner</span>
          </Button>
        </div>

        <Table
          columns={[
            { header: 'Client Partner Name', accessor: 'name' },
            { header: 'Industry Category', accessor: 'category' },
            {
              header: 'Actions',
              accessor: (row) => (
                <button onClick={() => handleDelete(row.id)} className="p-1.5 text-neutral-400 hover:text-red-500">
                  <Trash className="w-4 h-4" />
                </button>
              ),
            },
          ]}
          data={clients}
        />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Client Partner">
          <form onSubmit={handleAdd} className="space-y-4">
            <Input label="Client Partner Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input label="Industry Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            <Button type="submit" variant="gold" size="lg" className="w-full mt-4">Save Partner</Button>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
