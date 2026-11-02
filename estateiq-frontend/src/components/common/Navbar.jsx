import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { QuickRoleSwitcher } from './QuickRoleSwitcher';
import { MOCK_NOTIFICATIONS } from '../../utils/mockData';
import {
  Building2,
  Heart,
  Bell,
  MapPin,
  Scale,
  TrendingUp,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  PlusCircle,
  Users,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout, role } = useAuth();
  const { favorites, compareList } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setProfileDropdownOpen(false);
  };

  const markAllNotifsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getDashboardPath = () => {
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'agent') return '/agent/dashboard';
    if (role === 'seller') return '/seller/dashboard';
    return '/buyer/dashboard';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center text-brand-400 shadow-md group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                  Estate<span className="text-brand-600">IQ</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  AI Real Estate
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link
                to="/properties"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive('/properties')
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Buy
              </Link>
              <Link
                to="/seller/properties/new"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive('/seller/properties/new')
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Sell
              </Link>
              <Link
                to="/map"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  isActive('/map')
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <MapPin className="w-4 h-4 text-brand-600" />
                Map
              </Link>
              <Link
                to="/compare"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  isActive('/compare')
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Scale className="w-4 h-4" />
                Compare
                {compareList.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-[11px] font-bold bg-slate-200 text-slate-800 rounded-full">
                    {compareList.length}
                  </span>
                )}
              </Link>
              <Link
                to="/market-trends"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  isActive('/market-trends')
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Trends
              </Link>
              <Link
                to="/ai-valuation"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  isActive('/ai-valuation')
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                AI Valuation
              </Link>
            </div>
          </div>

          {/* Right Action Icons & Profile */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Demo Switcher */}
            <QuickRoleSwitcher />

            {/* Favorites Button */}
            <Link
              to="/favorites"
              className="relative p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50/50 rounded-xl transition-colors"
              title="Saved Properties"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifDropdownOpen(!notifDropdownOpen);
                  setProfileDropdownOpen(false);
                }}
                className="relative p-2.5 text-slate-600 hover:text-brand-600 hover:bg-slate-100 rounded-xl transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setNotifDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 z-30 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">Notifications</span>
                        {unreadNotifsCount > 0 && (
                          <span className="px-2 py-0.5 text-xs bg-brand-100 text-brand-800 rounded-full font-bold">
                            {unreadNotifsCount} New
                          </span>
                        )}
                      </div>
                      <button
                        onClick={markAllNotifsRead}
                        className="text-xs text-brand-600 hover:text-brand-700 font-medium"
                      >
                        Mark all as read
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                      {notifications.map((n) => (
                        <div key={n.id} className={`p-3 rounded-xl transition-colors ${n.read ? 'opacity-70' : 'bg-brand-50/40'}`}>
                          <div className="text-xs font-bold text-slate-900">{n.title}</div>
                          <p className="text-xs text-slate-600 mt-1">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setNotifDropdownOpen(false);
                  }}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border border-brand-500"
                  />
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-bold text-slate-900 leading-none">{user?.name}</div>
                    <div className="text-[10px] font-semibold text-brand-600 uppercase tracking-wider mt-0.5">
                      {user?.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setProfileDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 border-b border-slate-100 mb-1">
                        <div className="text-xs font-bold text-slate-900">{user?.name}</div>
                        <div className="text-xs text-slate-500 truncate">{user?.email}</div>
                      </div>

                      <Link
                        to={getDashboardPath()}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl"
                      >
                        <LayoutDashboard className="w-4 h-4 text-brand-600" />
                        Role Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        My Profile
                      </Link>

                      {role === 'buyer' && (
                        <>
                          <Link
                            to="/bookings"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
                          >
                            My Visits
                          </Link>
                          <Link
                            to="/recommendations"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
                          >
                            AI Recommendations
                          </Link>
                        </>
                      )}

                      {role === 'seller' && (
                        <>
                          <Link
                            to="/seller/listings"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
                          >
                            My Listings
                          </Link>
                          <Link
                            to="/seller/properties/new"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
                          >
                            <PlusCircle className="w-4 h-4 text-brand-600" />
                            Add Property
                          </Link>
                        </>
                      )}

                      {role === 'agent' && (
                        <>
                          <Link
                            to="/agent/clients"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
                          >
                            <Users className="w-4 h-4 text-brand-600" />
                            Client Pipeline
                          </Link>
                        </>
                      )}

                      {role === 'admin' && (
                        <>
                          <Link
                            to="/admin/properties/pending"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
                          >
                            <ShieldCheck className="w-4 h-4 text-brand-600" />
                            Verify Properties
                          </Link>
                        </>
                      )}

                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm px-4 py-2 rounded-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <QuickRoleSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <Link
            to="/properties"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
          >
            Buy Properties
          </Link>
          <Link
            to="/seller/properties/new"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
          >
            Sell Property
          </Link>
          <Link
            to="/map"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
          >
            Map View
          </Link>
          <Link
            to="/compare"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
          >
            Compare ({compareList.length})
          </Link>
          <Link
            to="/market-trends"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
          >
            Market Trends
          </Link>
          <Link
            to="/ai-valuation"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-amber-700 hover:bg-amber-50"
          >
            AI Price Valuation
          </Link>
          <Link
            to={getDashboardPath()}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-brand-700 bg-brand-50"
          >
            {role.toUpperCase()} Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};
