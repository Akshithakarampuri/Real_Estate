import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { PropertyGrid } from '../../components/property/PropertyGrid';
import { PropertyFilter } from '../../components/property/PropertyFilter';
import { PropertyMapView } from '../../components/maps/PropertyMapView';
import { SORT_OPTIONS } from '../../utils/constants';
import {
  LayoutGrid,
  List,
  Map as MapIcon,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from 'lucide-react';

export const PropertySearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state initialized from URL parameters
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || 'All',
    propertyType: searchParams.get('propertyType') || 'All',
    bhk: searchParams.get('bhk') || 'All',
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : '',
    furnishing: 'All',
    possession: 'All',
    amenities: [],
    verifiedOnly: false,
    sort: 'recommended',
    page: 1,
    limit: 6,
  });

  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // View mode: 'grid' | 'list' | 'map'
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Fetch properties whenever filters change
  useEffect(() => {
    let isMounted = true;
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await propertyService.getProperties(filters);
        if (isMounted) {
          setProperties(res.properties);
          setTotalPages(res.totalPages);
          setTotalCount(res.total);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchResults();
    return () => {
      isMounted = false;
    };
  }, [filters]);

  const handleFilterChange = (updated) => {
    setFilters((prev) => ({ ...prev, ...updated, page: 1 }));
  };

  const handleResetFilters = () => {
    setFilters({
      location: 'All',
      propertyType: 'All',
      bhk: 'All',
      maxPrice: '',
      furnishing: 'All',
      possession: 'All',
      amenities: [],
      verifiedOnly: false,
      sort: 'recommended',
      page: 1,
      limit: 6,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Explore Marketplace Listings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing <strong>{totalCount}</strong> verified properties across prime metro corridors
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-600" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange({ sort: e.target.value })}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* View Mode Controls */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'map' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Split Map View"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-28">
          <PropertyFilter
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div className="relative w-80 max-w-full bg-white h-full overflow-y-auto p-4 z-10 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm font-bold text-slate-900">Filter Properties</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <PropertyFilter
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
          </div>
        )}

        {/* Results Area */}
        <div className="lg:col-span-3 space-y-8">
          {viewMode === 'map' ? (
            <div className="space-y-6">
              <PropertyMapView properties={properties} />
              <h3 className="text-base font-bold text-slate-900">Listings in Selected Area</h3>
              <PropertyGrid
                properties={properties}
                loading={loading}
                layout="grid"
                onResetFilters={handleResetFilters}
              />
            </div>
          ) : (
            <PropertyGrid
              properties={properties}
              loading={loading}
              layout={viewMode}
              onResetFilters={handleResetFilters}
            />
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <button
                onClick={() => setFilters((f) => ({ ...f, page: Math.max(f.page - 1, 1) }))}
                disabled={filters.page === 1}
                className="btn-secondary text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="text-xs font-semibold text-slate-600">
                Page <span className="font-bold text-slate-900">{filters.page}</span> of {totalPages}
              </div>

              <button
                onClick={() => setFilters((f) => ({ ...f, page: Math.min(f.page + 1, totalPages) }))}
                disabled={filters.page === totalPages}
                className="btn-secondary text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 disabled:opacity-40"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
