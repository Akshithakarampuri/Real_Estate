import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { formatPrice } from '../../utils/formatters';
import { Building, Phone, BarChart3, Eye, ArrowUpRight } from 'lucide-react';

export const AgentListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const res = await propertyService.getProperties();
        if (isMounted) setProperties(res.properties);
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
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          <Building className="w-3.5 h-3.5" />
          <span>Assigned Inventory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Managed Broker Listings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Properties under your certified agency representation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div
            key={p.id}
            className="card-premium overflow-hidden border border-slate-200 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full bg-slate-100">
                <img
                  src={p.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {p.propertyType}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="text-xl font-black text-brand-700">
                  {formatPrice(p.price)}
                </div>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{p.title}</h3>
                <div className="text-xs text-slate-500">{p.location}, {p.city}</div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mt-3 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Seller:</span>
                    <span className="font-bold text-slate-900">{p.seller?.name || 'Aarav Oberoi'}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Direct Phone:</span>
                    <span className="font-mono text-brand-600 font-bold">{p.seller?.phone || '+91 98211 99887'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <Link
                to={`/seller/properties/${p.id}/analytics`}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Analytics</span>
              </Link>

              <Link
                to={`/properties/${p.id}`}
                className="btn-primary text-xs px-3.5 py-1.5 rounded-xl"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
