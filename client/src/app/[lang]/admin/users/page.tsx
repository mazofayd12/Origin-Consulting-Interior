'use client';

import React, { useState, useEffect } from 'react';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Alert } from '@/components/ui/Alert';
import { UserPlus, Trash, Edit, Shield, Lock, Eye, EyeOff } from 'lucide-react';
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
  const [editingId, setEditingId] = useState<string | null>(null);
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
    setEditingId(null);
    setForm({ fullName: '', email: '', password: '', role: 'ADMIN' });
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: UserData) => {
    setEditingId(user.id);
    setForm({
      fullName: user.fullName,
      email: user.email,
      password: '',
      role: user.role || 'ADMIN',
    });
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (editingId) {
        await axios.put(`/api/users/${editingId}`, form);
        setAlertMsg(`User ${form.email} updated successfully in Database!`);
      } else {
        await axios.post('/api/users', form);
        setAlertMsg(`User ${form.email} created successfully and saved to Database!`);
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Failed to save user.');
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
              Users & Team Administrators (جميع المستخدمين والصلاحيات)
            </h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">
              Manage platform administrators, editors, roles, passwords, and access credentials
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
                header: 'Assigned Roles & Permissions',
                accessor: (row) => (
                  <div className="flex flex-wrap gap-1">
                    {row.role ? (
                      row.role.split(',').map((r, i) => (
                        <Badge key={i} variant={r === 'ADMIN' ? 'gold' : 'neutral'}>
                          {r.trim()}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="gold">ADMIN</Badge>
                    )}
                  </div>
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
                header: 'Actions (تعديل وحذف)',
                accessor: (row) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(row)}
                      className="p-2 text-neutral-400 hover:text-amber-400 transition-colors"
                      title="Edit User & Permissions"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(row.id, row.email)}
                      className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                      title="Delete User"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ),
              },
            ]}
            data={users}
          />
        )}

        {/* Modal for Creating / Editing User */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingId ? 'Edit User & Change Credentials (تعديل بيانات وصلاحيات المستخدم)' : 'Add Administrator User (إضافة مستخدم جديد)'}
        >
          <form onSubmit={handleSaveUser} className="space-y-4">
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
                <span>
                  {editingId
                    ? 'New Password (كلمة المرور الجديدة - اتركها فارغة للحفاظ على الحالية)'
                    : 'Password (كلمة المرور للدخول)'}
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold pr-10"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder={editingId ? 'Leave blank to keep unchanged' : '••••••••••••'}
                  required={!editingId}
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
                {editingId
                  ? 'Enter a new password only if you want to reset this user password.'
                  : 'Will be encrypted with Bcrypt (10 rounds) and stored in Database.'}
              </span>
            </div>

            {/* Multi-Select Roles & Permissions Checkboxes */}
            <div className="space-y-2 border-t border-b border-neutral-800 py-3 my-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-gold block">
                Assign System Permissions (تحديد كافة الصلاحيات المتاحة - يمكنك اختيار أكثر من صلاحية):
              </label>
              <div className="space-y-2 bg-neutral-900/80 p-3 rounded border border-neutral-800">
                {[
                  { key: 'ADMIN', title: 'ADMIN (Full Access - أدمن شامل جميع الصلاحيات)', desc: 'Full control over users, security, settings, and database.' },
                  { key: 'CONTENT_MANAGER', title: 'CONTENT_MANAGER (Website CMS - مدير صفحات ومحتوى الموقع)', desc: 'Edit Home Builder, About Page, Services, Team, Testimonials, Clients, and FAQ.' },
                  { key: 'BLOG_WRITER', title: 'BLOG_WRITER (Blog & News - كاتب ومحرر المقالات والمدونة)', desc: 'Publish, edit, and manage Blog posts and news articles.' },
                  { key: 'PROJECTS_MANAGER', title: 'PROJECTS_MANAGER (Projects & Portfolio - مدير المشاريع والمعارض)', desc: 'Add, update, and manage architectural projects and categories.' },
                  { key: 'INQUIRIES_MANAGER', title: 'INQUIRIES_MANAGER (Customer Leads - مدير الرسائل والاستفسارات)', desc: 'Access and manage contact inquiries and newsletter subscribers.' },
                ].map((item) => {
                  const currentRoles = form.role ? form.role.split(',') : ['ADMIN'];
                  const isChecked = currentRoles.includes(item.key);
                  return (
                    <label key={item.key} className="flex items-start gap-3 p-2 rounded hover:bg-neutral-800/50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          let updated: string[];
                          if (item.key === 'ADMIN') {
                            updated = e.target.checked ? ['ADMIN'] : ['CONTENT_MANAGER'];
                          } else {
                            const filterAdmin = currentRoles.filter((r) => r !== 'ADMIN');
                            if (e.target.checked) {
                              updated = [...filterAdmin, item.key];
                            } else {
                              updated = filterAdmin.filter((r) => r !== item.key);
                            }
                          }
                          if (updated.length === 0) updated = ['CONTENT_MANAGER'];
                          setForm({ ...form, role: updated.join(',') });
                        }}
                        className="mt-1 accent-amber-500 w-4 h-4 rounded border-neutral-700"
                      />
                      <div>
                        <span className="text-sm font-bold text-white block">{item.title}</span>
                        <span className="text-xs text-neutral-400 block">{item.desc}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full mt-4" isLoading={loading}>
              {editingId ? 'Save Changes to User' : 'Create User & Save Credentials'}
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
