import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Building2, UserCheck, Home, Briefcase, Lock, Mail, User, Phone, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const Register = () => {
  const { register } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [role, setRole] = useState('buyer'); // buyer, seller, agent (Admin strictly omitted!)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register({ name, email, password, role, phone });
      success(`Welcome to EstateIQ, ${user.name}!`);
      if (user.role === 'seller') navigate('/seller/dashboard');
      else if (user.role === 'agent') navigate('/agent/dashboard');
      else navigate('/buyer/dashboard');
    } catch (err) {
      error(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center text-brand-400">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-slate-900">
              Estate<span className="text-brand-600">IQ</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-slate-900">Create your account</h2>
          <p className="text-xs text-slate-500 mt-1">Select your profile role to personalize your workspace</p>
        </div>

        {/* Role Selector Tabs (Buyer, Seller, Agent) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
            I am registering as a:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`p-3 rounded-2xl border text-center transition-all ${
                role === 'buyer'
                  ? 'bg-brand-50 border-brand-600 text-brand-900 font-bold ring-2 ring-brand-500/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <UserCheck className="w-5 h-5 mx-auto mb-1 text-blue-600" />
              <div className="text-xs">Buyer</div>
            </button>

            <button
              type="button"
              onClick={() => setRole('seller')}
              className={`p-3 rounded-2xl border text-center transition-all ${
                role === 'seller'
                  ? 'bg-brand-50 border-brand-600 text-brand-900 font-bold ring-2 ring-brand-500/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Home className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
              <div className="text-xs">Seller</div>
            </button>

            <button
              type="button"
              onClick={() => setRole('agent')}
              className={`p-3 rounded-2xl border text-center transition-all ${
                role === 'agent'
                  ? 'bg-brand-50 border-brand-600 text-brand-900 font-bold ring-2 ring-brand-500/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Briefcase className="w-5 h-5 mx-auto mb-1 text-amber-600" />
              <div className="text-xs">Agent</div>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rohan Sharma"
                className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

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
                placeholder="rohan@example.com"
                className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Create Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            className="w-full py-3 text-sm font-bold mt-2"
          >
            <span>Register as {role.toUpperCase()}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </form>

        <p className="text-center text-xs text-slate-600">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-brand-600 hover:text-brand-700">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};
