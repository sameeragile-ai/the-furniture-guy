import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/site';
import { isValidUKPhone } from '../lib/utils';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const ContactPage: React.FC = () => {
  useDocumentTitle('Contact Our Showroom', 'Get in touch with The Furniture Guy team. Showroom address, phone, WhatsApp and enquiry form.');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Enquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    if (phone && !isValidUKPhone(phone)) {
      setError('Please enter a valid UK telephone number.');
      return;
    }

    setIsSubmitting(true);
    const payload = {
      type: 'GENERAL_CONTACT',
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
    };

    try {
      if (siteConfig.formEndpoint) {
        await fetch(siteConfig.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const stored = JSON.parse(localStorage.getItem('tfg_contacts') || '[]');
        stored.push(payload);
        localStorage.setItem('tfg_contacts', JSON.stringify(stored));
      }
      setIsSent(true);
    } catch {
      setError('Failed to send message. Please telephone us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#FBF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF6F0] border border-[#EEE8E1] rounded-full text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showroom & Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1B1F] tracking-tight">
            We are here to assist
          </h1>
          <p className="text-sm sm:text-base text-[#6B6670] mt-3 font-light">
            Whether you have questions regarding dimensions, bespoke delivery times, or showroom availability, our team is always delighted to help.
          </p>
        </div>

        {/* Contact Grid: Details + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Direct Showroom Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#EEE8E1] rounded-xs p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="font-serif text-2xl text-[#1C1B1F]">
                Direct Contacts
              </h3>

              <div className="space-y-4 text-xs">
                {/* Telephone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF6F0] text-[#C9A27E] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#6B6670] block">Showroom Telephone</span>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-sm font-semibold text-[#1C1B1F] hover:text-[#C9A27E] transition-colors"
                    >
                      {siteConfig.displayPhone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E8F8EE] text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#6B6670] block">WhatsApp Enquiries</span>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#25D366] hover:underline"
                    >
                      {siteConfig.whatsappDisplay} (Fast Response)
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF6F0] text-[#C9A27E] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#6B6670] block">Email Enquiries</span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm font-semibold text-[#1C1B1F] hover:text-[#C9A27E] transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF6F0] text-[#C9A27E] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#6B6670] block">Showroom Address</span>
                    <p className="text-sm font-medium text-[#1C1B1F]">
                      {siteConfig.businessName}<br />
                      {siteConfig.address}<br />
                      {siteConfig.city}, {siteConfig.postcode}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF6F0] text-[#C9A27E] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#6B6670] block">Consultation Hours</span>
                    <p className="text-sm font-medium text-[#1C1B1F]">
                      {siteConfig.openingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#EEE8E1] rounded-xs p-6 sm:p-10 shadow-xs">
            {isSent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border border-[#D9A89A] flex items-center justify-center text-[#C9A27E] mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#1C1B1F]">
                  Message Dispatched
                </h3>
                <p className="text-sm text-[#6B6670] max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>. A showroom manager will review your enquiry and respond within 24 hours.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-6 py-2.5 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl text-[#1C1B1F] mb-1">
                  Send an Enquiry
                </h3>
                <p className="text-xs text-[#6B6670] mb-4">
                  Fill in your details and we'll reply directly to your email or telephone.
                </p>

                {error && (
                  <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs rounded-xs">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Charlotte Pemberton"
                      className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. charlotte@example.co.uk"
                      className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      UK Telephone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 07123 456789"
                      className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                    >
                      <option value="Product Enquiry">Product Specification Enquiry</option>
                      <option value="Showroom Visit">Showroom Viewing Question</option>
                      <option value="Delivery Status">UK Delivery & Access Query</option>
                      <option value="Trade & Interior Design">Trade & Bulk Order Enquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what pieces you're interested in, any room dimension questions, or delivery postcodes..."
                    className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs hover:opacity-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-[#7D5634]" />
                    <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="bg-white border border-[#EEE8E1] rounded-xs overflow-hidden shadow-xs">
          <div className="p-4 bg-[#FAF7F4] border-b border-[#EEE8E1] flex items-center justify-between">
            <span className="font-serif text-sm font-semibold text-[#1C1B1F]">
              Showroom Location & Route
            </span>
            <span className="text-xs text-[#6B6670]">{siteConfig.city}, {siteConfig.country}</span>
          </div>
          <div className="aspect-[21/9] w-full bg-[#F5F5F7]">
            <iframe
              title="The Furniture Guy Showroom Location"
              src="https://maps.google.com/maps?q=Birmingham%20UK&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
