import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const PriceTrendHistoricalChart = ({ data }) => {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
          <YAxis
            stroke="#94a3b8"
            fontSize={12}
            tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value) => `₹${value.toLocaleString('en-IN')}/sq.ft`}
            contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <Line
            type="monotone"
            dataKey="Mumbai"
            stroke="#059669"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Mumbai MMR"
          />
          <Line
            type="monotone"
            dataKey="Bangalore"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ r: 4 }}
            name="Bengaluru Tech"
          />
          <Line
            type="monotone"
            dataKey="Hyderabad"
            stroke="#f59e0b"
            strokeWidth={2.5}
            dot={{ r: 4 }}
            name="Hyderabad Cyber"
          />
          <Line
            type="monotone"
            dataKey="DelhiNCR"
            stroke="#8b5cf6"
            strokeWidth={2.5}
            dot={{ r: 4 }}
            name="Delhi NCR"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PropertyTypePieChart = ({ data }) => {
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div className="h-72 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(val) => `${val}% Market Share`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
