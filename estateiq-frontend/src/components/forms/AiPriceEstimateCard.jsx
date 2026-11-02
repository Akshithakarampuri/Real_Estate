import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { formatExactCurrency } from '../../utils/formatters';
import { Sparkles, TrendingUp, ShieldCheck, RefreshCw } from 'lucide-react';

export const AiPriceEstimateCard = ({ formData, onApplyPrice }) => {
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await aiService.predictPrice({
        city: formData.city || 'Mumbai',
        location: formData.location || '',
        area: formData.area || 1500,
        bhk: formData.bhk || 3,
        propertyType: formData.propertyType || 'Apartment',
        amenities: formData.amenities || [],
      });
      setEstimate(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-950 via-slate-900 to-navy-950 text-white p-6 shadow-xl border border-brand-800/40 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-tight">AI Valuation Engine</h4>
            <p className="text-[11px] text-slate-400">FastAPI microservice trained on 100k+ metro transactions</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePredict}
          disabled={loading}
          className="btn-gold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 font-bold"
        >
          {loading ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <TrendingUp className="w-3.5 h-3.5" />
          )}
          <span>{estimate ? 'Recalculate AI' : 'Estimate Fair Price'}</span>
        </button>
      </div>

      {estimate ? (
        <div className="mt-5 space-y-4 relative z-10 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Predicted Fair Market Value
              </span>
              <div className="text-3xl font-black text-brand-400 mt-0.5">
                {formatExactCurrency(estimate.estimatedPrice)}
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-200">
                {estimate.confidenceScore}% Confidence
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs flex justify-between items-center text-slate-300">
            <span>Recommended Listing Range:</span>
            <span className="font-extrabold text-white">
              {formatExactCurrency(estimate.priceRange.min)} – {formatExactCurrency(estimate.priceRange.max)}
            </span>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-300 pl-1">
            {estimate.factors?.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {onApplyPrice && (
            <button
              type="button"
              onClick={() => onApplyPrice(estimate.estimatedPrice)}
              className="w-full mt-2 py-2 text-xs font-bold text-brand-300 bg-brand-500/20 hover:bg-brand-500/30 rounded-xl transition-colors border border-brand-500/40"
            >
              Apply AI Suggested Price ({formatExactCurrency(estimate.estimatedPrice)})
            </button>
          )}
        </div>
      ) : (
        <div className="mt-4 text-xs text-slate-400 leading-relaxed">
          Click <strong>Estimate Fair Price</strong> to generate an instant algorithmic valuation based on location, BHK, sq.ft, and selected amenities.
        </div>
      )}
    </div>
  );
};
