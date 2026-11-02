import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const ViewsOverTimeChart = ({
  data = [
    { day: 'Mon', views: 120, inquiries: 4 },
    { day: 'Tue', views: 180, inquiries: 6 },
    { day: 'Wed', views: 240, inquiries: 9 },
    { day: 'Thu', views: 210, inquiries: 5 },
    { day: 'Fri', views: 320, inquiries: 11 },
    { day: 'Sat', views: 450, inquiries: 18 },
    { day: 'Sun', views: 490, inquiries: 22 },
  ],
}) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          />
          <Area
            type="monotone"
            dataKey="views"
            stroke="#059669"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorViews)"
            name="Listing Views"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const InquiriesAndVisitsChart = ({
  data = [
    { day: 'Mon', inquiries: 4, visits: 2 },
    { day: 'Tue', inquiries: 6, visits: 3 },
    { day: 'Wed', inquiries: 9, visits: 4 },
    { day: 'Thu', inquiries: 5, visits: 2 },
    { day: 'Fri', inquiries: 11, visits: 6 },
    { day: 'Sat', inquiries: 18, visits: 10 },
    { day: 'Sun', inquiries: 22, visits: 14 },
  ],
}) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
          <Bar dataKey="inquiries" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Inquiries" />
          <Bar dataKey="visits" fill="#10b981" radius={[4, 4, 0, 0]} name="Visits Booked" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
