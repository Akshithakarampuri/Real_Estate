import React, { useState, useEffect } from 'react';
import { aiService } from '../../services/aiService';
import {
  PriceTrendHistoricalChart,
  PropertyTypePieChart,
} from '../../components/charts/MarketTrendCharts';
import { TrendingUp, ArrowUpRight, BarChart3, Building, ShieldCheck, Flame, RefreshCw, MapPin } from 'lucide-react';
import { MOCK_MARKET_TRENDS } from '../../utils/mockData';

export const MarketTrends = () => {
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('All');

  const loadTrends = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await aiService.getMarketTrends();
      if (data && data.cities) {
        setTrends(data);
      } else {
        setTrends(MOCK_MARKET_TRENDS);
      }
    } catch (err) {
      console.error('Failed to load market trends', err);
      setTrends(MOCK_MARKET_TRENDS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrends();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600 mx-auto"></div>
        <p className="text-sm font-semibold text-slate-700 mt-4">Synthesizing macro real estate trends...</p>
        <p className="text-xs text-slate-400 mt-1">Aggregating historical registry indices and inventory velocity</p>
      </div>
    );
  }

  const currentTrends = trends || MOCK_MARKET_TRENDS;
  const filteredCities = selectedCity === 'All'
    ? currentTrends.cities
    : currentTrends.cities.filter((c) => c.city.toLowerCase().includes(selectedCity.toLowerCase()));

  const hotLocalities = currentTrends.hotLocalities || [
    { locality: 'Worli Sea Face, Mumbai', growth: '+14.2% YoY', avgSqft: '₹42,000' },
    { locality: 'Golf Course Ext, Gurgaon', growth: '+13.6% YoY', avgSqft: '₹15,800' },
    { locality: 'Hitec City, Hyderabad', growth: '+15.1% YoY', avgSqft: '₹9,400' },
    { locality: 'Salt Lake Sector V, Kolkata', growth: '+8.9% YoY', avgSqft: '₹7,200' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Real Estate Market Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            India Macro Real Estate Trends 2026
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Comprehensive historical price index, capital appreciation rates, and city inventory velocities
          </p>
        </div>

        <button
          onClick={loadTrends}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Refresh Analytics</span>
        </button>
      </div>

      {/* Hot Localities Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {hotLocalities.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                Hot Micro-Market
              </span>
              <span className="text-xs font-black text-emerald-600">{item.growth}</span>
            </div>
            <div className="text-sm font-bold text-slate-900 truncate">{item.locality}</div>
            <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
              <span>Avg Rate:</span>
              <span className="font-bold text-slate-800">{item.avgSqft}</span>
            </div>
          </div>
        ))}
      </div>

      {/* City Snapshot Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              City Market Index & Capital Growth
            </h3>
            <p className="text-[11px] text-slate-500">Live transaction velocities across key Indian metropolitan corridors</p>
          </div>

          {/* City Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Kolkata', 'Bangalore', 'Pune'].map((cityName) => (
              <button
                key={cityName}
                onClick={() => setSelectedCity(cityName)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedCity === cityName
                    ? 'bg-brand-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase">
              <tr>
                <th className="p-3.5">Metro Market</th>
                <th className="p-3.5">Avg Price / sq.ft</th>
                <th className="p-3.5">YoY Capital Growth</th>
                <th className="p-3.5">Demand Index</th>
                <th className="p-3.5">Inventory Supply</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {filteredCities.map((city) => (
                <tr key={city.city} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                    <span>{city.city}</span>
                  </td>
                  <td className="p-3.5 text-brand-700 font-bold">
                    ₹{city.avgPriceSqft?.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center text-emerald-600 font-bold">
                      <ArrowUpRight className="w-3.5 h-3.5" />+{city.yoyGrowth}%
                    </span>
                  </td>
                  <td className="p-3.5">{city.demandScore} / 100</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        city.supplyRatio === 'Tight' || city.supplyRatio === 'Scarce'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {city.supplyRatio}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Historical Price Chart (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">5-Year Price Appreciation Trends (2022 - 2026)</h3>
              <p className="text-xs text-slate-500">Average price per square foot across top metros</p>
            </div>
          </div>
          <PriceTrendHistoricalChart data={currentTrends.priceHistory} />
        </div>

        {/* Property Type Pie (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Buyer Demand by Unit Type</h3>
            <p className="text-xs text-slate-500">National distribution of property transactions</p>
          </div>
          <PropertyTypePieChart data={currentTrends.propertyTypeBreakdown} />
        </div>
      </div>
    </div>
  );
};
