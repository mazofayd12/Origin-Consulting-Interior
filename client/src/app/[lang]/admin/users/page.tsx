'use client';

import React, { useState, useEffect } from 'react';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Alert } from '@/components/ui/Alert';
import { UserPlus, Trash, Shield, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

interface UserData {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status?: string;
  avatarUrl?: string;
  createdAt: string;
}

export default function ManageUsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'ADMIN',
  });

  const fetchUsers = async () => {
    setFetching(true);
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    } catch (err: any) {
      console.error('Failed to fetch users', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenCreate = () => {
    setForm({ fullName: '', email: '', password: '', role: 'ADMIN' });
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await axios.post('/api/users', form);
      setAlertMsg(`User ${form.email} created successfully and saved to Database!`);
      setIsModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Failed to create user.');
    } finally {
      setLoading(false);
      setTimeout(() => setAlertMsg(''), 4000);
    }
  };

  const handleDeleteUser = async (id: string, email: string) => {
    if (confirm(`Are you sure you want to delete user ${email} from database?`)) {
      try {
        await axios.delete(`/api/users/${id}`);
        setAlertMsg(`User ${email} deleted from database.`);
        fetchUsers();
      } catch (err: any) {
        setAlertMsg('Failed to delete user: ' + (err.response?.data?.error || err.message));
      } finally {
        setTimeout(() => setAlertMsg(''), 4000);
      }
    }
  };

  return (
    <div>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">
              Users & Team Administrators (جميع المستخدمين)
            </h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">
              Manage platform administrators, editors, roles, and access credentials
            </p>
          </div>
          <Button variant="gold" size="sm" onClick={handleOpenCreate} className="gap-2">
            <UserPlus className="w-4 h-4" />
            <span>Add New User (إضافة مستخدم جديد)</span>
          </Button>
        </div>

        {alertMsg && <Alert type="success" message={alertMsg} />}

        {fetching ? (
          <div className="text-center py-12 text-neutral-400 font-semibold">
            Loading administrators from Database...
          </div>
        ) : (
          <Table
            columns={[
              {
                header: 'Administrator Name',
                accessor: (row) => (
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        row.avatarUrl ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
                      }
                      alt={row.fullName}
                      className="w-9 h-9 rounded-full object-cover border border-brand-gold/40"
                    />
                    <div>
                      <span className="font-bold text-white block">{row.fullName}</span>
                      <span className="text-xs text-neutral-400 block font-mono">{row.email}</span>
                    </div>
                  </div>
                ),
              },
              {
                header: 'Role',
                accessor: (row) => (
                  <Badge variant={row.role === 'ADMIN' ? 'gold' : 'neutral'}>{row.role}</Badge>
                ),
              },
              {
                header: 'Status',
                accessor: () => <Badge variant="success">ACTIVE</Badge>,
              },
              {
                header: 'Created Date',
                accessor: (row) =>
                  row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '2026-07-24',
              },
              {
                header: 'Actions',
                accessor: (row) => (
                  <button
                    onClick={() => handleDeleteUser(row.id, row.email)}
                    className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                    title="Delete User"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                ),
              },
            ]}
            data={users}
          />
        )}

        {/* Modal for Creating User */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Administrator User">
          <form onSubmit={handleAddUser} className="space-y-4">
            {errorMsg && <Alert type="danger" message={errorMsg} />}

            <Input
              label="Full Name (الاسم بالكامل)"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="e.g. Eng. Moaz"
              required
            />

            <Input
              label="Email Address (البريد الإلكتروني للدخول)"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="user@origin-consulting.com"
              required
            />

            {/* Password input with toggle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span>Password (كلمة المرور للدخول)</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold pr-10"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[10px] text-neutral-500">
                Will be encrypted with Bcrypt (10 rounds) and stored in Database.
              </span>
            </div>

            <Select
              label="System Role (الصلاحية)"
              options={[
                { label: 'ADMIN (Full Access - أدمن كامل الصلاحيات)', value: 'ADMIN' },
                { label: 'EDITOR (Content Only - محرر محتوى)', value: 'EDITOR' },
              ]}
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />

            <Button type="submit" variant="gold" size="lg" className="w-full mt-6" isLoading={loading}>
              Create User & Save Credentials
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
