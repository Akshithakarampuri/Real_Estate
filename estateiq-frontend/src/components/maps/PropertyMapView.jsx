import React, { useState, useMemo } from 'react';
import { MapMarkerCard } from './MapMarkerCard';
import { formatPrice } from '../../utils/formatters';
import { Search, MapPin, Compass, Sliders, Layers, ZoomIn, ZoomOut } from 'lucide-react';

export const PropertyMapView = ({ properties = [], onSelectProperty }) => {
  const [selectedProperty, setSelectedProperty] = useState(properties[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [radius, setRadius] = useState(25);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeCity, setActiveCity] = useState('All');

  // Filter properties according to search & city
  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchCity = activeCity === 'All' || p.city === activeCity;
      const matchQuery =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCity && matchQuery;
    });
  }, [properties, activeCity, searchQuery]);

  // City center coordinates for the interactive view
  const cityPositions = {
    Mumbai: { x: 28, y: 55 },
    Bangalore: { x: 50, y: 75 },
    Hyderabad: { x: 55, y: 60 },
    'Delhi NCR': { x: 45, y: 25 },
    Pune: { x: 33, y: 58 },
    Goa: { x: 35, y: 72 },
  };

  return (
    <div className="relative w-full h-[700px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex flex-col select-none">
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Search & City Filter Bar */}
        <div className="pointer-events-auto flex items-center gap-2 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/80 max-w-md w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search neighborhood or property..."
              className="w-full bg-transparent pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <select
            value={activeCity}
            onChange={(e) => setActiveCity(e.target.value)}
            className="bg-slate-100 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 border-none focus:outline-none"
          >
            <option value="All">All Regions</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Pune">Pune</option>
            <option value="Goa">Goa</option>
          </select>
        </div>

        {/* Radius Pill */}
        <div className="pointer-events-auto flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200/80">
          <Sliders className="w-4 h-4 text-brand-600" />
          <span className="text-xs font-bold text-slate-700">Radius:</span>
          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="text-xs font-bold text-brand-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={25}>25 km</option>
            <option value={50}>50 km</option>
          </select>
        </div>
      </div>

      {/* Map Graphic Canvas / Fallback Interactive Cartography */}
      <div className="relative flex-1 bg-[#0b132b] overflow-hidden flex items-center justify-center">
        {/* Subtle Map Grid Lines */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#38bdf8 1px, #0b132b 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
        />

        {/* Decorative Roads / Topography Lines SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 50 100 Q 250 300 450 150 T 850 400" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6,6" />
          <path d="M 120 600 Q 350 400 650 550 T 1150 300" fill="none" stroke="#34d399" strokeWidth="2" />
          <path d="M 400 50 Q 550 350 500 700" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
          {/* Radius circle around selected */}
          {selectedProperty && (
            <circle
              cx="50%"
              cy="50%"
              r={radius * 5}
              fill="rgba(16, 185, 129, 0.08)"
              stroke="rgba(16, 185, 129, 0.4)"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
          )}
        </svg>

        {/* Pin Markers */}
        <div className="relative w-full h-full max-w-5xl max-h-[600px]">
          {filtered.map((prop, idx) => {
            const basePos = cityPositions[prop.city] || { x: 40 + idx * 8, y: 40 + idx * 5 };
            // Slight offset so multiple in same city don't completely overlap
            const left = `${basePos.x + ((idx % 3) - 1) * 7}%`;
            const top = `${basePos.y + (Math.floor(idx / 3) - 0.5) * 8}%`;
            const isSelected = selectedProperty?.id === prop.id;

            return (
              <div
                key={prop.id}
                style={{ left, top }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <button
                  onClick={() => {
                    setSelectedProperty(prop);
                    onSelectProperty?.(prop);
                  }}
                  className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full font-extrabold text-xs transition-all duration-200 shadow-xl ${
                    isSelected
                      ? 'bg-brand-500 text-white scale-110 ring-4 ring-brand-400/40 z-30'
                      : 'bg-white text-slate-900 hover:bg-brand-50 hover:scale-105 border border-slate-200'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-brand-600'}`} />
                  <span>{formatPrice(prop.price)}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Zoom Controls Bottom-Right */}
        <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
            className="p-2.5 rounded-xl bg-white/95 text-slate-800 shadow-lg hover:bg-white transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            className="p-2.5 rounded-xl bg-white/95 text-slate-800 shadow-lg hover:bg-white transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Active Property Preview Card Bottom-Left */}
        {selectedProperty && (
          <div className="absolute bottom-6 left-6 z-30">
            <MapMarkerCard
              property={selectedProperty}
              onClose={() => setSelectedProperty(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
