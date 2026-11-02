import React from 'react';
import { PROPERTY_TYPES, BHK_OPTIONS, FURNISHING_STATUS } from '../../utils/constants';

export const Step1Basic = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Property Title *
        </label>
        <input
          type="text"
          required
          value={formData.title || ''}
          onChange={(e) => updateFormData({ title: e.target.value })}
          placeholder="e.g. Luxurious 3BHK Penthouse with Private Deck"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Property Type *
          </label>
          <select
            value={formData.propertyType || 'Apartment'}
            onChange={(e) => updateFormData({ propertyType: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Bedrooms (BHK) *
          </label>
          <select
            value={formData.bhk || 3}
            onChange={(e) => updateFormData({ bhk: Number(e.target.value) })}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            {BHK_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b} BHK
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Bathrooms *
          </label>
          <input
            type="number"
            min="1"
            max="10"
            required
            value={formData.bathrooms || 3}
            onChange={(e) => updateFormData({ bathrooms: Number(e.target.value) })}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Super Built-up Area (sq.ft) *
          </label>
          <input
            type="number"
            min="200"
            max="25000"
            required
            value={formData.area || 1850}
            onChange={(e) => updateFormData({ area: Number(e.target.value) })}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Furnishing Status
          </label>
          <select
            value={formData.furnishing || 'Semi-Furnished'}
            onChange={(e) => updateFormData({ furnishing: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            {FURNISHING_STATUS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Detailed Description *
        </label>
        <textarea
          rows={4}
          required
          value={formData.description || ''}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Highlight property aesthetics, ventilation, sunlight, modular kitchen, and tower specifications..."
          className="w-full rounded-xl border border-slate-200 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </div>
    </div>
  );
};
