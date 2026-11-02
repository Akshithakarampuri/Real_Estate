import React from 'react';
import { CITIES } from '../../utils/constants';
import { MapPin } from 'lucide-react';

export const Step2Location = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Building / Society / Street Address *
        </label>
        <input
          type="text"
          required
          value={formData.address || ''}
          onChange={(e) => updateFormData({ address: e.target.value })}
          placeholder="e.g. Tower 4, Flat 1802, The Crest, Golf Course Road"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            City *
          </label>
          <select
            value={formData.city || 'Mumbai'}
            onChange={(e) => updateFormData({ city: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Locality / Neighborhood *
          </label>
          <input
            type="text"
            required
            value={formData.location || ''}
            onChange={(e) => updateFormData({ location: e.target.value })}
            placeholder="e.g. Worli Sea Face"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Pincode *
          </label>
          <input
            type="text"
            required
            value={formData.pincode || ''}
            onChange={(e) => updateFormData({ pincode: e.target.value })}
            placeholder="e.g. 400018"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {/* Map Coordinates Picker Simulation */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <MapPin className="w-4 h-4 text-brand-600" />
            <span>Geo-Coordinates & Map Pinning</span>
          </div>
          <span className="text-[11px] text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full font-bold">
            Auto-Geocoded
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Latitude</label>
            <input
              type="number"
              step="0.0001"
              value={formData.coordinates?.lat || 19.0176}
              onChange={(e) =>
                updateFormData({
                  coordinates: { ...formData.coordinates, lat: Number(e.target.value) },
                })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Longitude</label>
            <input
              type="number"
              step="0.0001"
              value={formData.coordinates?.lng || 72.8172}
              onChange={(e) =>
                updateFormData({
                  coordinates: { ...formData.coordinates, lng: Number(e.target.value) },
                })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
