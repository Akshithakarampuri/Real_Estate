import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, ArrowRight, Shield, Award, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { success } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      success('Thank you for subscribing to EstateIQ market intelligence!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-glow">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Estate<span className="text-brand-400">IQ</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              India's premier AI-integrated real estate marketplace. Verified properties, algorithmic price valuations, and seamless escrow-level trust.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>RERA Verified</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Price Predictor</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Discover</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/properties" className="hover:text-white transition-colors">
                  Explore Properties
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-white transition-colors">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link to="/ai-valuation" className="hover:text-white transition-colors flex items-center gap-1.5 text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Price Valuation
                </Link>
              </li>
              <li>
                <Link to="/market-trends" className="hover:text-white transition-colors">
                  Market Trends 2026
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="hover:text-white transition-colors">
                  AI Lifestyle Match
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition-colors">
                  Compare Homes
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Portals</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/seller/dashboard" className="hover:text-white transition-colors">
                  Seller Studio
                </Link>
              </li>
              <li>
                <Link to="/seller/properties/new" className="hover:text-white transition-colors">
                  List a Property
                </Link>
              </li>
              <li>
                <Link to="/agent/dashboard" className="hover:text-white transition-colors">
                  Agent CRM Suite
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-white transition-colors">
                  Platform Admin
                </Link>
              </li>
              <li>
                <Link to="/admin/fraud" className="hover:text-white transition-colors">
                  AI Fraud Shield
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Stay Ahead</h4>
            <p className="text-xs text-slate-400 mb-3">
              Receive curated property alerts, price drops, and quarterly market intelligence.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
              <button
                type="submit"
                className="w-full btn-primary text-xs py-2 rounded-xl flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} EstateIQ Real Estate Technologies Ltd. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">RERA Compliance</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Center</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
