import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { ViewsOverTimeChart, InquiriesAndVisitsChart } from '../../components/charts/AnalyticsCharts';
import {
  Building2,
  Eye,
  MessageSquare,
  Calendar,
  TrendingUp,
  PlusCircle,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export const SellerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const res = await propertyService.getProperties();
        if (isMounted) setProperties(res.properties);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalViews = properties.reduce((acc, p) => acc + (p.viewsCount || 0), 0);
  const activeCount = properties.filter((p) => p.status === 'active' || p.verified).length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800 shadow-xl">
        <div>
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
            Seller Operations Studio
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            Listing Performance & Leads
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitor real-time buyer interest, inquiries, and scheduled walkthroughs
          </p>
        </div>

        <Link
          to="/seller/properties/new"
          className="btn-primary text-xs px-5 py-3 rounded-xl flex items-center gap-2 font-bold shadow-glow shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Listing</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Listings</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{properties.length}</div>
          <span className="text-[11px] text-brand-600 font-bold">Portfolio Count</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active on Market</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{activeCount}</div>
          <span className="text-[11px] text-emerald-700 font-bold">Verified & Live</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Views</span>
          <div className="text-2xl font-black text-blue-600 mt-1">{totalViews.toLocaleString()}</div>
          <span className="text-[11px] text-slate-400">+14% this week</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Inquiries</span>
          <div className="text-2xl font-black text-amber-600 mt-1">42</div>
          <Link to="/seller/inquiries" className="text-[11px] text-brand-600 font-bold hover:underline">
            View Inbox →
          </Link>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Upcoming Visits</span>
          <div className="text-2xl font-black text-purple-600 mt-1">8</div>
          <Link to="/seller/bookings" className="text-[11px] text-brand-600 font-bold hover:underline">
            Manage Slots →
          </Link>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Weekly Property Views</h3>
              <p className="text-xs text-slate-500">Aggregate daily impressions across active properties</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              +18.2% Growth
            </span>
          </div>
          <ViewsOverTimeChart />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Inquiries vs Site Visits</h3>
              <p className="text-xs text-slate-500">Conversion from message into physical inspection</p>
            </div>
          </div>
          <InquiriesAndVisitsChart />
        </div>
      </div>

      {/* Quick Listings Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-4 p-6">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Your Recent Listings</h3>
            <p className="text-xs text-slate-500">Current status and engagement metrics</p>
          </div>
          <Link to="/seller/listings" className="text-xs font-bold text-brand-600 hover:underline">
            View All Listings →
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {properties.slice(0, 4).map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={p.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200'}
                  alt={p.title}
                  className="w-14 h-12 rounded-xl object-cover"
                />
                <div>
                  <Link
                    to={`/seller/properties/${p.id}/analytics`}
                    className="text-xs font-bold text-slate-900 hover:text-brand-600 truncate block max-w-sm"
                  >
                    {p.title}
                  </Link>
                  <span className="text-[11px] text-slate-500">
                    {p.location}, {p.city} • {formatPrice(p.price)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    p.verified
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {p.verified ? 'Verified Active' : 'Pending Verification'}
                </span>
                <Link
                  to={`/seller/properties/${p.id}/analytics`}
                  className="btn-secondary text-xs px-3 py-1.5 rounded-xl hidden sm:inline-block"
                >
                  Analytics
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
