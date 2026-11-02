import React, { useState, useEffect } from 'react';
import { agentService } from '../../services/agentService';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { BarChart3, TrendingUp, DollarSign, Award, ArrowUpRight } from 'lucide-react';
import { formatExactCurrency } from '../../utils/formatters';

export const AgentAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const res = await agentService.getAgentAnalytics();
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
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Agency Performance Matrix</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Broker Sales & Commission Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Quarterly revenue acceleration and client conversion metrics
        </p>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Monthly Commission Earnings</h3>
            <p className="text-xs text-slate-500">Gross commission generated from closed transactions</p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.6% QoQ</span>
          </span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.monthlyRevenue} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
              />
              <Tooltip
                formatter={(val) => formatExactCurrency(val)}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
              <Bar dataKey="commission" fill="#10b981" radius={[6, 6, 0, 0]} name="Commission (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Closed Deals Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Closed Transactions Velocity</h3>
            <p className="text-xs text-slate-500">Monthly units closed successfully</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="deals"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  name="Deals Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Value Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Pipeline Stage Values</h3>
            <p className="text-xs text-slate-500">Inventory volume currently in discussion</p>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {data.pipelineBreakdown.map((p) => (
              <div key={p.stage} className="py-2.5 flex justify-between items-center">
                <span className="font-bold text-slate-800">{p.stage}</span>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500">{p.count} Clients</span>
                  <span className="font-black text-brand-700">{p.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
