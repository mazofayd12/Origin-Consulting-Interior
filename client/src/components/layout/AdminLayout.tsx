'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthContext';
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Image as ImageIcon,
  Users,
  Mail,
  Settings,
  Shield,
  Activity,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

interface SubItem {
  label: string;
  href: string;
}

interface NavGroup {
  title: string;
  icon: React.ReactNode;
  items?: SubItem[];
  href?: string;
}

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const { logout, user } = useAuth();

  React.useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('origin_token') : null;
    if (!token && !pathname.includes('/admin/login')) {
      router.replace(`/${lang}/admin/login`);
    }
  }, [pathname, lang, router]);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Content: true,
    Projects: true,
    Media: false,
    Users: false,
    Contact: true,
    'Website Settings': false,
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const navStructure: NavGroup[] = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4 text-brand-gold" />,
      href: `/${lang}/admin/dashboard`,
    },
    {
      title: 'Content',
      icon: <FileText className="w-4 h-4 text-brand-gold" />,
      items: [
        { label: 'Home', href: `/${lang}/admin/content/home` },
        { label: 'About', href: `/${lang}/admin/content/about` },
        { label: 'Services', href: `/${lang}/admin/services` },
        { label: 'Portfolio', href: `/${lang}/admin/projects` },
        { label: 'Blog', href: `/${lang}/admin/blog` },
        { label: 'Testimonials', href: `/${lang}/admin/content/testimonials` },
        { label: 'Team', href: `/${lang}/admin/content/team` },
        { label: 'Clients', href: `/${lang}/admin/content/clients` },
        { label: 'FAQ', href: `/${lang}/admin/content/faq` },
      ],
    },
    {
      title: 'Projects',
      icon: <FolderKanban className="w-4 h-4 text-brand-gold" />,
      items: [
        { label: 'All Projects', href: `/${lang}/admin/projects` },
        { label: 'Add Project', href: `/${lang}/admin/projects?action=new` },
        { label: 'Categories', href: `/${lang}/admin/projects/categories` },
      ],
    },
    {
      title: 'Media',
      icon: <ImageIcon className="w-4 h-4 text-brand-gold" />,
      items: [
        { label: 'Images', href: `/${lang}/admin/media/images` },
        { label: 'Videos', href: `/${lang}/admin/media/videos` },
        { label: 'Files', href: `/${lang}/admin/media/files` },
      ],
    },
    {
      title: 'Users',
      icon: <Users className="w-4 h-4 text-brand-gold" />,
      items: [
        { label: 'All Users', href: `/${lang}/admin/users` },
        { label: 'Roles', href: `/${lang}/admin/users/roles` },
        { label: 'Permissions', href: `/${lang}/admin/users/permissions` },
      ],
    },
    {
      title: 'Contact',
      icon: <Mail className="w-4 h-4 text-brand-gold" />,
      items: [
        { label: 'Messages', href: `/${lang}/admin/inquiries` },
        { label: 'Newsletter', href: `/${lang}/admin/contact/newsletter` },
      ],
    },
    {
      title: 'Website Settings',
      icon: <Settings className="w-4 h-4 text-brand-gold" />,
      items: [
        { label: 'General', href: `/${lang}/admin/settings` },
        { label: 'Contact Info', href: `/${lang}/admin/settings#contact` },
        { label: 'Social Media', href: `/${lang}/admin/settings#social` },
        { label: 'SEO', href: `/${lang}/admin/settings#seo` },
        { label: 'Homepage', href: `/${lang}/admin/settings#homepage` },
        { label: 'Footer', href: `/${lang}/admin/settings#footer` },
      ],
    },
    {
      title: 'Security',
      icon: <Shield className="w-4 h-4 text-brand-gold" />,
      href: `/${lang}/admin/security`,
    },
    {
      title: 'Activity Logs',
      icon: <Activity className="w-4 h-4 text-brand-gold" />,
      href: `/${lang}/admin/audit-logs`,
    },
  ];

  const handleLogout = () => {
    logout();
    router.push(`/${lang}/admin/login`);
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-neutral-900 border-b border-neutral-800">
        <Link href={`/${lang}`}>
          <img src="/images/logo.png" alt="Origin Design" className="h-8 w-auto" />
        </Link>
        <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} className="text-white p-2">
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-neutral-900 border-r border-neutral-800 flex-shrink-0 flex flex-col justify-between py-6 px-4 z-30`}
      >
        <div className="space-y-6">
          {/* Top Logo */}
          <div className="px-2 pb-4 border-b border-neutral-800 flex justify-center">
            <Link href={`/${lang}`}>
              <img
                src="/images/logo.png"
                alt="Origin Design"
                className="h-10 w-auto object-contain hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Navigation Structure */}
          <nav className="space-y-1 text-sm">
            {navStructure.map((group) => {
              if (group.href) {
                const isActive = pathname === group.href;
                return (
                  <Link
                    key={group.title}
                    href={group.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-semibold transition-colors ${
                      isActive
                        ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/40'
                        : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                    }`}
                  >
                    {group.icon}
                    <span>{group.title}</span>
                  </Link>
                );
              }

              const isOpen = openGroups[group.title];

              return (
                <div key={group.title} className="space-y-1">
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-md font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {group.icon}
                      <span>{group.title}</span>
                    </div>
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-neutral-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-neutral-500" />
                    )}
                  </button>

                  {isOpen && group.items && (
                    <div className="pl-9 space-y-1 border-l border-neutral-800 ml-5 py-1">
                      {group.items.map((sub) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setMobileSidebarOpen(false)}
                            className={`block py-1.5 px-3 text-xs rounded-sm transition-colors ${
                              isSubActive
                                ? 'text-brand-gold font-bold bg-brand-gold/10'
                                : 'text-neutral-400 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            • {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Info & Logout */}
        <div className="pt-6 border-t border-neutral-800 space-y-3">
          <div className="px-3 text-xs text-neutral-400">
            <span className="block font-bold text-white">{user?.fullName || 'Alexander Wright'}</span>
            <span className="block text-[10px] text-brand-gold uppercase">{user?.role || 'SUPER ADMIN'}</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs uppercase font-bold tracking-wider text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">{children}</main>
    </div>
  );
};
