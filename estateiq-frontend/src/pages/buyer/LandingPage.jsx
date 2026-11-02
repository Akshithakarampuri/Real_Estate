import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { PropertyCard } from '../../components/property/PropertyCard';
import { CITIES, PROPERTY_TYPES, BHK_OPTIONS } from '../../utils/constants';
import {
  Search,
  MapPin,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  Award,
  ArrowRight,
  TrendingUp,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search state
  const [activeTab, setActiveTab] = useState('buy'); // buy or rent
  const [location, setLocation] = useState('All');
  const [propertyType, setPropertyType] = useState('All');
  const [bhk, setBhk] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const res = await propertyService.getProperties({ limit: 6, sort: 'recommended' });
        if (isMounted) setFeatured(res.properties);
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
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (location !== 'All') queryParams.append('location', location);
    if (propertyType !== 'All') queryParams.append('propertyType', propertyType);
    if (bhk !== 'All') queryParams.append('bhk', bhk);
    if (maxPrice) queryParams.append('maxPrice', maxPrice);
    navigate(`/properties?${queryParams.toString()}`);
  };

  const popularLocations = [
    { name: 'Mumbai', count: '1,240+ Listings', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600' },
    { name: 'Bangalore', count: '980+ Listings', img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600' },
    { name: 'Hyderabad', count: '740+ Listings', img: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600' },
    { name: 'Delhi NCR', count: '890+ Listings', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600' },
    { name: 'Pune', count: '520+ Listings', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600' },
    { name: 'Goa', count: '310+ Villas', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600' },
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Modern Architecture"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-12 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 backdrop-blur-md border border-brand-400/40 text-brand-300 text-xs font-bold mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI-Powered Real Estate Ecosystem</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]"
          >
            Find a place you'll <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              love to call home.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium"
          >
            Verified luxury apartments, penthouses, and botanical villas with automated price intelligence, title checks, and virtual walkthroughs.
          </motion.p>

          {/* Search Box Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/40 text-left max-w-4xl mx-auto"
          >
            {/* Buy / Rent Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('buy')}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                  activeTab === 'buy'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Buy Properties
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('rent')}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                  activeTab === 'rent'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Rent Homes
              </button>
            </div>

            {/* Main Form Fields */}
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Location */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="All">All Cities</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="All">All Types</option>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* BHK */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Bedrooms
                </label>
                <select
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="All">Any BHK</option>
                  {BHK_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b} BHK
                    </option>
                  ))}
                </select>
              </div>

              {/* Max Budget */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Budget (Max)
                </label>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="">Any Budget</option>
                  <option value="5000000">Up to ₹50 Lac</option>
                  <option value="10000000">Up to ₹1.0 Cr</option>
                  <option value="20000000">Up to ₹2.0 Cr</option>
                  <option value="35000000">Up to ₹3.5 Cr</option>
                  <option value="50000000">Up to ₹5.0 Cr+</option>
                </select>
              </div>

              {/* Search Submit */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full btn-primary text-xs py-3 rounded-xl font-bold flex items-center justify-center gap-2 h-[41px]"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Homes</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 2. POPULAR LOCATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Prime Metro Markets
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Explore Popular Locations
            </h2>
          </div>
          <Link
            to="/properties"
            className="hidden sm:flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            <span>View All Cities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularLocations.map((loc) => (
            <Link
              key={loc.name}
              to={`/properties?location=${loc.name}`}
              className="group relative h-48 rounded-2xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300"
            >
              <img
                src={loc.img}
                alt={loc.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h4 className="font-bold text-sm tracking-tight group-hover:text-brand-400 transition-colors">
                  {loc.name}
                </h4>
                <p className="text-[11px] text-slate-300 mt-0.5">{loc.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Handpicked Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Featured Luxury Properties
            </h2>
          </div>
          <Link
            to="/properties"
            className="flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            <span>Explore All Listings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden border border-slate-800 shadow-2xl">
          <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
              Commercial Grade Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2">Why Choose EstateIQ?</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              We replace guesswork with algorithmic precision, certified RERA verification, and trusted escrow agents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">100% Verified Properties</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every listing is physically audited and scanned against municipal land registry records.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">AI Price Intelligence</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Machine learning valuations compare square-foot transactions to prevent overpaying.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Trusted Sellers & Agents</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect only with licensed RERA certified brokers and verified property owners.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Seamless Visit Booking</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Schedule private physical or virtual walkthroughs with instant automated confirmations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-brand-900 to-navy-950 p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 border border-brand-500/30 shadow-2xl">
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Intelligent Lifestyle Engine</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">
              Find properties that match your lifestyle.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Whether you are a remote software architect looking for power backup and quiet spaces, or a growing family prioritizing top schools, our FastAPI AI engine personalizes every match.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/recommendations"
                className="btn-gold text-xs px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg"
              >
                <span>Get AI Recommendations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/market-trends"
                className="btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs px-5 py-3 rounded-xl"
              >
                Explore Market Trends
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full lg:max-w-md">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl font-black text-emerald-400">98.4%</div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Valuation Accuracy</div>
              <p className="text-[10px] text-slate-400 mt-0.5">Across 40+ sub-localities</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl font-black text-amber-400">4,200+</div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Verified Visits</div>
              <p className="text-[10px] text-slate-400 mt-0.5">Scheduled seamlessly</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl font-black text-teal-400">₹450 Cr+</div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Inventory Value</div>
              <p className="text-[10px] text-slate-400 mt-0.5">Under management</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl font-black text-blue-400">&lt; 2 Hrs</div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Agent Response</div>
              <p className="text-[10px] text-slate-400 mt-0.5">Direct inquiry SLAs</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Client Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Loved by Buyers and Sellers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-subtle space-y-4">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "EstateIQ's AI price estimate prevented us from overbidding on a Bandra apartment by ₹25 Lakhs. The site visit was confirmed in minutes."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                alt="Client"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <div className="text-xs font-bold text-slate-900">Ananya Deshmukh</div>
                <div className="text-[10px] text-slate-400">Homebuyer, Mumbai</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-subtle space-y-4">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "As a seller in Bangalore, the 6-step listing wizard with automated Cloudinary image scoring made my Whitefield villa look world-class."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100"
                alt="Client"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <div className="text-xs font-bold text-slate-900">Ramesh Kulkarni</div>
                <div className="text-[10px] text-slate-400">Villa Owner, Bengaluru</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-subtle space-y-4">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "The Agent CRM Kanban pipeline lets me manage 30+ buyers simultaneously. Closing high-value penthouses has never been this smooth."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                alt="Client"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <div className="text-xs font-bold text-slate-900">Vikram Singhania</div>
                <div className="text-[10px] text-slate-400">Luxury Realty Broker</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
