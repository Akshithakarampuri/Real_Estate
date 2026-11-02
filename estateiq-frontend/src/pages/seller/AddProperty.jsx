import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Step1Basic } from '../../components/forms/Step1Basic';
import { Step2Location } from '../../components/forms/Step2Location';
import { Step3Pricing } from '../../components/forms/Step3Pricing';
import { Step4Amenities } from '../../components/forms/Step4Amenities';
import { Step5Media } from '../../components/forms/Step5Media';
import { Step6Preview } from '../../components/forms/Step6Preview';
import { Button } from '../../components/common/Button';
import { CheckCircle2, ChevronRight, ChevronLeft, Building2 } from 'lucide-react';

export const AddProperty = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'Apartment',
    bhk: 3,
    bathrooms: 3,
    area: 1850,
    furnishing: 'Semi-Furnished',
    address: '',
    city: 'Mumbai',
    location: '',
    pincode: '400018',
    coordinates: { lat: 19.0176, lng: 72.8172 },
    price: 15000000,
    maintenance: 6500,
    negotiable: true,
    amenities: ['24/7 Security & CCTV', 'High-speed Elevators', '100% Power Backup', 'Swimming Pool'],
    images: [],
    seller: {
      id: user?.id || 'usr_seller',
      name: user?.name || 'Aarav Oberoi',
      phone: user?.phone || '+91 98211 99887',
    },
  });

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const steps = [
    { num: 1, title: 'Basic Info' },
    { num: 2, title: 'Location' },
    { num: 3, title: 'Pricing & AI' },
    { num: 4, title: 'Amenities' },
    { num: 5, title: 'Media Upload' },
    { num: 6, title: 'Review & Submit' },
  ];

  const handleNext = () => {
    if (currentStep === 1 && !formData.title) {
      error('Please provide a property title.');
      return;
    }
    if (currentStep === 2 && !formData.location) {
      error('Please provide a locality or neighborhood.');
      return;
    }
    if (currentStep === 3 && (!formData.price || formData.price <= 0)) {
      error('Please provide an expected price.');
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, 6));
  };

  const handlePrev = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const created = await propertyService.createProperty(formData);
      success('Property created successfully! Submitted for verification.');
      navigate('/seller/listings');
    } catch (err) {
      error(err.message || 'Failed to submit property listing.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Create New Property Listing
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Follow the 6-step guided wizard to list your property on EstateIQ
        </p>
      </div>

      {/* Step Stepper Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between min-w-[550px]">
          {steps.map((s, index) => {
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-brand-600 text-white ring-4 ring-brand-500/20'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      isCurrent ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-3 bg-slate-200" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        {currentStep === 1 && <Step1Basic formData={formData} updateFormData={updateFormData} />}
        {currentStep === 2 && <Step2Location formData={formData} updateFormData={updateFormData} />}
        {currentStep === 3 && <Step3Pricing formData={formData} updateFormData={updateFormData} />}
        {currentStep === 4 && <Step4Amenities formData={formData} updateFormData={updateFormData} />}
        {currentStep === 5 && <Step5Media formData={formData} updateFormData={updateFormData} />}
        {currentStep === 6 && <Step6Preview formData={formData} />}

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100">
          <Button
            type="button"
            variant="secondary"
            onClick={handlePrev}
            disabled={currentStep === 1 || submitting}
            className="text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </Button>

          {currentStep < 6 ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              className="text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 font-bold"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={handleSubmit}
              isLoading={submitting}
              className="text-xs px-6 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700"
            >
              Confirm & Submit Listing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
