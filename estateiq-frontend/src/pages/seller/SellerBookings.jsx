import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/bookingService';
import { useToast } from '../../context/ToastContext';
import { Calendar, Clock, Check, X, RefreshCw, User } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const SellerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

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

  const handleUpdateStatus = async (id, status) => {
    try {
      await bookingService.updateBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
      success(`Booking marked as ${status}!`);
    } catch (err) {
      error(err.message || 'Status update failed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>Appointments Management</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Property Visit Requests
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Accept or reschedule walkthrough appointments requested by prospective buyers
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase">
              <tr>
                <th className="p-4">Buyer Info</th>
                <th className="p-4">Property</th>
                <th className="p-4">Requested Slot</th>
                <th className="p-4">Message</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-700 font-bold flex items-center justify-center shrink-0">
                        {b.buyerName?.charAt(0) || 'B'}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{b.buyerName}</div>
                        <div className="text-[10px] text-slate-400">{b.buyerPhone || '+91 98765 12345'}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-semibold text-slate-900 max-w-xs truncate">
                    {b.propertyTitle}
                  </td>

                  <td className="p-4">
                    <div className="text-slate-800 font-bold">{b.date}</div>
                    <div className="text-[11px] text-slate-400">{b.time}</div>
                  </td>

                  <td className="p-4 max-w-xs truncate text-slate-500">
                    {b.message || 'Standard walkthrough'}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'Accepted'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : b.status === 'Rejected'
                          ? 'bg-rose-50 text-rose-700'
                          : b.status === 'Rescheduled'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {b.status !== 'Accepted' && (
                        <button
                          onClick={() => handleUpdateStatus(b.id, 'Accepted')}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept</span>
                        </button>
                      )}

                      {b.status !== 'Rejected' && (
                        <button
                          onClick={() => handleUpdateStatus(b.id, 'Rejected')}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleUpdateStatus(b.id, 'Rescheduled')}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reschedule</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
