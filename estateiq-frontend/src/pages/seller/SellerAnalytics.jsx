import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { ViewsOverTimeChart, InquiriesAndVisitsChart } from '../../components/charts/AnalyticsCharts';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ArrowLeft, Eye, MessageSquare, Calendar, Heart, TrendingUp } from 'lucide-react';

export const SellerAnalytics = () => {
  const { id } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const [prop, data] = await Promise.all([
          propertyService.getPropertyById(id),
          propertyService.getPropertyAnalytics(id),
        ]);
        if (isMounted) {
          setProperty(prop);
          setAnalytics(data);
        }
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
  }, [id]);

  if (loading || !analytics) {
    return (
      <div className="max-w-7xl mx-auto py-16 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-600 mx-auto" />
      </div>
    );
  }

  const DEMO_COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  return (
    <div className="space-y-8">
      <div>
        <Link
          to="/seller/listings"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Listings</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Listing Performance Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">{property?.title}</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Views</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{analytics.totalViews}</div>
          <span className="text-[11px] text-emerald-600 font-bold">100% Unique Visitors</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Inquiries</span>
          <div className="text-2xl font-black text-blue-600 mt-1">{analytics.inquiryCount}</div>
          <span className="text-[11px] text-slate-400">Direct buyer leads</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Visit Requests</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{analytics.visitRequests}</div>
          <span className="text-[11px] text-slate-400">Physical walkthroughs</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Saved Favorites</span>
          <div className="text-2xl font-black text-rose-600 mt-1">{analytics.favoritesCount}</div>
          <span className="text-[11px] text-slate-400">High intent prospects</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Conversion Rate</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{analytics.conversionRate}%</div>
          <span className="text-[11px] text-emerald-700 font-bold">Top 10% in locality</span>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Views Over Time</h3>
            <p className="text-xs text-slate-500">Daily viewer interactions over the past 7 days</p>
          </div>
          <ViewsOverTimeChart data={analytics.weeklyViews} />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Buyer Age Demographics</h3>
            <p className="text-xs text-slate-500">Distribution of prospective buyers viewing this unit</p>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.demographics}
                  dataKey="percentage"
                  nameKey="group"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  label={({ group, percentage }) => `${group}: ${percentage}%`}
                >
                  {analytics.demographics.map((_, i) => (
                    <Cell key={i} fill={DEMO_COLORS[i % DEMO_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
