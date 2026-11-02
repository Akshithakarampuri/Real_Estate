import React from 'react';
import { PropertyCard } from './PropertyCard';
import { PropertyCardSkeleton } from '../common/Skeleton';
import { EmptyState } from '../common/EmptyState';

export const PropertyGrid = ({
  properties = [],
  loading = false,
  layout = 'grid',
  onResetFilters,
}) => {
  if (loading) {
    return (
      <div
        className={
          layout === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
            : 'flex flex-col gap-4'
        }
      >
        {Array.from({ length: 6 }).map((_, idx) => (
          <PropertyCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <EmptyState
        icon="search"
        title="No properties found"
        description="Try adjusting your filters, location, or price range to discover more listings."
        actionLabel={onResetFilters ? 'Clear All Filters' : undefined}
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div
      className={
        layout === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
          : 'flex flex-col gap-4'
      }
    >
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} layout={layout} />
      ))}
    </div>
  );
};
