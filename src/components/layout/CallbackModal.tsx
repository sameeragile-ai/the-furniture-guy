import React, { useState } from 'react';
import { X, PhoneCall, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { siteConfig } from '../../config/site';
import { isValidUKPhone } from '../../lib/utils';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  productContext?: string;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onClose,
  productContext,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [timeSlot, setTimeSlot] = useState<'Morning (10:00 - 13:00)' | 'Afternoon (13:00 - 16:00)' | 'Evening (16:00 - 18:30)'>('Morning (10:00 - 13:00)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }

    if (!isValidUKPhone(phone)) {
      setError('Please enter a valid UK telephone or mobile number (e.g. 07123 456789).');
      return;
    }

    setIsSubmitting(true);

    const submission = {
      type: 'CALLBACK_REQUEST',
      name,
      phone,
      timeSlot,
      notes,
      productContext: productContext || 'General Showroom Enquiry',
      timestamp: new Date().toISOString(),
    };

    try {
      if (siteConfig.formEndpoint) {
        await fetch(siteConfig.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission),
        });
      } else {
        // Fallback simulation & localStorage storage
        await new Promise((resolve) => setTimeout(resolve, 900));
        const stored = JSON.parse(localStorage.getItem('tfg_callback_requests') || '[]');
        stored.push(submission);
        localStorage.setItem('tfg_callback_requests', JSON.stringify(stored));
      }
      setIsSubmitted(true);
    } catch {
      setError('Unable to submit your request. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setNotes('');
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetAndClose}
            className="absolute inset-0 bg-[#1C1B1F]/50 backdrop-blur-xs"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="relative w-full max-w-lg bg-white border border-[#EEE8E1] rounded-xs shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-[#FAF6F0] border-b border-[#EEE8E1] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A27E] font-semibold">
                  Personal Styling & Technical Advice
                </span>
                <h3 className="font-serif text-xl text-[#1C1B1F]">
                  Request a Dedicated Call Back
                </h3>
              </div>
              <button
                onClick={handleResetAndClose}
                className="w-8 h-8 rounded-full border border-[#EEE8E1] hover:border-[#1C1B1F] flex items-center justify-center text-[#1C1B1F] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-[#FAF6F0] border border-[#D9A89A] flex items-center justify-center text-[#C9A27E] mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#1C1B1F] mb-2">
                    Request Received
                  </h4>
                  <p className="text-sm text-[#6B6670] max-w-sm mx-auto mb-6">
                    Thank you, <strong>{name}</strong>. A showroom specialist from {siteConfig.businessName} will contact you during your preferred slot ({timeSlot.split(' ')[0]}).
                  </p>
                  <button
                    onClick={handleResetAndClose}
                    className="px-6 py-2.5 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {productContext && (
                    <div className="p-3 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xs text-xs text-[#1C1B1F] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#C9A27E] shrink-0" />
                      <span>
                        Enquiring regarding: <strong>{productContext}</strong>
                      </span>
                    </div>
                  )}

                  {error && (
                    <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-xs text-xs text-[#991B1B]">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Eleanor Sterling"
                      className="w-full px-3 py-2 text-sm border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      UK Telephone or Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 07400 123456"
                      className="w-full px-3 py-2 text-sm border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E] transition-colors"
                    />
                    <span className="text-[11px] text-[#6B6670] mt-0.5 block">
                      We never share your telephone number with third parties.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      Preferred Call Window
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {(['Morning (10:00 - 13:00)', 'Afternoon (13:00 - 16:00)', 'Evening (16:00 - 18:30)'] as const).map(
                        (slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTimeSlot(slot)}
                            className={`p-2 text-xs rounded-xs border text-center transition-all ${
                              timeSlot === slot
                                ? 'bg-[#1C1B1F] text-white border-[#1C1B1F]'
                                : 'bg-[#FBF9F6] text-[#6B6670] border-[#EEE8E1] hover:border-[#C9A27E]'
                            }`}
                          >
                            {slot.split(' ')[0]}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      Specific Questions or Room Dimensions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Wondering about door delivery clearances for the Venice cabinet..."
                      className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E] transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-luxe-gradient text-[#1C1B1F] font-semibold text-xs rounded-xs shadow-xs hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4 text-[#7D5634]" />
                      <span>{isSubmitting ? 'Requesting Call...' : 'Confirm Call Back Request'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
