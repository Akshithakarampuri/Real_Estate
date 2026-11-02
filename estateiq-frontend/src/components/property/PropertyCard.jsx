import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, CheckCircle2, Bed, Bath, Maximize2, MapPin, Sparkles, Scale, Phone } from 'lucide-react';
import { formatPrice, formatArea } from '../../utils/formatters';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';

export const PropertyCard = ({ property, layout = 'grid' }) => {
  const { isFavorite, toggleFavorite, isInCompare, addToCompare, removeFromCompare } = useApp();

  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);

  const mainImage = property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800';

  if (layout === 'list') {
    return (
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="card-premium flex flex-col md:flex-row overflow-hidden group border border-slate-200/90"
      >
        {/* Left Image */}
        <div className="relative md:w-80 h-56 md:h-auto shrink-0 overflow-hidden">
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {property.verified && (
              <span className="inline-flex items-center gap-1 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified
              </span>
            )}
            <span className="inline-block bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
              {property.propertyType}
            </span>
          </div>

          <button
            onClick={() => toggleFavorite(property.id, property.title)}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
              favorited
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
            }`}
            title="Save to Favorites"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Right Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-2xl font-black text-brand-700 tracking-tight">
                  {formatPrice(property.price)}
                </span>
                <span className="text-xs text-slate-400 font-medium ml-2">
                  (₹{Math.round(property.price / property.area).toLocaleString('en-IN')}/sq.ft)
                </span>
              </div>
              {property.matchPercentage && (
                <span className="inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {property.matchPercentage}% AI Match
                </span>
              )}
            </div>

            <Link to={`/properties/${property.id}`} className="block mt-2">
              <h3 className="text-lg font-bold text-slate-900 hover:text-brand-600 transition-colors line-clamp-1">
                {property.title}
              </h3>
            </Link>

            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{property.location}, {property.city}</span>
            </div>

            {/* Spec Chips */}
            <div className="flex items-center gap-6 mt-4 py-3 border-y border-slate-100 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-brand-600" />
                <span>{property.bhk} BHK</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-brand-600" />
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-brand-600" />
                <span>{formatArea(property.area)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="mt-4 flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <img
                src={property.agent?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                alt="Agent"
                className="w-7 h-7 rounded-full object-cover border"
              />
              <span className="text-xs text-slate-600 font-semibold truncate max-w-[140px]">
                {property.agent?.name || property.seller?.name || 'Verified Seller'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => (compared ? removeFromCompare(property.id) : addToCompare(property.id, property.title))}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors ${
                  compared ? 'bg-slate-900 text-white border-slate-900' : 'text-slate-600 hover:bg-slate-100 border-slate-200'
                }`}
                title="Compare"
              >
                <Scale className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{compared ? 'Compared' : 'Compare'}</span>
              </button>

              <Link
                to={`/properties/${property.id}`}
                className="btn-primary text-xs px-4 py-2 rounded-xl"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid Card Layout
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="card-premium flex flex-col h-full overflow-hidden group border border-slate-200/90"
    >
      {/* Property Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-100">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
          {property.verified && (
            <span className="inline-flex items-center gap-1 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified
            </span>
          )}
          <span className="inline-block bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
            {property.propertyType}
          </span>
        </div>

        {/* Action Buttons: Favorite & Compare */}
        <div className="absolute top-3.5 right-3.5 flex flex-col gap-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(property.id, property.title);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm ${
              favorited
                ? 'bg-rose-500 text-white'
                : 'bg-white/85 text-slate-700 hover:bg-white hover:text-rose-500'
            }`}
            title="Save Favorite"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              compared ? removeFromCompare(property.id) : addToCompare(property.id, property.title);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm ${
              compared
                ? 'bg-slate-900 text-white'
                : 'bg-white/85 text-slate-700 hover:bg-white hover:text-slate-900'
            }`}
            title="Compare Property"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* AI Match Badge (if available) */}
        {property.matchPercentage && (
          <div className="absolute bottom-3.5 left-3.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-white/95 text-slate-900 backdrop-blur-md shadow-sm border border-slate-200">
              <Sparkles className="w-3 h-3 text-amber-500" />
              {property.matchPercentage}% AI Match
            </span>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-black text-brand-700 tracking-tight">
              {formatPrice(property.price)}
            </div>
            <div className="text-[11px] font-semibold text-slate-400">
              ₹{Math.round(property.price / property.area).toLocaleString('en-IN')}/sq.ft
            </div>
          </div>

          {/* Title */}
          <Link to={`/properties/${property.id}`} className="block mt-1.5">
            <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{property.location}, {property.city}</span>
          </div>

          {/* Spec Grid */}
          <div className="grid grid-cols-3 gap-2 py-3.5 my-3.5 border-y border-slate-100 text-center">
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-1 text-xs font-bold text-slate-800">
                <Bed className="w-3.5 h-3.5 text-brand-600" />
                {property.bhk} BHK
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-100">
              <span className="flex items-center gap-1 text-xs font-bold text-slate-800">
                <Bath className="w-3.5 h-3.5 text-brand-600" />
                {property.bathrooms}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">Baths</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-1 text-xs font-bold text-slate-800">
                <Maximize2 className="w-3.5 h-3.5 text-brand-600" />
                {property.area}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">sq.ft</span>
            </div>
          </div>
        </div>

        {/* Footer info: Seller/Agent + View CTA */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <img
              src={property.agent?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
              alt="Agent"
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <div className="text-[11px] font-semibold text-slate-600 truncate max-w-[100px]">
              {property.agent?.name || property.seller?.name || 'Verified Seller'}
            </div>
          </div>

          <Link
            to={`/properties/${property.id}`}
            className="btn-primary text-xs px-3.5 py-1.5 rounded-xl shadow-none"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
