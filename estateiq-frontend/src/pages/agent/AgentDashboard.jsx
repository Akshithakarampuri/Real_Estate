import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { agentService } from '../../services/agentService';
import { propertyService } from '../../services/propertyService';
import {
  Users,
  Building,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

export const AgentDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const [anData, clientData] = await Promise.all([
          agentService.getAgentAnalytics(),
          agentService.getClients(),
        ]);
        if (isMounted) {
          setAnalytics(anData);
          setLeads(clientData);
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
  }, []);

  if (loading || !analytics) {
    return (
      <div className="max-w-7xl mx-auto py-16 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-600 mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800 shadow-xl">
        <div>
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
            Agent CRM Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            Sales Pipeline & Portfolio
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tracking <strong>{leads.length}</strong> active client negotiations across Mumbai & Bengaluru
          </p>
        </div>

        <Link
          to="/agent/clients"
          className="btn-gold text-xs px-5 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg"
        >
          <Users className="w-4 h-4" />
          <span>Open CRM Kanban</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active Leads</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{analytics.totalLeads}</div>
          <span className="text-[11px] text-blue-600 font-bold">5 High-Intent</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Visits Booked</span>
          <div className="text-2xl font-black text-brand-700 mt-1">{analytics.visitsThisMonth}</div>
          <span className="text-[11px] text-slate-400">This Month</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Deals Closed</span>
          <div className="text-2xl font-black text-purple-600 mt-1">{analytics.dealsClosed}</div>
          <span className="text-[11px] text-purple-700 font-bold">₹28 Cr Volume</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Conversion Rate</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{analytics.conversionRate}</div>
          <span className="text-[11px] text-emerald-700 font-bold">+4.2% YoY</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Broker Commission</span>
          <div className="text-2xl font-black text-amber-600 mt-1">₹36.5 L</div>
          <Link to="/agent/analytics" className="text-[11px] text-brand-600 font-bold hover:underline">
            View Analytics →
          </Link>
        </div>
      </div>

      {/* CRM Funnel Teaser */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">CRM Deal Pipeline Snapshot</h3>
            <p className="text-xs text-slate-500">Pipeline progression across active deal stages</p>
          </div>
          <Link to="/agent/clients" className="text-xs font-bold text-brand-600 hover:underline">
            Manage Full Pipeline →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {analytics.pipelineBreakdown.map((stage) => (
            <div key={stage.stage} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] font-extrabold uppercase text-slate-500">
                {stage.stage}
              </div>
              <div className="text-xl font-black text-slate-900 mt-1">{stage.count} Leads</div>
              <div className="text-xs font-bold text-brand-700 mt-0.5">{stage.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
