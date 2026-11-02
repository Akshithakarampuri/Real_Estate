import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { aiService } from '../../services/aiService';
import { formatPrice, formatArea } from '../../utils/formatters';
import {
  Sparkles,
  Calculator,
  TrendingUp,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Bed,
  Layers,
  Activity,
  Sliders,
  DollarSign
} from 'lucide-react';

export const PricePredictor = () => {
  const [city, setCity] = useState('Mumbai');
  const [location, setLocation] = useState('Bandra West');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [bhk, setBhk] = useState(3);
  const [area, setArea] = useState(1650);
  const [age, setAge] = useState('1-5 Years');
  const [selectedAmenities, setSelectedAmenities] = useState([
    'Swimming Pool',
    'Fitness Gym',
    '100% Power Backup',
    'Reserved Parking'
  ]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const cityOptions = ['Mumbai', 'Delhi NCR', 'Gurgaon', 'Hyderabad', 'Kolkata', 'Bangalore', 'Pune', 'Goa'];
  const popularLocalities = {
    Mumbai: ['Bandra West', 'Worli Sea Face', 'Powai', 'Lower Parel', 'Juhu'],
    Gurgaon: ['Sector 84', 'Sector 66', 'Golf Course Ext', 'DLF Phase 5', 'Sector 81'],
    'Delhi NCR': ['Golf Course Road', 'Vasant Kunj', 'Greater Kailash', 'Noida Expressway'],
    Hyderabad: ['Hitec City', 'Gachibowli', 'Nanakramguda', 'Madhapur', 'Kondapur'],
    Kolkata: ['Salt Lake Sector V', 'EM Bypass', 'New Town', 'Ballygunge', 'New Alipore'],
    Bangalore: ['Whitefield', 'Indiranagar', 'Koramangala', 'Sarjapur Road'],
    Pune: ['Koregaon Park', 'Kalyani Nagar', 'Baner', 'Hinjewadi'],
    Goa: ['Candolim', 'Panaji', 'Assagao', 'Anjuna'],
  };

  const amenityOptions = [
    'Swimming Pool',
    'Fitness Gym',
    '100% Power Backup',
    'Reserved Parking',
    'Clubhouse & Lounge',
    '24/7 Security & CCTV',
    'High-speed Elevators',
    'Private Garden / Terrace',
    'Feng Shui / Vaastu Compliant',
    'Rain Water Harvesting'
  ];

  const toggleAmenity = (name) => {
    if (selectedAmenities.includes(name)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== name));
    } else {
      setSelectedAmenities([...selectedAmenities, name]);
    }
  };

  const handlePredict = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const data = await aiService.predictPrice({
        city,
        location,
        area: Number(area),
        bhk: Number(bhk),
        propertyType,
        amenities: selectedAmenities,
      });
      setResult(data);
    } catch (err) {
      console.error('Failed to predict price', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-950 via-slate-900 to-navy-950 p-8 sm:p-12 text-white border border-brand-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>AI Valuation Intelligence Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Institutional Real Estate Price Predictor
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Estimate fair market valuation, price per square foot bands, and investment confidence calibrated against empirical 2026 property registry datasets across India.
          </p>
        </div>
      </div>

      {/* Main Grid: Form (Left) & Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Property Parameters</h3>
                <p className="text-xs text-slate-500">Provide unit attributes for accurate machine appraisal</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Live Model
            </span>
          </div>

          <form onSubmit={handlePredict} className="space-y-5">
            {/* City & Property Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Metro City
                </label>
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    const locs = popularLocalities[e.target.value] || [];
                    if (locs.length > 0) setLocation(locs[0]);
                  }}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                >
                  {cityOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                >
                  <option value="Apartment">Residential Apartment</option>
                  <option value="Penthouse">Luxury Penthouse</option>
                  <option value="Villa">Independent Villa</option>
                  <option value="Builder Floor">Independent Builder Floor</option>
                  <option value="Studio">Studio Apartment</option>
                </select>
              </div>
            </div>

            {/* Locality Input + Quick Chips */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Locality / Neighborhood
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bandra West, Golf Course Road..."
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              {/* Locality Quick Chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {(popularLocalities[city] || []).map((loc) => (
                  <button
                    type="button"
                    key={loc}
                    onClick={() => setLocation(loc)}
                    className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                      location === loc
                        ? 'bg-brand-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* BHK & Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  BHK Configuration
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBhk(b)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        bhk === b
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {b} BHK
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Super Built-up Area
                  </label>
                  <span className="text-xs font-black text-brand-700">{area} sq.ft.</span>
                </div>
                <input
                  type="range"
                  min="450"
                  max="6500"
                  step="50"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
              </div>
            </div>

            {/* Amenities Checklist */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Key Amenities Included ({selectedAmenities.length})
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                {amenityOptions.map((am) => {
                  const selected = selectedAmenities.includes(am);
                  return (
                    <button
                      type="button"
                      key={am}
                      onClick={() => toggleAmenity(am)}
                      className={`text-left p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                        selected
                          ? 'bg-brand-50 border-brand-500 text-brand-900'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate pr-1">{am}</span>
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 ${
                          selected ? 'text-brand-600 fill-brand-100' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-500/20"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>Computing AI Valuation...</span>
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4" />
                  <span>Calculate AI Valuation</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-5 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              {/* Valuation Card */}
              <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-brand-800/40 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-bold text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Estimated Fair Valuation
                  </span>
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {result.confidenceScore || 94}% Confidence
                  </span>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-black text-gold-400 tracking-tight">
                    {formatPrice(result.estimatedPrice)}
                  </div>
                  <div className="text-xs text-slate-300 font-semibold mt-1">
                    Estimated Range: {formatPrice(result.priceRange?.min)} – {formatPrice(result.priceRange?.max)}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 font-semibold block">Rate / sq.ft.</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">
                      ₹{(result.pricePerSqft || Math.round(result.estimatedPrice / area)).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 font-semibold block">Carpet Index</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">
                      {formatArea(area)}
                    </span>
                  </div>
                </div>

                {/* Factors List */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    AI Valuation Drivers
                  </span>
                  <div className="space-y-1.5">
                    {result.factors?.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Link
                    to={`/properties?location=${city}`}
                    className="btn-gold flex-1 text-xs py-2.5 rounded-xl font-bold text-center"
                  >
                    Browse Market Comps
                  </Link>
                  <Link
                    to="/seller/properties/new"
                    className="p-2.5 rounded-xl text-xs font-semibold text-center bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    List for Sale
                  </Link>
                </div>
              </div>

              {/* Comparable Properties from Dataset */}
              {result.comparables && result.comparables.length > 0 && (
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Recent Market Comparables ({city})
                  </h4>
                  <div className="space-y-3">
                    {result.comparables.map((comp) => (
                      <Link
                        key={comp.id}
                        to={`/properties/${comp.id}`}
                        className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-brand-500 hover:bg-slate-50/60 transition-all group"
                      >
                        <img
                          src={comp.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200'}
                          alt={comp.title}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-brand-600 truncate">
                            {comp.title}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{comp.location}, {comp.city}</span>
                          </div>
                          <div className="text-xs font-black text-brand-700 mt-1">
                            {formatPrice(comp.price)}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Empty Placeholder */
            <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-300 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
                <Calculator className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Instant Valuation Report</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Select your property parameters and click "Calculate AI Valuation" to generate institutional price intelligence.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handlePredict()}
                className="btn-primary text-xs px-5 py-2.5 rounded-xl font-bold inline-flex items-center gap-1.5"
              >
                <span>Run Demo Valuation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
