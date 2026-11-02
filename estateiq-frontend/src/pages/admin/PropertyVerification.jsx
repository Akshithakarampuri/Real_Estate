import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatters';
import { ShieldCheck, Check, X, Eye, AlertTriangle } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

export const PropertyVerification = () => {
  const [pendingProperties, setPendingProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const { success, error } = useToast();

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const list = await adminService.getPendingProperties();
        if (isMounted) setPendingProperties(list);
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

  const handleApprove = async (id, title) => {
    try {
      await adminService.verifyProperty(id, true);
      setPendingProperties((prev) => prev.filter((p) => p.id !== id));
      success(`"${title}" has been approved & published to marketplace!`);
    } catch (err) {
      error(err.message || 'Approval failed.');
    }
  };

  const handleConfirmReject = async (e) => {
    e.preventDefault();
    if (!selectedProperty) return;
    try {
      await adminService.verifyProperty(selectedProperty.id, false, rejectionReason);
      setPendingProperties((prev) => prev.filter((p) => p.id !== selectedProperty.id));
      setRejectModalOpen(false);
      setRejectionReason('');
      success(`"${selectedProperty.title}" rejected with feedback sent to seller.`);
    } catch (err) {
      error(err.message || 'Rejection failed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Listing Audit Queue</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Property Verification Queue
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review new property submissions, check documentation, and approve listings
        </p>
      </div>

      {pendingProperties.length === 0 && !loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Verification Queue Clear</h3>
          <p className="text-xs text-slate-500 mt-1">All pending listings have been audited and resolved.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase">
                <tr>
                  <th className="p-4">Listing Title & Location</th>
                  <th className="p-4">Seller Details</th>
                  <th className="p-4">Asking Price</th>
                  <th className="p-4">AI Fraud Score</th>
                  <th className="p-4 text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {pendingProperties.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200'}
                          alt={p.title}
                          className="w-14 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{p.title}</div>
                          <div className="text-[11px] text-slate-400">
                            {p.location}, {p.city} • {p.bhk} BHK • {p.area} sq.ft
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-900">{p.seller?.name || 'Verified Seller'}</div>
                      <div className="text-[10px] text-slate-400">{p.seller?.phone || '+91 98211 99887'}</div>
                    </td>

                    <td className="p-4 font-black text-brand-700">
                      {formatPrice(p.price)}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          (p.fraudScore || 10) > 50
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {p.fraudScore || 8} / 100 Risk
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleApprove(p.id, p.title)}
                          className="px-3 py-1.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedProperty(p);
                            setRejectModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-xl font-bold text-xs bg-rose-50 text-rose-700 hover:bg-rose-100 flex items-center gap-1 border border-rose-200"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      <Modal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Reject Listing Submission"
        subtitle={`Listing: ${selectedProperty?.title}`}
      >
        <form onSubmit={handleConfirmReject} className="space-y-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-800 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>The seller will receive this feedback to rectify their listing.</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Audit Rejection Reason *
            </label>
            <textarea
              rows={3}
              required
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Please upload clear ownership index-II documentation and higher resolution images."
              className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="danger">
              Confirm Rejection
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
