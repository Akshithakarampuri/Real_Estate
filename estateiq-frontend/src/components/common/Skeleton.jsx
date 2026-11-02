import React from 'react';

export const PropertyCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-subtle animate-pulse">
      <div className="h-56 bg-slate-200 w-full" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-slate-200 rounded w-20" />
          <div className="h-4 bg-slate-200 rounded w-14" />
        </div>
        <div className="h-6 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
        <div className="pt-3 border-t border-slate-100 flex justify-between">
          <div className="h-4 bg-slate-200 rounded w-16" />
          <div className="h-4 bg-slate-200 rounded w-16" />
          <div className="h-4 bg-slate-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
};

export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse p-4 space-y-4">
      <div className="h-10 bg-slate-100 rounded-lg w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="h-12 bg-slate-100 rounded-lg flex-1" />
          <div className="h-12 bg-slate-100 rounded-lg flex-1" />
          <div className="h-12 bg-slate-100 rounded-lg flex-1" />
          <div className="h-12 bg-slate-100 rounded-lg w-24" />
        </div>
      ))}
    </div>
  );
};

export const StatsCardSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-subtle animate-pulse space-y-3">
      <div className="h-4 bg-slate-200 rounded w-24" />
      <div className="h-8 bg-slate-200 rounded w-36" />
      <div className="h-3 bg-slate-200 rounded w-20" />
    </div>
  );
};
