import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, CheckCircle, Bed, Bath, Maximize2, X } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { useApp } from '../../context/AppContext';

export const MapMarkerCard = ({ property, onClose }) => {
  const { isFavorite, toggleFavorite } = useApp();
  const favorited = isFavorite(property.id);

  return (
    <div className="w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <div className="relative h-36 w-full">
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => toggleFavorite(property.id, property.title)}
          className={`absolute top-2 left-2 p-1.5 rounded-full backdrop-blur-md transition-all ${
            favorited ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-700'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-baseline">
          <div className="text-lg font-black text-brand-700">
            {formatPrice(property.price)}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {property.propertyType}
          </span>
        </div>

        <Link
          to={`/properties/${property.id}`}
          className="block text-xs font-bold text-slate-900 hover:text-brand-600 truncate"
        >
          {property.title}
        </Link>

        <div className="text-[11px] text-slate-500 truncate">
          {property.location}, {property.city}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-600 font-semibold">
          <div className="flex items-center gap-1">
            <Bed className="w-3.5 h-3.5 text-brand-600" />
            <span>{property.bhk} BHK</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5 text-brand-600" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5 text-brand-600" />
            <span>{property.area} sqft</span>
          </div>
        </div>

        <Link
          to={`/properties/${property.id}`}
          className="block w-full text-center py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white transition-colors mt-2"
        >
          View Full Details
        </Link>
      </div>
    </div>
  );
};
