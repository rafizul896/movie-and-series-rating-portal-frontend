'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const links = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/reviews/pending', label: 'Pending Reviews' },
    { href: '/admin/content/published', label: 'Published Content' },
    { href: '/admin/users/activity', label: 'User Activity' },
    { href: '/admin/analytics/stats', label: 'Analytics' },
    { href: '/admin/media', label: 'Manage Media' },  // New route added for media management
    { href: '/admin/reports', label: 'Reports' },  // New route for reports
    { href: '/admin/content/remove', label: 'Remove Content' },  // New route for content removal
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
      >
        <div className="flex items-center justify-between md:hidden mb-4">
          <h2 className="text-lg font-bold">Admin</h2>
          <button onClick={toggleSidebar}><X className="w-6 h-6" /></button>
        </div>
        <nav className="space-y-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block px-3 py-2 rounded hover:bg-gray-700"
              aria-label={label}  // Add aria-label for accessibility
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-64 p-4">
        {/* Top bar for mobile */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <button onClick={toggleSidebar}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
