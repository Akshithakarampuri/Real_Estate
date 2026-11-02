import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { formatPrice } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';
import {
  Building,
  PlusCircle,
  Eye,
  BarChart3,
  Edit,
  Trash2,
  Pause,
  Play,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const SellerListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success, info } = useToast();

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const res = await propertyService.getProperties();
        if (isMounted) setProperties(res.properties);
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

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      await propertyService.deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      success('Listing deleted.');
    }
  };

  const handleTogglePause = async (property) => {
    const nextStatus = property.status === 'paused' ? 'active' : 'paused';
    await propertyService.updateProperty(property.id, { status: nextStatus });
    setProperties((prev) =>
      prev.map((p) => (p.id === property.id ? { ...p, status: nextStatus } : p))
    );
    info(`Listing marked as ${nextStatus}.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
            <Building className="w-3.5 h-3.5" />
            <span>Listing Inventory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Property Listings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your real estate portfolio, edit details, and review buyer engagement
          </p>
        </div>

        <Link to="/seller/properties/new" className="btn-primary text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          <span>Add Property</span>
        </Link>
      </div>

      {/* Table / Card List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase">
              <tr>
                <th className="p-4">Property</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Views</th>
                <th className="p-4">Verification</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200'}
                        alt={p.title}
                        className="w-14 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="overflow-hidden">
                        <Link
                          to={`/properties/${p.id}`}
                          className="font-bold text-slate-900 hover:text-brand-600 truncate block max-w-xs"
                        >
                          {p.title}
                        </Link>
                        <span className="text-[11px] text-slate-400">
                          {p.location}, {p.city} • {p.bhk} BHK
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-bold text-brand-700">
                    {formatPrice(p.price)}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'paused'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {p.status || 'Active'}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {p.viewsCount || 340}
                    </span>
                  </td>

                  <td className="p-4">
                    {p.verified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        Pending Audit
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/seller/properties/${p.id}/analytics`}
                        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-brand-600"
                        title="View Analytics"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Link>

                      <Link
                        to={`/seller/properties/${p.id}/edit`}
                        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600"
                        title="Edit Listing"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleTogglePause(p)}
                        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-amber-600"
                        title={p.status === 'paused' ? 'Activate Listing' : 'Pause Listing'}
                      >
                        {p.status === 'paused' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-2 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
