import React from 'react';
import { PropertyCard } from '../property/PropertyCard';
import { formatExactCurrency } from '../../utils/formatters';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export const Step6Preview = ({ formData }) => {
  const previewProperty = {
    id: 'PREVIEW_ID',
    title: formData.title || 'Untitled Luxury Residence',
    price: formData.price || 15000000,
    location: formData.location || 'Bandra West',
    city: formData.city || 'Mumbai',
    bhk: formData.bhk || 3,
    bathrooms: formData.bathrooms || 3,
    area: formData.area || 1850,
    propertyType: formData.propertyType || 'Apartment',
    verified: false, // New properties await admin verification
    featured: false,
    images: formData.images?.length > 0
      ? formData.images
      : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200'],
    amenities: formData.amenities || ['24/7 Security', 'Elevator', 'Power Backup'],
    description: formData.description || 'Spacious modern home.',
    status: 'pending',
    viewsCount: 0,
    matchPercentage: 92,
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Trust & Safety Submission Notice:</span>
          <p className="mt-0.5 text-amber-800 leading-relaxed">
            Upon submission, your listing will undergo automated AI fraud inspection and title screening before public activation on the marketplace.
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Marketplace Card Preview
        </h4>
        <div className="max-w-md mx-auto">
          <PropertyCard property={previewProperty} />
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 text-xs">
        <h5 className="font-bold text-slate-900">Submission Summary</h5>
        <div className="grid grid-cols-2 gap-2 text-slate-600">
          <div>Title: <strong className="text-slate-900">{previewProperty.title}</strong></div>
          <div>Price: <strong className="text-brand-700">{formatExactCurrency(previewProperty.price)}</strong></div>
          <div>Location: <strong className="text-slate-900">{previewProperty.location}, {previewProperty.city}</strong></div>
          <div>Configuration: <strong className="text-slate-900">{previewProperty.bhk} BHK • {previewProperty.area} sq.ft</strong></div>
          <div>Uploaded Photos: <strong className="text-slate-900">{previewProperty.images.length} images</strong></div>
          <div>Amenities: <strong className="text-slate-900">{previewProperty.amenities.length} selected</strong></div>
        </div>
      </div>
    </div>
  );
};
