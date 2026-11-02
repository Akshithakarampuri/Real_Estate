import React, { useState, useEffect } from 'react';
import { agentService } from '../../services/agentService';
import { Calendar as CalendarIcon, Clock, User, CheckCircle2, ChevronLeft, ChevronRight, Video } from 'lucide-react';

export const AgentCalendar = () => {
  const [view, setView] = useState('Week'); // Month, Week, Day
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await agentService.getAppointments();
        if (isMounted) setAppointments(data);
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

  const daysOfWeek = ['Mon, Sep 12', 'Tue, Sep 13', 'Wed, Sep 14', 'Thu, Sep 15', 'Fri, Sep 16'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Schedule Planner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Appointments & Site Visits
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Confirmed client walkthroughs and video consultations
          </p>
        </div>

        {/* View Switcher: Month, Week, Day */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
          {['Month', 'Week', 'Day'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors ${
                view === v ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Week Calendar Schedule Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div className="font-bold text-sm text-slate-900">September 2026 — Calendar Week 37</div>
          <div className="flex gap-2">
            <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {daysOfWeek.map((day, idx) => {
            const dayApts = appointments.filter((_, i) => (i % 5) === idx);
            return (
              <div key={day} className="rounded-xl bg-slate-50 p-3 border border-slate-100 min-h-[300px] space-y-3">
                <div className="text-xs font-bold text-slate-700 border-b pb-2">{day}</div>
                {dayApts.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3 rounded-xl bg-white border border-brand-200 shadow-subtle space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-700">{apt.time}</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 rounded">
                        {apt.status}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 truncate">{apt.clientName}</div>
                    <div className="text-[11px] text-slate-500 truncate">{apt.propertyTitle}</div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-1">
                      <Clock className="w-3 h-3 text-brand-600" />
                      <span>{apt.type}</span>
                    </div>
                  </div>
                ))}
                {dayApts.length === 0 && (
                  <div className="text-[11px] text-slate-400 text-center pt-8 italic">
                    No bookings
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
