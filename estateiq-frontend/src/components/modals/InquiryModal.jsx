import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { inquiryService } from '../../services/inquiryService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const InquiryModal = ({ isOpen, onClose, property }) => {
  const { user } = useAuth();
  const { success, error } = useToast();

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      error('Please enter a message before sending.');
      return;
    }

    setLoading(true);
    try {
      await inquiryService.sendInquiry({
        propertyId: property.id,
        propertyTitle: property.title,
        message,
        buyerName: user?.name || 'Potential Buyer',
        buyerEmail: user?.email || 'buyer@example.com',
      });
      setSent(true);
      success('Inquiry sent! The agent has been notified.');
    } catch (err) {
      error(err.message || 'Could not send inquiry.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSent(false);
    setMessage('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={sent ? 'Inquiry Sent' : 'Contact Seller / Agent'}
      subtitle={`Regarding: ${property?.title}`}
    >
      {sent ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-slate-900">Message Delivered</h4>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Your inquiry has been delivered directly to the representative. You can track this conversation in your Inquiries inbox.
          </p>
          <div className="pt-2">
            <Button onClick={handleClose} variant="primary" className="w-full">
              Close
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Message
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I am interested in this property. Is the price negotiable? Can you share floor plans?"
              className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              icon={Send}
              className="flex-1"
            >
              Send Message
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
