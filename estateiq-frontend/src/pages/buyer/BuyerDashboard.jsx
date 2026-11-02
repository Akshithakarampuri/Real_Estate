import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { propertyService } from '../../services/propertyService';
import { bookingService } from '../../services/bookingService';
import { PropertyCard } from '../../components/property/PropertyCard';
import {
  Heart,
  Calendar,
  Sparkles,
  Clock,
  Search,
  Bell,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const BuyerDashboard = () => {
  const { user } = useAuth();
  const { favorites } = useApp();

  const [recommended, setRecommended] = useState([]);
  const [upcomingVisits, setUpcomingVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const [propsRes, bookingsRes] = await Promise.all([
          propertyService.getProperties({ limit: 3, sort: 'recommended' }),
          bookingService.getBookings(),
        ]);
        if (isMounted) {
          setRecommended(propsRes.properties);
          setUpcomingVisits(bookingsRes.slice(0, 2));
        }
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

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-900 to-navy-900 p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">
            Buyer Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome back, {user?.name || 'Valued Buyer'}!
          </h1>
          <p className="text-xs text-slate-300">
            You have <strong>{favorites.length}</strong> saved homes, <strong>{upcomingVisits.length}</strong> upcoming visits scheduled, and new AI matches available.
          </p>
        </div>

        <Link
          to="/properties"
          className="btn-gold text-xs px-5 py-3 rounded-xl font-bold flex items-center gap-2 shrink-0 shadow-lg"
        >
          <Search className="w-4 h-4" />
          <span>Browse New Listings</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Favorites</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{favorites.length}</div>
            <Link to="/favorites" className="text-[11px] text-brand-600 font-bold hover:underline">
              View Wishlist →
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Heart className="w-6 h-6 fill-current" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Upcoming Visits</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{upcomingVisits.length}</div>
            <Link to="/bookings" className="text-[11px] text-brand-600 font-bold hover:underline">
              Manage Bookings →
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Saved Searches</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">2 Active</div>
            <span className="text-[11px] text-slate-400">Gachibowli & Worli</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Market Index</span>
            <div className="text-2xl font-black text-emerald-600 mt-0.5">+12.4%</div>
            <Link to="/market-trends" className="text-[11px] text-brand-600 font-bold hover:underline">
              View Trends →
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Upcoming Visits Row */}
      {upcomingVisits.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-600" />
              <h3 className="text-base font-bold text-slate-900">Next Scheduled Walkthroughs</h3>
            </div>
            <Link to="/bookings" className="text-xs font-bold text-brand-600 hover:underline">
              View All Visits
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingVisits.map((v) => (
              <div
                key={v.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-4"
              >
                <img
                  src={v.propertyImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300'}
                  alt="Property"
                  className="w-16 h-14 rounded-xl object-cover"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{v.propertyTitle}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    <span>📅 {v.date}</span>
                    <span>⏰ {v.time}</span>
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {v.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommended Homes */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Neural Lifestyle Scoring
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">Recommended for You</h3>
          </div>
          <Link
            to="/recommendations"
            className="flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            <span>Personalize Matches</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommended.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </div>
    </div>
  );
};
