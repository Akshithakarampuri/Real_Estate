import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Building2, Lock, Mail, ArrowRight, UserCheck, Home, Briefcase, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const Login = () => {
  const { login, switchDemoRole } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      success(`Welcome back, ${user.name}!`);

      if (from !== '/') {
        navigate(from, { replace: true });
      } else {
        if (user.role === 'admin') navigate('/admin/dashboard');
        else if (user.role === 'agent') navigate('/agent/dashboard');
        else if (user.role === 'seller') navigate('/seller/dashboard');
        else navigate('/buyer/dashboard');
      }
    } catch (err) {
      error(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role) => {
    setLoading(true);
    try {
      const loggedUser = await switchDemoRole(role);
      success(`Logged in as ${role.toUpperCase()} (${loggedUser.name})`);
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'agent') navigate('/agent/dashboard');
      else if (role === 'seller') navigate('/seller/dashboard');
      else navigate('/buyer/dashboard');
    } catch (err) {
      error(`Failed to switch to ${role}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center text-brand-400">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-slate-900">
              Estate<span className="text-brand-600">IQ</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-slate-900">Sign in to your account</h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your personalized real estate portal & saved listings
          </p>
        </div>

        {/* 1-Click Demo Login Shortcuts */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
          <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center mb-2">
            Instant 1-Click Demo Sign-in
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('buyer')}
              className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-slate-200 hover:border-brand-500 hover:bg-brand-50/40 text-xs font-semibold text-slate-700 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Buyer Portal</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('seller')}
              className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-slate-200 hover:border-brand-500 hover:bg-brand-50/40 text-xs font-semibold text-slate-700 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-emerald-600" />
              <span>Seller Studio</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('agent')}
              className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-slate-200 hover:border-brand-500 hover:bg-brand-50/40 text-xs font-semibold text-slate-700 transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-600" />
              <span>Agent CRM</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-slate-200 hover:border-brand-500 hover:bg-brand-50/40 text-xs font-semibold text-slate-700 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Admin Center</span>
            </button>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 flex justify-between items-center">
            <span>Default password for all roles: <strong className="text-slate-800">Password123</strong></span>
            <button
              type="button"
              className="text-brand-600 hover:text-brand-800 font-bold"
              onClick={() => { setEmail('admin@estateiq.com'); setPassword('Password123'); }}
            >
              Fill Admin
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@estateiq.com"
                className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            className="w-full py-3 text-sm font-bold mt-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </form>

        <p className="text-center text-xs text-slate-600">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-brand-600 hover:text-brand-700">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};
