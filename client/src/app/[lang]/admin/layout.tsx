'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useParams } from 'next/navigation';
import {
  LayoutDashboard,
  Globe,
  Home,
  Info,
  Briefcase,
  FolderKanban,
  FileText,
  MessageSquare,
  Users,
  UserCheck,
  Shield,
  Folder,
  Mail,
  Send,
  Settings,
  Palette,
  History,
  Database,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Bell,
  Search,
  User as UserIcon,
  Sparkles,
  HelpCircle,
  Award
} from 'lucide-react';
import { useAuth } from '@/features/auth/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const { user, logout } = useAuth();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contentMenuOpen, setContentMenuOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(true);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(true);

  if (pathname?.includes('/admin/login')) {
    return <>{children}</>;
  }

  const navItemClass = (path: string) => {
    const isActive = pathname === path || pathname?.startsWith(path + '/');
    return `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-500/10'
        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
    }`;
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-zinc-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 border-b border-zinc-800/80 bg-[#0B0F17]/90 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/80"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/80"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              ORIGIN CMS
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
              Enterprise v2.5
            </span>
          </div>
        </div>

        {/* Global Search & User Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-xl px-3 py-1.5 text-sm text-zinc-400 focus-within:border-amber-500/50 w-64">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search CMS..."
              className="bg-transparent border-none outline-none text-white text-xs w-full placeholder-zinc-500"
            />
          </div>

          <button className="relative p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/80">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-zinc-800">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center text-amber-400 font-semibold text-sm">
                {user?.fullName ? user.fullName[0].toUpperCase() : 'A'}
              </div>
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-zinc-200">{user?.fullName || 'Administrator'}</div>
              <div className="text-[10px] text-amber-400/90 font-mono uppercase">{user?.role || 'SUPER ADMIN'}</div>
            </div>
            <button
              onClick={() => {
                logout();
                router.push(`/${lang}/admin/login`);
              }}
              title="Logout"
              className="p-2 text-zinc-400 hover:text-rose-400 rounded-lg hover:bg-zinc-800/80 transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Fixed Sidebar */}
        <aside
          className={`bg-[#0B0F17] border-r border-zinc-800/80 w-64 flex-shrink-0 transition-all duration-300 overflow-y-auto flex flex-col justify-between ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'
          } ${mobileMenuOpen ? 'fixed inset-y-0 left-0 z-50 w-64' : 'hidden md:flex'}`}
        >
          <div className="p-3 space-y-4">
            {/* Dashboard Link */}
            <Link href={`/${lang}/admin/dashboard`} className={navItemClass(`/${lang}/admin/dashboard`)}>
              <LayoutDashboard className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Dashboard</span>
            </Link>

            {/* Website Content Group */}
            <div className="space-y-1">
              <button
                onClick={() => setContentMenuOpen(!contentMenuOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-300"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Website CMS</span>
                </div>
                {sidebarOpen && <ChevronDown className={`w-3.5 h-3.5 transition-transform ${contentMenuOpen ? 'rotate-180' : ''}`} />}
              </button>
              {contentMenuOpen && (
                <div className="space-y-1 pl-2">
                  <Link href={`/${lang}/admin/content/home`} className={navItemClass(`/${lang}/admin/content/home`)}>
                    <Home className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Home Builder</span>
                  </Link>
                  <Link href={`/${lang}/admin/content/about`} className={navItemClass(`/${lang}/admin/content/about`)}>
                    <Info className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>About Page</span>
                  </Link>
                  <Link href={`/${lang}/admin/services`} className={navItemClass(`/${lang}/admin/services`)}>
                    <Briefcase className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Services</span>
                  </Link>
                  <Link href={`/${lang}/admin/projects`} className={navItemClass(`/${lang}/admin/projects`)}>
                    <FolderKanban className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Projects</span>
                  </Link>
                  <Link href={`/${lang}/admin/projects/categories`} className={navItemClass(`/${lang}/admin/projects/categories`)}>
                    <Folder className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Categories</span>
                  </Link>
                  <Link href={`/${lang}/admin/blog`} className={navItemClass(`/${lang}/admin/blog`)}>
                    <FileText className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Blog & News</span>
                  </Link>
                  <Link href={`/${lang}/admin/content/testimonials`} className={navItemClass(`/${lang}/admin/content/testimonials`)}>
                    <MessageSquare className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Testimonials</span>
                  </Link>
                  <Link href={`/${lang}/admin/content/clients`} className={navItemClass(`/${lang}/admin/content/clients`)}>
                    <Award className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Clients & Partners</span>
                  </Link>
                  <Link href={`/${lang}/admin/content/team`} className={navItemClass(`/${lang}/admin/content/team`)}>
                    <Users className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Team Members</span>
                  </Link>
                  <Link href={`/${lang}/admin/content/faq`} className={navItemClass(`/${lang}/admin/content/faq`)}>
                    <HelpCircle className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>FAQ</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Media & Forms */}
            <div className="space-y-1">
              <div className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Asset & Forms</span>
              </div>
              <Link href={`/${lang}/admin/media/files`} className={navItemClass(`/${lang}/admin/media/files`)}>
                <Folder className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Media Library</span>
              </Link>
              <Link href={`/${lang}/admin/inquiries`} className={navItemClass(`/${lang}/admin/inquiries`)}>
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Inquiries</span>
              </Link>
              <Link href={`/${lang}/admin/contact/newsletter`} className={navItemClass(`/${lang}/admin/contact/newsletter`)}>
                <Send className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Newsletter</span>
              </Link>
            </div>

            {/* Security & Access */}
            <div className="space-y-1">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-300"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Users & RBAC</span>
                </div>
                {sidebarOpen && <ChevronDown className={`w-3.5 h-3.5 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />}
              </button>
              {userMenuOpen && (
                <div className="space-y-1 pl-2">
                  <Link href={`/${lang}/admin/users`} className={navItemClass(`/${lang}/admin/users`)}>
                    <UserIcon className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>User List</span>
                  </Link>
                  <Link href={`/${lang}/admin/users/roles`} className={navItemClass(`/${lang}/admin/users/roles`)}>
                    <UserCheck className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Roles</span>
                  </Link>
                  <Link href={`/${lang}/admin/users/permissions`} className={navItemClass(`/${lang}/admin/users/permissions`)}>
                    <Shield className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Permissions</span>
                  </Link>
                </div>
              )}
            </div>

            {/* System Settings & Utilities */}
            <div className="space-y-1">
              <button
                onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-300"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-amber-400" />
                  <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Settings</span>
                </div>
                {sidebarOpen && <ChevronDown className={`w-3.5 h-3.5 transition-transform ${settingsMenuOpen ? 'rotate-180' : ''}`} />}
              </button>
              {settingsMenuOpen && (
                <div className="space-y-1 pl-2">
                  <Link href={`/${lang}/admin/settings`} className={navItemClass(`/${lang}/admin/settings`)}>
                    <Settings className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Site Settings</span>
                  </Link>
                  <Link href={`/${lang}/admin/audit-logs`} className={navItemClass(`/${lang}/admin/audit-logs`)}>
                    <History className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Audit Logs</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 border-t border-zinc-800/80">
            <a
              href={`/${lang}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-amber-400 border border-zinc-800 hover:border-amber-500/40 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>View Live Website</span>
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[#07090E]">
          {children}
        </main>
      </div>
    </div>
  );
}
