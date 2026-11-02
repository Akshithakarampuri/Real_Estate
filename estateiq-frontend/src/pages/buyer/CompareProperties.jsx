import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { propertyService } from '../../services/propertyService';
import { formatPrice, formatArea } from '../../utils/formatters';
import { EmptyState } from '../../components/common/EmptyState';
import { Scale, X, Check, ArrowRight, Bed, Bath, Maximize2 } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const CompareProperties = () => {
  const { compareList, removeFromCompare, clearCompare } = useApp();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const promises = compareList.map((id) =>
          propertyService.getPropertyById(id).catch(() => null)
        );
        const results = await Promise.all(promises);
        if (isMounted) {
          setProperties(results.filter(Boolean));
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (compareList.length > 0) {
      load();
    } else {
      setProperties([]);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [compareList]);

  if (properties.length < 2 && !loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          icon="search"
          title="Compare Properties"
          description="Select at least 2 properties (up to 4) using the 'Compare' button on any property card to view side-by-side specs."
          actionLabel="Browse Properties"
          onAction={() => window.location.assign('/properties')}
        />
      </div>
    );
  }

  const features = [
    { label: 'Price', render: (p) => <strong className="text-brand-700 font-black">{formatPrice(p.price)}</strong> },
    { label: 'City & Location', render: (p) => `${p.location}, ${p.city}` },
    { label: 'Configuration', render: (p) => `${p.bhk} BHK (${p.bathrooms} Baths)` },
    { label: 'Super Built-up Area', render: (p) => formatArea(p.area) },
    { label: 'Price per sq.ft', render: (p) => `₹${Math.round(p.price / p.area).toLocaleString('en-IN')}` },
    { label: 'Property Type', render: (p) => p.propertyType },
    { label: 'Furnishing', render: (p) => p.furnishing || 'Semi-Furnished' },
    { label: 'Parking Spaces', render: (p) => p.parking || '2 Covered' },
    { label: 'Possession', render: (p) => p.possession || 'Ready to Move' },
    {
      label: 'Top Amenities',
      render: (p) => (
        <div className="flex flex-wrap gap-1">
          {p.amenities?.slice(0, 4).map((a, i) => (
            <span key={i} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
              {a}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
            <Scale className="w-3.5 h-3.5" />
            <span>Side-by-Side Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Compare Selected Properties
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Comparing <strong>{properties.length}</strong> properties
          </p>
        </div>

        <button
          onClick={clearCompare}
          className="btn-secondary text-xs px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 hover:border-rose-200"
        >
          Clear All ({properties.length})
        </button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">
              <th className="p-4 w-48 text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Parameters
              </th>
              {properties.map((prop) => (
                <th key={prop.id} className="p-4 min-w-[260px] max-w-xs align-top">
                  <div className="relative group">
                    <button
                      onClick={() => removeFromCompare(prop.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md transition-colors z-10"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <img
                      src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'}
                      alt={prop.title}
                      className="w-full h-36 object-cover rounded-xl mb-2"
                    />
                    <Link
                      to={`/properties/${prop.id}`}
                      className="text-xs font-bold text-slate-900 hover:text-brand-600 line-clamp-1 block"
                    >
                      {prop.title}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {features.map((feat, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                <td className="p-4 font-bold text-slate-900 bg-slate-50/50">{feat.label}</td>
                {properties.map((prop) => (
                  <td key={prop.id} className="p-4">
                    {feat.render(prop)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-slate-50">
              <td className="p-4 font-bold text-slate-900">Action</td>
              {properties.map((prop) => (
                <td key={prop.id} className="p-4">
                  <Link
                    to={`/properties/${prop.id}`}
                    className="btn-primary text-xs py-2 px-4 rounded-xl block text-center"
                  >
                    View Details
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
