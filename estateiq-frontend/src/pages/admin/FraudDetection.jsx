import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatters';
import { FRAUD_RISK_LEVELS } from '../../utils/constants';
import { AlertTriangle, ShieldCheck, Eye, CheckCircle2, XCircle, Search } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const FraudDetection = () => {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success } = useToast();

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const list = await adminService.getFraudFlags();
        if (isMounted) setFlags(list);
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

  const handleResolveFlag = (id, status) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status } : f))
    );
    success(`Flag marked as ${status}.`);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>AI Anti-Fraud Shield</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Suspicious Listings & Fraud Investigation
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time algorithmic detection of severe circle-rate anomalies, duplicate images, and unverified phone identity
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase">
              <tr>
                <th className="p-4">Flagged Property</th>
                <th className="p-4">Seller Entity</th>
                <th className="p-4">Price Variance</th>
                <th className="p-4">AI Risk Indicator</th>
                <th className="p-4">Audit Trigger Reason</th>
                <th className="p-4 text-right">Investigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {flags.map((flag) => {
                const badgeConfig = FRAUD_RISK_LEVELS[flag.riskLevel] || FRAUD_RISK_LEVELS.HIGH;
                return (
                  <tr key={flag.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{flag.propertyTitle}</div>
                      <span className="text-[10px] text-slate-400 font-mono">ID: {flag.propertyId}</span>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-900">{flag.sellerName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{flag.sellerPhone}</div>
                    </td>

                    <td className="p-4">
                      <div className="text-rose-700 font-bold">{formatPrice(flag.price)}</div>
                      <div className="text-[10px] text-slate-400">
                        Market Avg: {formatPrice(flag.marketAverage)}
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black border ${badgeConfig.badge}`}
                      >
                        {flag.riskLevel} ({flag.fraudScore}%)
                      </span>
                    </td>

                    <td className="p-4 max-w-xs text-slate-600 leading-snug">
                      {flag.reason}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleResolveFlag(flag.id, 'Cleared')}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        >
                          Clear Flag
                        </button>
                        <button
                          onClick={() => handleResolveFlag(flag.id, 'Deactivated')}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100"
                        >
                          Deactivate
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
