import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  ShieldAlert,
  Users,
  Building,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const res = await adminService.getPlatformAnalytics();
        if (isMounted) setData(res);
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

  if (loading || !data) {
    return (
      <div className="max-w-7xl mx-auto py-16 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-600 mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl bg-slate-950 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800 shadow-xl">
        <div>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
            Trust & Platform Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            Admin Command Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            System overview for <strong>{data.totalUsers.toLocaleString()}</strong> registered users and <strong>{data.totalProperties}</strong> properties
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/admin/properties/pending"
            className="btn-primary text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Review Pending ({data.pendingVerificationCount})</span>
          </Link>
          <Link
            to="/admin/fraud"
            className="btn-secondary bg-rose-950/40 text-rose-300 border-rose-800 hover:bg-rose-900/50 text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Fraud Alerts ({data.criticalFraudAlerts})</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Accounts</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{data.totalUsers.toLocaleString()}</div>
          <div className="flex gap-2 text-[10px] text-slate-500 font-semibold mt-0.5">
            <span>{data.buyersCount} Buyers</span> • <span>{data.sellersCount} Sellers</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Live Listings</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{data.totalProperties}</div>
          <span className="text-[11px] text-emerald-700 font-bold">Audited Inventory</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Pending Audits</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{data.pendingVerificationCount}</div>
          <Link to="/admin/properties/pending" className="text-[11px] text-brand-600 font-bold hover:underline">
            Process Queue →
          </Link>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">AI Fraud Triggers</span>
          <div className="text-2xl font-black text-rose-600 mt-1">{data.criticalFraudAlerts} Active</div>
          <Link to="/admin/fraud" className="text-[11px] text-rose-600 font-bold hover:underline">
            Investigate Risk →
          </Link>
        </div>
      </div>

      {/* Platform Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Platform User & Inventory Growth</h3>
              <p className="text-xs text-slate-500">6-month expansion across buyers, sellers, and listings</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              +{data.monthlyGrowthPercent}% MoM
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.userGrowthData}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#userGrad)"
                  name="Total Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Activity */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Regional Listing Density</h3>
            <p className="text-xs text-slate-500">Inventory breakdown by metro cluster</p>
          </div>

          <div className="space-y-3 pt-2">
            {data.regionalDistribution.map((reg) => (
              <div key={reg.region} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{reg.region}</span>
                  <span className="text-brand-700">{reg.count}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-600 h-full rounded-full"
                    style={{ width: `${(reg.count / 1200) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
