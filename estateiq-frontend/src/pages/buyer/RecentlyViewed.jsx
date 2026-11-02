import React, { useState, useEffect } from 'react';
import { favoriteService } from '../../services/favoriteService';
import { propertyService } from '../../services/propertyService';
import { PropertyGrid } from '../../components/property/PropertyGrid';
import { EmptyState } from '../../components/common/EmptyState';
import { Clock } from 'lucide-react';

export const RecentlyViewed = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const recentIds = await favoriteService.getRecentlyViewed();
        const promises = recentIds.map((id) =>
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
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Browsing History</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Recently Viewed Properties
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Pick up right where you left off in your search
        </p>
      </div>

      {properties.length === 0 && !loading ? (
        <EmptyState
          icon="home"
          title="No browsing history yet"
          description="Properties you explore will automatically appear here for easy reference."
          actionLabel="Explore Properties"
          onAction={() => window.location.assign('/properties')}
        />
      ) : (
        <PropertyGrid properties={properties} loading={loading} layout="grid" />
      )}
    </div>
  );
};
