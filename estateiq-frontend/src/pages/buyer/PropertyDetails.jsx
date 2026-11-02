import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { favoriteService } from '../../services/favoriteService';
import { ImageGallery } from '../../components/property/ImageGallery';
import { AmenitiesList } from '../../components/property/AmenitiesList';
import { EmiCalculator } from '../../components/property/EmiCalculator';
import { ReviewList } from '../../components/property/ReviewList';
import { SimilarProperties } from '../../components/property/SimilarProperties';
import { ScheduleVisitModal } from '../../components/modals/ScheduleVisitModal';
import { InquiryModal } from '../../components/modals/InquiryModal';
import { downloadPropertyBrochure } from '../../utils/pdfGenerator';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice, formatExactCurrency, formatArea } from '../../utils/formatters';
import {
  Heart,
  Share2,
  Scale,
  Calendar,
  MessageSquare,
  FileDown,
  CheckCircle2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Building,
  CalendarDays,
  ShieldCheck,
  Phone,
  Mail,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const PropertyDetails = () => {
  const { id } = useParams();
  const { isFavorite, toggleFavorite, isInCompare, addToCompare, removeFromCompare } = useApp();
  const { success, info } = useToast();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [downloadingBrochure, setDownloadingBrochure] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const item = await propertyService.getPropertyById(id);
        if (isMounted) {
          setProperty(item);
          // Register to recently viewed (Section 13)
          await favoriteService.addRecentlyViewed(item.id);
        }
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
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      success('Listing URL copied to clipboard!');
    }
  };

  const handleDownloadBrochure = async () => {
    if (!property) return;
    setDownloadingBrochure(true);
    try {
      await downloadPropertyBrochure(property);
      success('Official PDF Brochure generated!');
    } catch {
      info('Could not complete download.');
    } finally {
      setDownloadingBrochure(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600 mx-auto"></div>
        <p className="text-xs text-slate-500 mt-4">Loading verified property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Property not found</h2>
        <p className="text-xs text-slate-500">The requested listing may have expired or been deactivated.</p>
        <Link to="/properties" className="btn-primary text-xs px-4 py-2 rounded-xl inline-block">
          Browse Marketplace
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back Link */}
      <div>
        <Link
          to="/properties"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search Results</span>
        </Link>
      </div>

      {/* Main Header & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {property.verified && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                RERA Certified & Verified
              </span>
            )}
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-900 text-white">
              {property.propertyType}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {property.possession || 'Ready to Move'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
            <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
            <span>{property.location}, {property.city} — Pin: {property.pincode || '400018'}</span>
          </div>
        </div>

        {/* Pricing & Primary Quick Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-brand-700 tracking-tight">
              {formatPrice(property.price)}
            </div>
            <div className="text-xs text-slate-400 font-semibold lg:text-right mt-0.5">
              Approx. ₹{Math.round(property.price / property.area).toLocaleString('en-IN')}/sq.ft
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => toggleFavorite(property.id, property.title)}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                favorited
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
              <span>{favorited ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => (compared ? removeFromCompare(property.id) : addToCompare(property.id, property.title))}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                compared
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{compared ? 'In Compare' : 'Compare'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery images={property.images} title={property.title} />

      {/* Main Content Grid: Specs + Description on Left, Sticky Contact on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: Details, Amenities, Map, EMI, Reviews */}
        <div className="lg:col-span-2 space-y-10">
          {/* Key Specs Matrix */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">Property Specifications</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Bedrooms</span>
                <div className="flex items-center gap-1.5 text-base font-black text-slate-900 mt-1">
                  <Bed className="w-4 h-4 text-brand-600" />
                  <span>{property.bhk} BHK</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Bathrooms</span>
                <div className="flex items-center gap-1.5 text-base font-black text-slate-900 mt-1">
                  <Bath className="w-4 h-4 text-brand-600" />
                  <span>{property.bathrooms} Baths</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Super Area</span>
                <div className="flex items-center gap-1.5 text-base font-black text-slate-900 mt-1">
                  <Maximize2 className="w-4 h-4 text-brand-600" />
                  <span>{formatArea(property.area)}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Furnishing</span>
                <div className="text-base font-black text-slate-900 mt-1 truncate">
                  {property.furnishing || 'Semi-Furnished'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Parking</span>
                <div className="text-sm font-bold text-slate-900 mt-1">
                  {property.parking || '2 Covered'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Floor</span>
                <div className="text-sm font-bold text-slate-900 mt-1">
                  {property.floor || '12 of 24'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Year Built</span>
                <div className="text-sm font-bold text-slate-900 mt-1">
                  {property.constructionYear || '2023'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Status</span>
                <div className="text-sm font-bold text-emerald-600 mt-1">
                  Ready to Move
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Society & Lifestyle Amenities</h3>
            <AmenitiesList amenities={property.amenities} />
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <h3 className="text-lg font-bold text-slate-900">About this Property</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Neighborhood Map */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Neighborhood Location</h3>
                <p className="text-xs text-slate-500">
                  {property.location}, {property.city}
                </p>
              </div>
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                Approximate Geolocation
              </span>
            </div>

            <div className="relative h-64 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center text-white">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="relative z-10 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center mx-auto shadow-glow">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm">{property.location}</div>
                <div className="text-xs text-slate-400">
                  Lat: {property.coordinates?.lat || 19.0176}, Lng: {property.coordinates?.lng || 72.8172}
                </div>
              </div>
            </div>
          </div>

          {/* EMI Calculator Widget Embedded */}
          <EmiCalculator initialPrice={property.price} />

          {/* Reviews */}
          <ReviewList />
        </div>

        {/* Right Col: Sticky Agent/Seller Card & CTAs */}
        <div className="space-y-6">
          <div className="sticky top-28 space-y-6">
            {/* Agent / Seller Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-premium space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <img
                  src={property.agent?.avatar || property.seller?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                  alt="Agent"
                  className="w-14 h-14 rounded-full object-cover border-2 border-brand-500"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-sm text-slate-900">
                      {property.agent?.name || property.seller?.name || 'Authorized Representative'}
                    </h4>
                    <ShieldCheck className="w-4 h-4 text-brand-600" />
                  </div>
                  <p className="text-xs text-slate-500">
                    {property.agent?.agency || 'Verified Property Partner'}
                  </p>
                  {property.agent?.licenseNumber && (
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                      {property.agent.licenseNumber}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <Button
                  onClick={() => setScheduleModalOpen(true)}
                  variant="primary"
                  className="w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Site Visit</span>
                </Button>

                <Button
                  onClick={() => setInquiryModalOpen(true)}
                  variant="secondary"
                  className="w-full py-3 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-brand-600" />
                  <span>Send Direct Inquiry</span>
                </Button>

                <button
                  onClick={handleDownloadBrochure}
                  disabled={downloadingBrochure}
                  className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {downloadingBrochure ? (
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-brand-600 border-t-transparent" />
                  ) : (
                    <FileDown className="w-4 h-4 text-slate-500" />
                  )}
                  <span>{downloadingBrochure ? 'Generating PDF...' : 'Download PDF Brochure'}</span>
                </button>
              </div>

              {/* Direct Contacts */}
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{property.agent?.phone || '+91 98200 45678'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{property.agent?.email || 'contact@estateiq.com'}</span>
                </div>
              </div>
            </div>

            {/* AI Trust Card */}
            <div className="rounded-2xl bg-brand-900 text-white p-5 space-y-2 border border-brand-800">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-300">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                <span>Verified Listing Assurance</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                This property has zero registered encumbrances and approved municipal floor plans.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar AI Recommendations */}
      <SimilarProperties currentPropertyId={property.id} />

      {/* Modals */}
      <ScheduleVisitModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        property={property}
      />
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        property={property}
      />
    </div>
  );
};
