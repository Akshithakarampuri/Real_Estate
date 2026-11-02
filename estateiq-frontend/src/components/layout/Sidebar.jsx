import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Heart,
  Clock,
  Calendar,
  Sparkles,
  MessageSquare,
  TrendingUp,
  User,
  Building,
  PlusCircle,
  Users,
  BarChart3,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Star,
} from 'lucide-react';

export const Sidebar = ({ onClose }) => {
  const { role, user } = useAuth();

  const getLinksForRole = () => {
    switch (role) {
      case 'seller':
        return [
          { to: '/seller/dashboard', icon: LayoutDashboard, label: 'Studio Overview' },
          { to: '/seller/listings', icon: Building, label: 'My Listings' },
          { to: '/seller/properties/new', icon: PlusCircle, label: 'Add New Property' },
          { to: '/seller/inquiries', icon: MessageSquare, label: 'Buyer Inquiries' },
          { to: '/seller/bookings', icon: Calendar, label: 'Visit Requests' },
          { to: '/profile', icon: User, label: 'Profile Settings' },
        ];
      case 'agent':
        return [
          { to: '/agent/dashboard', icon: LayoutDashboard, label: 'Agent Hub' },
          { to: '/agent/clients', icon: Users, label: 'CRM Pipeline' },
          { to: '/agent/listings', icon: Building, label: 'Managed Listings' },
          { to: '/agent/calendar', icon: Calendar, label: 'Appointments' },
          { to: '/agent/analytics', icon: BarChart3, label: 'Sales Analytics' },
          { to: '/profile', icon: User, label: 'Profile Settings' },
        ];
      case 'admin':
        return [
          { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Admin Command' },
          { to: '/admin/users', icon: Users, label: 'User Directory' },
          { to: '/admin/properties/pending', icon: ShieldCheck, label: 'Verification Queue' },
          { to: '/admin/fraud', icon: AlertTriangle, label: 'AI Fraud Shield' },
          { to: '/admin/reviews', icon: Star, label: 'Review Moderation' },
          { to: '/admin/reports', icon: FileText, label: 'Platform Reports' },
          { to: '/profile', icon: User, label: 'Profile Settings' },
        ];
      case 'buyer':
      default:
        return [
          { to: '/buyer/dashboard', icon: LayoutDashboard, label: 'My Overview' },
          { to: '/favorites', icon: Heart, label: 'Saved Favorites' },
          { to: '/recently-viewed', icon: Clock, label: 'Recently Viewed' },
          { to: '/bookings', icon: Calendar, label: 'My Site Visits' },
          { to: '/recommendations', icon: Sparkles, label: 'AI Matches' },
          { to: '/inquiries', icon: MessageSquare, label: 'Inquiries & Chat' },
          { to: '/market-trends', icon: TrendingUp, label: 'Market Trends' },
          { to: '/profile', icon: User, label: 'Profile Settings' },
        ];
    }
  };

  const links = getLinksForRole();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full select-none">
      {/* User Badge Banner */}
      <div className="p-5 border-b border-slate-100 flex items-center gap-3">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
          alt="Avatar"
          className="w-11 h-11 rounded-full object-cover border-2 border-brand-500 shadow-sm"
        />
        <div className="overflow-hidden">
          <h4 className="text-sm font-bold text-slate-900 truncate">{user?.name}</h4>
          <span className="inline-block mt-0.5 px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full tracking-wider bg-brand-50 text-brand-700 border border-brand-200">
            {role} portal
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to.endsWith('dashboard')}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* RERA / Security reassurance box */}
      <div className="p-4 m-3 rounded-xl bg-slate-50 border border-slate-100">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Security & Trust</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 leading-snug">
          All listings undergo AI verification and title check before publishing.
        </p>
      </div>
    </aside>
  );
};
