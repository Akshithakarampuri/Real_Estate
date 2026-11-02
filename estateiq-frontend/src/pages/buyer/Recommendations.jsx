import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { aiService } from '../../services/aiService';
import { formatPrice, formatArea } from '../../utils/formatters';
import { useApp } from '../../context/AppContext';
import { Sparkles, CheckCircle2, Heart, ArrowRight, Bed, Bath, Maximize2, MapPin } from 'lucide-react';

export const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [lifestyle, setLifestyle] = useState('all');
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useApp();

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await aiService.getRecommendations('usr_buyer', lifestyle);
        if (isMounted) setRecommendations(res);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [lifestyle]);

  const personaFilters = [
    { id: 'all', label: 'All AI Matches', desc: 'Holistic profile score' },
    { id: 'remote_work', label: 'Remote Architect', desc: 'Power backup & quiet clubhouse' },
    { id: 'family', label: 'Growing Family', desc: '3+ BHK & kids play zones' },
    { id: 'luxury', label: 'Luxury Investor', desc: 'High rental yield & sea/golf views' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-950 via-slate-900 to-navy-950 p-8 sm:p-10 text-white border border-brand-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>AI Neural Recommendation Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Curated Exclusively for You
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our recommendation model correlates your saved searches, price brackets, and transit needs with verified inventory.
          </p>
        </div>
      </div>

      {/* Lifestyle Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {personaFilters.map((p) => (
          <button
            key={p.id}
            onClick={() => setLifestyle(p.id)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              lifestyle === p.id
                ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-500/20 shadow-sm'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className={`text-xs font-bold ${lifestyle === p.id ? 'text-brand-900' : 'text-slate-900'}`}>
              {p.label}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{p.desc}</div>
          </button>
        ))}
      </div>

      {/* Recommendations Feed */}
      <div className="space-y-6">
        {recommendations.map((property) => {
          const favorited = isFavorite(property.id);
          return (
            <div
              key={property.id}
              className="card-premium p-6 flex flex-col lg:flex-row gap-6 items-center border border-slate-200"
            >
              {/* Image */}
              <div className="relative w-full lg:w-80 h-56 rounded-2xl overflow-hidden shrink-0">
                <img
                  src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {property.propertyType}
                </div>
                <button
                  onClick={() => toggleFavorite(property.id, property.title)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                    favorited ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Details & AI Reasons */}
              <div className="flex-1 space-y-4 w-full">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <span className="text-2xl font-black text-brand-700">
                      {formatPrice(property.price)}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold ml-2">
                      ({formatArea(property.area)})
                    </span>
                    <Link to={`/properties/${property.id}`} className="block mt-1">
                      <h3 className="text-lg font-bold text-slate-900 hover:text-brand-600 transition-colors">
                        {property.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{property.location}, {property.city}</span>
                    </div>
                  </div>

                  {/* AI Match Badge */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-1">
                    <span className="inline-flex items-center gap-1 text-sm font-black px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      {property.matchPercentage || 95}% Match
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      High Lifestyle Alignment
                    </span>
                  </div>
                </div>

                {/* Why it matches */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Why our AI recommended this:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {property.matchReasons?.map((reason, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{reason}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4 text-xs text-slate-600 font-semibold">
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-brand-600" />
                      {property.bhk} BHK
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-brand-600" />
                      {property.bathrooms} Baths
                    </span>
                  </div>

                  <Link
                    to={`/properties/${property.id}`}
                    className="btn-primary text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 font-bold"
                  >
                    <span>View Listing Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
