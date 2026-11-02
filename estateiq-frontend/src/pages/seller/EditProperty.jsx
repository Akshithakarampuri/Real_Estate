import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { PROPERTY_TYPES, BHK_OPTIONS } from '../../utils/constants';
import { ArrowLeft, Save } from 'lucide-react';

export const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const prop = await propertyService.getPropertyById(id);
        if (isMounted) setFormData(prop);
      } catch (err) {
        error(err.message || 'Could not load property.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [id, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await propertyService.updateProperty(id, formData);
      success('Listing updated successfully!');
      navigate('/seller/listings');
    } catch (err) {
      error(err.message || 'Failed to update property.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-600 mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <button
        onClick={() => navigate('/seller/listings')}
        className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to My Listings</span>
      </button>

      <div>
        <h1 className="text-2xl font-black text-slate-900">Edit Property Details</h1>
        <p className="text-xs text-slate-500">Editing: {formData.title}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Price (₹)</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Area (sq.ft)</label>
            <input
              type="number"
              required
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t">
          <Button type="button" variant="secondary" onClick={() => navigate('/seller/listings')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" icon={Save} isLoading={saving}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
