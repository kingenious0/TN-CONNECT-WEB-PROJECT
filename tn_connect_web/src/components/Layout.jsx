import React, { useState } from 'react';
import { Link, useRouter } from './Router';

export function AdminLayout({ children }) {
  const { path } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/' },
    { label: 'Member Management', icon: 'group', to: '/members' },
    { label: 'Audit Logs', icon: 'receipt_long', to: '/logs' },
    { label: 'Export', icon: 'download', to: '/export' }
  ];

  const isActive = (item) => {
    if (item.to === '/') {
      return path === '/';
    }
    return path.startsWith(item.to);
  };

  const navLinks = navItems.map((item) => {
    const active = isActive(item);
    return (
      <Link
        key={item.to}
        to={item.to}
        onClick={() => setMobileMenuOpen(false)}
        className={`flex items-center gap-2 px-2.5 py-2 rounded-lg transition-all ${
          active
            ? 'bg-primary-container text-on-primary-container font-bold scale-[0.98]'
            : 'text-on-surface-variant hover:bg-surface-container-high'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
        <span className="text-[12px] font-medium leading-[16px]">{item.label}</span>
      </Link>
    );
  });

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-on-background relative">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex flex-col h-full w-52 bg-surface-container-low border-r border-outline-variant p-3 gap-1.5">
        <div className="mb-4 px-2 py-3">
          <h1 className="text-[17px] font-semibold leading-[24px] font-bold text-on-surface">Admin Portal</h1>
          <p className="text-[11px] font-medium leading-[14px] text-on-surface-variant">Management Platform</p>
        </div>
        <nav className="flex-grow space-y-0.5">
          {navLinks}
        </nav>
        <div className="mt-auto border-t border-outline-variant pt-3 px-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant bg-slate-300">
            <img 
              alt="Admin User Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvzIU8d3XqnWlnlrSi8DwtbG0587UR21tujs1n_uVPAD0Tbn8-N1HKuG4LuBRJh-A0pn3hf_XFQbLn10kkl_vBOg1zmczS0WqbgFfgRJ_MbWaYcGeTqQd_w9cD4lC5XtPaRMTILD2Hg3IwYvKwk0hNFv81JmoCrtirmuUnQeuqEdogvC0ArSd17qX5VJt1lH3gXaqaR7EjTz9SMv7JigNgSNq32V_1KzaNBInQgxy3ejp-76y6tx_vcn8qdKViNvqQN6SBfp8E-AGl"
            />
          </div>
          <div>
            <p className="text-[12px] font-semibold leading-[16px] text-on-surface">Alex Rivera</p>
            <p className="text-[10px] font-medium leading-[14px] text-on-surface-variant">Super Admin</p>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Slide Navigation Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside 
            className="w-56 h-full bg-surface-container-low p-3 flex flex-col gap-1.5 shadow-2xl transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 px-2 py-3">
              <div>
                <h1 className="text-[17px] font-semibold leading-[24px] font-bold text-on-surface">Admin Portal</h1>
                <p className="text-[11px] font-medium leading-[14px] text-on-surface-variant">Management Platform</p>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="material-symbols-outlined p-1.5 hover:bg-surface-container-high rounded-full cursor-pointer"
              >
                close
              </button>
            </div>
            <nav className="flex-grow space-y-0.5">
              {navLinks}
            </nav>
            <div className="mt-auto border-t border-outline-variant pt-3 px-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant bg-slate-300">
                <img 
                  alt="Admin User Avatar" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvzIU8d3XqnWlnlrSi8DwtbG0587UR21tujs1n_uVPAD0Tbn8-N1HKuG4LuBRJh-A0pn3hf_XFQbLn10kkl_vBOg1zmczS0WqbgFfgRJ_MbWaYcGeTqQd_w9cD4lC5XtPaRMTILD2Hg3IwYvKwk0hNFv81JmoCrtirmuUnQeuqEdogvC0ArSd17qX5VJt1lH3gXaqaR7EjTz9SMv7JigNgSNq32V_1KzaNBInQgxy3ejp-76y6tx_vcn8qdKViNvqQN6SBfp8E-AGl"
                />
              </div>
              <div>
                <p className="text-[14px] font-semibold leading-[20px] text-on-surface">Alex Rivera</p>
                <p className="text-[12px] font-medium leading-[16px] text-on-surface-variant">Super Admin</p>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Top Header Navigation */}
        <header className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-16 bg-surface shadow-sm sticky top-0 z-20 border-b border-outline-variant p-2">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden material-symbols-outlined p-1.5 hover:bg-surface-container-high rounded-full cursor-pointer"
            >
              menu
            </button>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">search</span>
              </span>
              <input 
                className="pl-8 pr-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-full text-[12px] leading-[16px] focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all w-40 sm:w-56 lg:w-80" 
                placeholder="Search members, logs..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="material-symbols-outlined text-[20px] text-on-surface-variant hover:bg-surface-container-high p-1.5 rounded-full transition-all active:scale-95">
              notifications
            </button>
            <button className="material-symbols-outlined text-[20px] text-on-surface-variant hover:bg-surface-container-high p-1.5 rounded-full transition-all active:scale-95">
              settings
            </button>
            <div className="h-6 w-[1px] bg-outline-variant mx-1.5"></div>
            <button className="bg-primary text-on-primary px-3 py-1.5 rounded-lg text-[12px] font-semibold leading-[16px] hover:opacity-90 transition-opacity">
              Add New
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-grow p-margin-mobile md:p-margin-desktop space-y-gutter">
          {children}
        </div>
      </main>
    </div>
  );
}
