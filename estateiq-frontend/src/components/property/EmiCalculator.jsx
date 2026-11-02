import React, { useState, useMemo } from 'react';
import { calculateEMI } from '../../utils/emiCalculations';
import { formatExactCurrency, formatPrice } from '../../utils/formatters';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calculator, DollarSign, Percent, Clock } from 'lucide-react';

export const EmiCalculator = ({ initialPrice = 10000000 }) => {
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const downPayment = Math.round((price * downPaymentPercent) / 100);
  const loanAmount = Math.max(0, price - downPayment);

  const { monthlyEmi, totalInterest, totalPayment, principal } = useMemo(() => {
    return calculateEMI(loanAmount, interestRate, tenureYears);
  }, [loanAmount, interestRate, tenureYears]);

  const chartData = [
    { name: 'Principal Loan', value: principal, color: '#10b981' }, // emerald-500
    { name: 'Total Interest', value: totalInterest, color: '#f59e0b' }, // amber-500
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
      <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-100">
        <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">Home Loan EMI Calculator</h3>
          <p className="text-xs text-slate-500">Estimate your monthly mortgage payments & interest breakdown</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders and Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Property Price */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700">Property Valuation</label>
              <span className="text-sm font-extrabold text-brand-700">{formatExactCurrency(price)}</span>
            </div>
            <input
              type="range"
              min="2000000"
              max="50000000"
              step="500000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>

          {/* Down Payment % */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="text-xs font-bold text-slate-600">{formatExactCurrency(downPayment)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700">Interest Rate (% p.a.)</label>
              <span className="text-sm font-extrabold text-slate-900">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="6.5"
              max="15.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700">Loan Tenure</label>
              <span className="text-sm font-extrabold text-slate-900">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Chart & Result Summary */}
        <div className="lg:col-span-5 flex flex-col items-center bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
          <div className="text-center mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Estimated Monthly EMI
            </span>
            <div className="text-3xl font-black text-brand-700 mt-0.5">
              {formatExactCurrency(monthlyEmi)}
              <span className="text-xs font-medium text-slate-400">/mo</span>
            </div>
          </div>

          {/* Recharts Donut */}
          <div className="h-44 w-44 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => formatExactCurrency(val)}
                  contentStyle={{
                    borderRadius: '12px',
                    fontSize: '12px',
                    border: '1px solid #e2e8f0',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-[10px] uppercase font-bold text-slate-400">Tenure</span>
              <span className="text-sm font-black text-slate-800">{tenureYears}y</span>
            </div>
          </div>

          {/* Breakdown Pills */}
          <div className="w-full space-y-2 text-xs pt-2 border-t border-slate-200/80">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Principal Amount
              </span>
              <span className="font-bold text-slate-900">{formatExactCurrency(principal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                Total Interest
              </span>
              <span className="font-bold text-slate-900">{formatExactCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center pt-1 font-extrabold border-t border-slate-200">
              <span className="text-slate-900">Total Payable</span>
              <span className="text-brand-700">{formatExactCurrency(totalPayment)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
