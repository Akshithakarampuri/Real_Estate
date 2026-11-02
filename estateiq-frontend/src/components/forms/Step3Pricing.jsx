import React from 'react';
import { AiPriceEstimateCard } from './AiPriceEstimateCard';
import { formatExactCurrency } from '../../utils/formatters';

export const Step3Pricing = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      {/* AI Valuation Assistant */}
      <AiPriceEstimateCard
        formData={formData}
        onApplyPrice={(val) => updateFormData({ price: val })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Expected Listing Price (₹) *
          </label>
          <input
            type="number"
            required
            min="100000"
            step="50000"
            value={formData.price || ''}
            onChange={(e) => updateFormData({ price: Number(e.target.value) })}
            placeholder="e.g. 15000000"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base font-bold text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          {formData.price > 0 && (
            <span className="text-xs text-slate-500 mt-1 block">
              In words: <strong>{formatExactCurrency(formData.price)}</strong>
            </span>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Monthly Maintenance (₹)
          </label>
          <input
            type="number"
            min="0"
            value={formData.maintenance || ''}
            onChange={(e) => updateFormData({ maintenance: Number(e.target.value) })}
            placeholder="e.g. 6500"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <input
          type="checkbox"
          id="negotiable"
          checked={!!formData.negotiable}
          onChange={(e) => updateFormData({ negotiable: e.target.checked })}
          className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
        />
        <label htmlFor="negotiable" className="text-xs font-bold text-slate-800 cursor-pointer">
          Price is slightly negotiable for serious cash buyers & prompt token advances.
        </label>
      </div>
    </div>
  );
};
