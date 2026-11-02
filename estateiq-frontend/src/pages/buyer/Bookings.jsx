import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import { EmptyState } from '../../components/common/EmptyState';
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const list = await bookingService.getBookings();
        if (isMounted) setBookings(list);
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Rescheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filtered = bookings.filter((b) => filterStatus === 'All' || b.status === filterStatus);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Site Visits & Walkthroughs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Scheduled Visits
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track confirmed appointments with verified agents and sellers
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
          {['All', 'Pending', 'Accepted', 'Rescheduled', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                filterStatus === status
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && !loading ? (
        <EmptyState
          icon="calendar"
          title="No scheduled visits found"
          description="Schedule an in-person or virtual walkthrough on any property details page to inspect floor plans and society amenities."
          actionLabel="Find a Property"
          onAction={() => window.location.assign('/properties')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle hover:shadow-premium transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-400">ID: {b.id}</span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                    b.status
                  )}`}
                >
                  {b.status}
                </span>
              </div>

              <div className="flex gap-3">
                <img
                  src={b.propertyImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300'}
                  alt={b.propertyTitle}
                  className="w-20 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="overflow-hidden">
                  <Link
                    to={`/properties/${b.propertyId}`}
                    className="text-xs font-bold text-slate-900 hover:text-brand-600 line-clamp-2 block"
                  >
                    {b.propertyTitle}
                  </Link>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-brand-600" />
                  <span className="font-semibold">{b.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-brand-600" />
                  <span>{b.time}</span>
                </div>
              </div>

              {b.message && (
                <p className="text-[11px] text-slate-500 italic bg-slate-50/50 p-2 rounded-lg">
                  "{b.message}"
                </p>
              )}

              <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                <Link
                  to={`/properties/${b.propertyId}`}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700"
                >
                  View Listing →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
