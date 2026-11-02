import React, { useState, useEffect } from 'react';
import { propertyService } from '../../services/propertyService';
import { PropertyMapView } from '../../components/maps/PropertyMapView';
import { PropertyCard } from '../../components/property/PropertyCard';
import { MapPin, Sparkles } from 'lucide-react';

export const MapPage = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const res = await propertyService.getProperties({ limit: 20 });
        if (isMounted) {
          setProperties(res.properties);
          setSelectedProperty(res.properties[0] || null);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Interactive Cartography</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Geographic Property Explorer
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Inspect price clusters, radius distances, and metro corridors in real-time
          </p>
        </div>
      </div>

      {/* Main Interactive Map View */}
      <PropertyMapView
        properties={properties}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
      />

      {/* Selected Property Spotlight */}
      {selectedProperty && (
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900">Pin Spotlight</h3>
          </div>
          <div className="max-w-2xl">
            <PropertyCard property={selectedProperty} layout="list" />
          </div>
        </div>
      )}
    </div>
  );
};
