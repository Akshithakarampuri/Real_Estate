import React from 'react';
import { AMENITIES_LIST } from '../../utils/constants';
import { Check } from 'lucide-react';

export const Step4Amenities = ({ formData, updateFormData }) => {
  const selectedAmenities = formData.amenities || [];

  const toggleAmenity = (name) => {
    const next = selectedAmenities.includes(name)
      ? selectedAmenities.filter((a) => a !== name)
      : [...selectedAmenities, name];
    updateFormData({ amenities: next });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-bold text-slate-900">Select Available Society & Home Amenities</h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Listings with 5 or more verified amenities receive 2.4x higher buyer inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {AMENITIES_LIST.map((amenity) => {
          const isSelected = selectedAmenities.includes(amenity.name);
          return (
            <button
              key={amenity.id}
              type="button"
              onClick={() => toggleAmenity(amenity.name)}
              className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                isSelected
                  ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="text-xs font-semibold">{amenity.name}</div>
                <div className="text-[10px] text-slate-400 font-normal">{amenity.category}</div>
              </div>
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                  isSelected
                    ? 'bg-brand-600 border-brand-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
