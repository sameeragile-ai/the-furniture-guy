import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { faqs } from '../../data/faqs';
import { siteConfig } from '../../config/site';

interface FaqAccordionProps {
  onOpenCallback?: () => void;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ onOpenCallback }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  const toggle = (id: string) => {
    setOpenId((curr) => (curr === id ? null : id));
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF6F0] border border-[#EEE8E1] rounded-full text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Enquiries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1F] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#6B6670] mt-2">
            Everything you need to know about our two-man UK delivery, showroom viewings, and care guidelines.
          </p>
        </div>

        {/* Accordion list */}
        <div className="divide-y divide-[#EEE8E1] border-y border-[#EEE8E1]">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-5">
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between text-left gap-4 py-1 group"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-medium text-[#1C1B1F] group-hover:text-[#966C3E] transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-[#EEE8E1] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#1C1B1F] text-white border-[#1C1B1F]' : 'text-[#6B6670] group-hover:border-[#1C1B1F]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 pb-2 text-sm sm:text-base text-[#6B6670] leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Showroom assistance callout */}
        <div className="mt-12 p-6 bg-[#FAF7F4] border border-[#EEE8E1] rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif text-base font-semibold text-[#1C1B1F]">
              Have a bespoke enquiry or question about dimensions?
            </h4>
            <p className="text-xs text-[#6B6670] mt-0.5">
              Our showroom consultants are available Monday to Saturday 10:00–18:00.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {onOpenCallback && (
              <button
                onClick={onOpenCallback}
                className="px-4 py-2 text-xs font-semibold bg-white border border-[#EEE8E1] hover:border-[#1C1B1F] text-[#1C1B1F] rounded-xs transition-colors shadow-xs"
              >
                Request Call Back
              </button>
            )}
            <a
              href={`tel:${siteConfig.phone}`}
              className="px-4 py-2 text-xs font-semibold bg-luxe-gradient text-[#1C1B1F] rounded-xs shadow-xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call {siteConfig.displayPhone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
