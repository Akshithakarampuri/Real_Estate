import React, { useState } from 'react';
import {
  CITIES,
  PROPERTY_TYPES,
  BHK_OPTIONS,
  FURNISHING_STATUS,
  POSSESSION_STATUS,
  AMENITIES_LIST,
} from '../../utils/constants';
import { RotateCcw, Filter, ChevronDown, Check } from 'lucide-react';

export const PropertyFilter = ({ filters, onChange, onReset }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleAmenityToggle = (amenityName) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenityName)
      ? current.filter((a) => a !== amenityName)
      : [...current, amenityName];
    onChange({ amenities: updated });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <Filter className="w-4 h-4 text-brand-600" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Location / City */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          City / Location
        </label>
        <select
          value={filters.location || 'All'}
          onChange={(e) => onChange({ location: e.target.value })}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
        >
          <option value="All">All Major Metros</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Property Type
        </label>
        <select
          value={filters.propertyType || 'All'}
          onChange={(e) => onChange({ propertyType: e.target.value })}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
        >
          <option value="All">All Types</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* BHK Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Bedrooms (BHK)
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          <button
            type="button"
            onClick={() => onChange({ bhk: 'All' })}
            className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
              !filters.bhk || filters.bhk === 'All'
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            All
          </button>
          {BHK_OPTIONS.map((bhk) => (
            <button
              key={bhk}
              type="button"
              onClick={() => onChange({ bhk: String(bhk) })}
              className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                filters.bhk === String(bhk)
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {bhk}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Budget (Max)
          </label>
          <span className="text-xs font-extrabold text-brand-600">
            {filters.maxPrice ? `₹${(Number(filters.maxPrice) / 10000000).toFixed(2)} Cr` : 'Any Price'}
          </span>
        </div>
        <input
          type="range"
          min="3000000"
          max="50000000"
          step="2500000"
          value={filters.maxPrice || 50000000}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-brand-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
          <span>₹30 L</span>
          <span>₹2.5 Cr</span>
          <span>₹5 Cr+</span>
        </div>
      </div>

      {/* Advanced Filter Accordion Toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full flex items-center justify-between text-xs font-bold text-brand-700 pt-2 border-t border-slate-100"
      >
        <span>{showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}
        />
      </button>

      {showAdvanced && (
        <div className="space-y-5 pt-2 animate-in fade-in duration-200">
          {/* Furnishing */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Furnishing
            </label>
            <select
              value={filters.furnishing || 'All'}
              onChange={(e) => onChange({ furnishing: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="All">Any Furnishing</option>
              {FURNISHING_STATUS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Possession Status */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Possession Status
            </label>
            <select
              value={filters.possession || 'All'}
              onChange={(e) => onChange({ possession: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="All">Any Status</option>
              {POSSESSION_STATUS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Verified Only Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="verifiedOnly"
              checked={!!filters.verifiedOnly}
              onChange={(e) => onChange({ verifiedOnly: e.target.checked })}
              className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
            />
            <label htmlFor="verifiedOnly" className="text-xs font-bold text-slate-700 cursor-pointer">
              Verified Properties Only
            </label>
          </div>

          {/* Amenities Multi-Checkboxes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Key Amenities
            </label>
            <div className="grid grid-cols-1 gap-2">
              {AMENITIES_LIST.slice(0, 6).map((amenity) => {
                const checked = (filters.amenities || []).includes(amenity.name);
                return (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity.name)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium border text-left transition-colors ${
                      checked
                        ? 'bg-brand-50 border-brand-300 text-brand-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{amenity.name}</span>
                    {checked && <Check className="w-3.5 h-3.5 text-brand-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
