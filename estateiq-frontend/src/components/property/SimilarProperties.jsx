import React, { useEffect, useState } from 'react';
import { PropertyCard } from './PropertyCard';
import { aiService } from '../../services/aiService';
import { Sparkles } from 'lucide-react';

export const SimilarProperties = ({ currentPropertyId }) => {
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const recs = await aiService.getRecommendations();
        if (isMounted) {
          setSimilar(recs.filter((p) => p.id !== currentPropertyId).slice(0, 3));
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
  }, [currentPropertyId]);

  if (loading || similar.length === 0) return null;

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <h3 className="text-xl font-extrabold text-slate-900">Similar AI Recommended Homes</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similar.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
    </div>
  );
};
