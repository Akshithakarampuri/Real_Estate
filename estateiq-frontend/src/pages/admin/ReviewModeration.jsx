import React, { useState } from 'react';
import { MOCK_REVIEWS } from '../../utils/mockData';
import { useToast } from '../../context/ToastContext';
import { Star, CheckCircle, Trash2, ShieldCheck, Flag } from 'lucide-react';

export const ReviewModeration = () => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const { success } = useToast();

  const handleRemove = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    success('Review removed from platform.');
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>Feedback Governance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Review Moderation
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Audit buyer testimonials and verify authenticated walkthrough ratings
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="flex items-start gap-3">
              <img
                src={rev.avatar}
                alt={rev.author}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{rev.author}</h4>
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  {rev.verifiedPurchase && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 rounded">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">{rev.comment}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">{rev.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleRemove(rev.id)}
                className="btn-secondary text-xs px-3 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
