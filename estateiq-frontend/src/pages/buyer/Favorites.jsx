import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { propertyService } from '../../services/propertyService';
import { PropertyGrid } from '../../components/property/PropertyGrid';
import { EmptyState } from '../../components/common/EmptyState';
import { Heart, ArrowRight } from 'lucide-react';

export const Favorites = () => {
  const { favorites } = useApp();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const promises = favorites.map((id) =>
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

    load();
    return () => {
      isMounted = false;
    };
  }, [favorites]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Saved Collection</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Favorite Properties
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          You have saved <strong>{properties.length}</strong> properties
        </p>
      </div>

      {properties.length === 0 && !loading ? (
        <EmptyState
          icon="heart"
          title="You haven't saved any properties yet."
          description="Click the heart icon on any property to save it to your wishlist and receive price drop alerts."
          actionLabel="Browse Verified Homes"
          onAction={() => window.location.assign('/properties')}
        />
      ) : (
        <PropertyGrid properties={properties} loading={loading} layout="grid" />
      )}
    </div>
  );
};
