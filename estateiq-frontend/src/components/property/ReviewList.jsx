import React from 'react';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';
import { MOCK_REVIEWS } from '../../utils/mockData';

export const ReviewList = ({ reviews = MOCK_REVIEWS, averageRating = 4.9 }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Verified Resident & Buyer Reviews</h3>
          <p className="text-xs text-slate-500 mt-0.5">Authentic feedback from verified neighborhood visitors</p>
        </div>

        <div className="flex items-center gap-3 bg-brand-50 border border-brand-200/80 px-4 py-2.5 rounded-2xl">
          <div className="text-2xl font-black text-brand-800">{averageRating}</div>
          <div>
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <div className="text-[11px] font-semibold text-slate-600 mt-0.5">Overall Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Review items */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle className="w-3 h-3" />
                        Verified Tour
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
              </div>

              <div className="flex text-amber-400">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pl-12">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
