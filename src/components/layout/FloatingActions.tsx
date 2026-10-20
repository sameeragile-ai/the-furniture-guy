import React, { useState } from 'react';
import { Phone, MessageCircle, PhoneCall, ChevronUp } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { CallbackModal } from './CallbackModal';

export const FloatingActions: React.FC = () => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Expanded buttons on mobile or always visible on desktop */}
        <div
          className={`flex flex-col items-end gap-3 transition-all duration-300 ${
            isOpenMobile ? 'opacity-100 translate-y-0 pointer-events-auto' : 'hidden md:flex'
          }`}
        >
          {/* Request Callback Trigger */}
          <button
            onClick={() => {
              setIsCallbackOpen(true);
              setIsOpenMobile(false);
            }}
            className="group flex items-center gap-2.5 px-3.5 py-2.5 bg-white text-[#1C1B1F] rounded-full border border-[#EEE8E1] hover:border-[#C9A27E] shadow-lg transition-all text-xs font-semibold"
            aria-label="Request a phone call back"
          >
            <span className="hidden group-hover:inline-block transition-opacity text-[#6B6670]">
              Request Call Back
            </span>
            <div className="w-8 h-8 rounded-full bg-[#FAF6F0] text-[#C9A27E] flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
          </button>

          {/* Call direct */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="group relative flex items-center gap-2.5 px-3.5 py-2.5 bg-[#1C1B1F] text-white rounded-full shadow-lg hover:bg-[#333] transition-all text-xs font-semibold"
            aria-label={`Call ${siteConfig.businessName}`}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A27E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D9A89A]"></span>
            </span>
            <span className="hidden group-hover:inline-block transition-opacity">
              {siteConfig.displayPhone}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Phone className="w-4 h-4 text-[#FBF9F6]" />
            </div>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=Hi,%20I'm%20browsing%20The%20Furniture%20Guy%20and%20would%20like%20to%20enquire%20about%20your%20glam%20collection.`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2.5 px-4 py-2.5 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] transition-all text-xs font-semibold"
            aria-label="Chat on WhatsApp"
          >
            <span className="hidden group-hover:inline-block transition-opacity">
              Chat on WhatsApp
            </span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white fill-white" />
            </div>
          </a>
        </div>

        {/* Mobile toggle button */}
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="md:hidden w-13 h-13 rounded-full bg-luxe-gradient text-[#1C1B1F] flex items-center justify-center shadow-xl border border-white"
          aria-label="Open contact options"
        >
          <div className="flex flex-col items-center justify-center">
            {isOpenMobile ? (
              <ChevronUp className="w-6 h-6 rotate-180 transition-transform" />
            ) : (
              <MessageCircle className="w-6 h-6 text-[#1C1B1F]" />
            )}
          </div>
        </button>
      </div>

      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
      />
    </>
  );
};
