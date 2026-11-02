import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, Mail, Phone, ShieldCheck, Bell, Lock, Camera, Check } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { success } = useToast();

  const [name, setName] = useState(user?.name || 'Rohan Sharma');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 12345');
  const [email] = useState(user?.email || 'buyer@estateiq.com');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [priceDropAlerts, setPriceDropAlerts] = useState(true);

  const [saving, setSaving] = useState(false);

  const handleSaveInfo = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      updateProfile({ name, phone });
      setSaving(false);
      success('Profile updated successfully!');
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Account & Profile Settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your identity, role permissions, and notification preferences
        </p>
      </div>

      {/* Profile Info Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
          <div className="relative group">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-brand-500 shadow-md"
            />
            <button
              type="button"
              className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold"
              title="Change Photo"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">{user?.name}</h3>
            <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-extrabold uppercase rounded-full tracking-wider bg-brand-50 text-brand-700 border border-brand-200">
              {user?.role} Account
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveInfo} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-500 bg-slate-50 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Assigned Platform Role
              </label>
              <input
                type="text"
                disabled
                value={user?.role?.toUpperCase() || 'BUYER'}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-brand-700 bg-brand-50/50 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" isLoading={saving} className="text-xs px-5 py-2.5">
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-600" />
          <span>Notification Preferences</span>
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <div className="text-xs font-bold text-slate-800">Email Alerts on Visit Confirmations</div>
              <div className="text-[11px] text-slate-400">Receive calendar invitations when agent accepts</div>
            </div>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="w-4 h-4 text-brand-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <div className="text-xs font-bold text-slate-800">SMS / WhatsApp Visit Updates</div>
              <div className="text-[11px] text-slate-400">Receive agent ETA on appointment morning</div>
            </div>
            <input
              type="checkbox"
              checked={smsNotifs}
              onChange={(e) => setSmsNotifs(e.target.checked)}
              className="w-4 h-4 text-brand-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <div className="text-xs font-bold text-slate-800">AI Price Drop & Saved Search Alerts</div>
              <div className="text-[11px] text-slate-400">Instant notification when a favorite drops price</div>
            </div>
            <input
              type="checkbox"
              checked={priceDropAlerts}
              onChange={(e) => setPriceDropAlerts(e.target.checked)}
              className="w-4 h-4 text-brand-600 rounded"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
