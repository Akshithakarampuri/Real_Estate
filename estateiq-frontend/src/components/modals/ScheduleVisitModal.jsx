import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { bookingService } from '../../services/bookingService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';

const TIME_SLOTS = [
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '02:00 PM - 03:00 PM',
  '03:30 PM - 04:30 PM',
  '05:00 PM - 06:00 PM',
];

export const ScheduleVisitModal = ({ isOpen, onClose, property }) => {
  const { user } = useAuth();
  const { success, error } = useToast();

  const [date, setDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Set minimum date to tomorrow
  const minDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) {
      error('Please choose a preferred visit date.');
      return;
    }

    setLoading(true);
    try {
      await bookingService.createBooking({
        propertyId: property.id,
        propertyTitle: property.title,
        propertyImage: property.images?.[0],
        buyerId: user?.id || 'usr_buyer',
        buyerName: user?.name || 'Valued Buyer',
        buyerPhone: user?.phone || '+91 98765 43210',
        date,
        time: selectedSlot,
        message: message || 'Interested in viewing the residence and society amenities.',
      });
      setIsSuccess(true);
      success('Visit request scheduled successfully!');
    } catch (err) {
      error(err.message || 'Unable to schedule visit.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setDate('');
    setMessage('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isSuccess ? 'Visit Request Submitted' : 'Schedule a Private Walkthrough'}
      subtitle={property?.title}
    >
      {isSuccess ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-lg font-bold text-slate-900">Request Sent to Agent</h4>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Your appointment request for <strong>{date}</strong> at <strong>{selectedSlot}</strong> has been received. The listing agent will confirm within 2 hours.
          </p>
          <div className="pt-4">
            <Button onClick={handleClose} variant="primary" className="w-full">
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Property Snippet */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <img
              src={property?.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200'}
              alt={property?.title}
              className="w-16 h-12 rounded-lg object-cover"
            />
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-900 truncate">{property?.title}</div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                <MapPin className="w-3 h-3" />
                <span>{property?.location}, {property?.city}</span>
              </div>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Date
            </label>
            <div className="relative">
              <input
                type="date"
                min={minDate}
                value={date}
                required
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* Time Slot Radio Grid */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Available Time Slots
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors ${
                    selectedSlot === slot
                      ? 'bg-brand-50 border-brand-500 text-brand-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                  <span>{slot}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message / Special Request */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Special Requests / Questions (Optional)
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Would like to check balcony orientation and parking space."
              className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <Button type="button" variant="secondary" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={loading} className="flex-1">
              Confirm Schedule
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
