import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Sidebar } from './Sidebar';
import { Menu, X } from 'lucide-react';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Generate a friendly page title from pathname
  const formatPathTitle = (path) => {
    const parts = path.split('/').filter(Boolean);
    if (!parts.length) return 'Dashboard';
    const last = parts[parts.length - 1];
    return last
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-64 max-w-xs bg-white shadow-xl z-10">
              <div className="flex justify-end p-2 border-b border-slate-100">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Sub-header on Mobile with toggle */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-2 rounded-xl"
            >
              <Menu className="w-4 h-4" />
              <span>Portal Menu</span>
            </button>
            <span className="text-sm font-bold text-slate-900">
              {formatPathTitle(location.pathname)}
            </span>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
