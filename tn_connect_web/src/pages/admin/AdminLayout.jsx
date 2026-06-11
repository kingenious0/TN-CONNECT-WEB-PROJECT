import React, { useState } from 'react';
import { Link } from '../../components/Router';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const togglePanel = () => setCollapsed(!collapsed);

  return (
    <div className="flex min-h-screen bg-surface-container-lowest">
      {/* Side navigation panel */}
      <aside
        className={`bg-surface-container-low transition-all duration-300 ${collapsed ? 'w-12' : 'w-48'} flex flex-col p-2`}
        aria-label="Admin navigation"
      >
        <button
          onClick={togglePanel}
          className="self-end mb-2 text-on-surface-variant hover:text-primary"
          aria-expanded={!collapsed}
          aria-controls="admin-nav"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        {!collapsed && (
          <nav id="admin-nav" className="flex flex-col space-y-1 text-[11px]">
            <Link to="/admin" className="block px-2 py-1 rounded hover:bg-primary/10 text-on-surface">Dashboard</Link>
            <Link to="/admin/logs" className="block px-2 py-1 rounded hover:bg-primary/10 text-on-surface">Audit Logs</Link>
            <Link to="/admin/members" className="block px-2 py-1 rounded hover:bg-primary/10 text-on-surface">Member Management</Link>
          </nav>
        )}
      </aside>
      {/* Main content area */}
      <main className="flex-1 max-w-7xl mx-auto p-2 space-y-2">
        {/* Simple header with page title derived from route */}
        <header className="flex items-center justify-between border-b border-outline-variant pb-1 mb-2">
          <h1 className="text-[14px] font-bold text-on-surface">Admin Panel</h1>
        </header>
        {children}
      </main>
    </div>
  );
}
