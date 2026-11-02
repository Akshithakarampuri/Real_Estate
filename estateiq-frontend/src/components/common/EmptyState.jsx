import React from 'react';
import { Home, Heart, MessageSquare, Search, FileQuestion, Calendar } from 'lucide-react';
import { Button } from './Button';

const iconMap = {
  home: Home,
  heart: Heart,
  chat: MessageSquare,
  search: Search,
  calendar: Calendar,
  default: FileQuestion,
};

export const EmptyState = ({
  icon = 'default',
  title = 'No items found',
  description = 'There are no records matching your current criteria.',
  actionLabel,
  onAction,
  className = '',
}) => {
  const IconComponent = iconMap[icon] || iconMap.default;

  return (
    <div className={`text-center py-16 px-6 bg-white rounded-2xl border border-dashed border-slate-200 ${className}`}>
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
        <IconComponent className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
