import React from 'react';
import { FileText, Download, ShieldCheck, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';

export const Reports = () => {
  const { success } = useToast();

  const handleDownload = (reportName) => {
    success(`Generated and downloaded "${reportName}.csv"!`);
  };

  const reports = [
    {
      title: 'Quarterly RERA Compliance & Title Audit',
      desc: 'Complete ledger of all verified and pending listings audited against municipal land registries.',
      date: 'Generated Sep 2026',
      size: '2.4 MB',
    },
    {
      title: 'Platform Transaction & Escrow Volume',
      desc: 'Gross marketplace value, closed transactions, broker commissions, and state stamp duty aggregates.',
      date: 'Generated Sep 2026',
      size: '4.8 MB',
    },
    {
      title: 'AI Valuation & Circle Rate Variance Report',
      desc: 'Model accuracy metrics comparing FastAPI predicted valuations vs registered sale deeds.',
      date: 'Generated Aug 2026',
      size: '1.2 MB',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          <FileText className="w-3.5 h-3.5" />
          <span>Compliance & Auditing</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Platform Reports & Compliance Logs
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Download certified audit reports for regulatory compliance and platform governance
        </p>
      </div>

      <div className="space-y-4">
        {reports.map((rep, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{rep.title}</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xl">{rep.desc}</p>
                <div className="flex gap-4 text-[11px] text-slate-400 font-semibold mt-2">
                  <span>{rep.date}</span>
                  <span>•</span>
                  <span>{rep.size}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => handleDownload(rep.title)}
              variant="secondary"
              icon={Download}
              className="text-xs px-4 py-2 font-bold shrink-0"
            >
              Export CSV
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
