import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, Briefcase, Home, ChevronRight, Zap } from 'lucide-react';

export const QuickRoleSwitcher = () => {
  const { user, switchDemoRole } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    { role: 'buyer', label: 'Buyer', icon: UserCheck, desc: 'Search, Save & Visit', path: '/buyer/dashboard' },
    { role: 'seller', label: 'Seller', icon: Home, desc: 'Listings & Inquiries', path: '/seller/dashboard' },
    { role: 'agent', label: 'Agent', icon: Briefcase, desc: 'CRM, Deals & Calendar', path: '/agent/dashboard' },
    { role: 'admin', label: 'Admin', icon: ShieldCheck, desc: 'Verification & Fraud Hub', path: '/admin/dashboard' },
  ];

  const handleSelect = async (r) => {
    await switchDemoRole(r.role);
    navigate(r.path);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-slate-900 text-gold-400 hover:bg-slate-800 transition-all border border-slate-700 shadow-sm"
        title="Quick Role Demo Switcher"
      >
        <Zap className="w-3.5 h-3.5 text-gold-400 fill-gold-400 animate-pulse" />
        <span className="capitalize">{user?.role || 'Switch Role'} Demo</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-slate-100">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Instant Role Demo Switcher
              </p>
              <p className="text-xs text-slate-600 mt-0.5">Switch view without re-logging in</p>
            </div>
            <div className="py-1 space-y-1">
              {roles.map((r) => {
                const Icon = r.icon;
                const active = user?.role === r.role;
                return (
                  <button
                    key={r.role}
                    onClick={() => handleSelect(r)}
                    className={`w-full text-left flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors ${
                      active ? 'bg-brand-50 text-brand-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-1.5 rounded-lg ${
                          active ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold">{r.label}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{r.desc}</div>
                      </div>
                    </div>
                    {active ? (
                      <span className="w-2 h-2 rounded-full bg-brand-600" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
