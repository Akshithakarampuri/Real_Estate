import React from 'react';
import {
  Waves,
  Dumbbell,
  ShieldCheck,
  Zap,
  ArrowUpCircle,
  Trees,
  BatteryCharging,
  Car,
  Sparkles,
  Smile,
  Activity,
  Droplet,
  CheckCircle,
} from 'lucide-react';

const amenityIconMap = {
  pool: Waves,
  swimming: Waves,
  gym: Dumbbell,
  fitness: Dumbbell,
  security: ShieldCheck,
  cctv: ShieldCheck,
  backup: Zap,
  power: Zap,
  elevator: ArrowUpCircle,
  lift: ArrowUpCircle,
  garden: Trees,
  ev: BatteryCharging,
  charging: BatteryCharging,
  parking: Car,
  clubhouse: Sparkles,
  kids: Smile,
  play: Smile,
  tennis: Activity,
  badminton: Activity,
  water: Droplet,
};

const getAmenityIcon = (name) => {
  const lower = name.toLowerCase();
  for (const [key, Icon] of Object.entries(amenityIconMap)) {
    if (lower.includes(key)) return Icon;
  }
  return CheckCircle;
};

export const AmenitiesList = ({ amenities = [] }) => {
  if (!amenities || amenities.length === 0) {
    return <p className="text-sm text-slate-400 italic">No amenities specified.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
      {amenities.map((amenity, idx) => {
        const Icon = getAmenityIcon(amenity);
        return (
          <div
            key={idx}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-brand-300 hover:bg-brand-50/30 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-800">{amenity}</span>
          </div>
        );
      })}
    </div>
  );
};
