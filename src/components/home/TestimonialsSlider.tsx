import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

export const TestimonialsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      next(); // Swiped left
    } else if (diff < -45) {
      prev(); // Swiped right
    }
    setTouchStart(null);
  };

  const current = testimonials[currentIndex];

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="py-16 sm:py-24 bg-white border-b border-[#EEE8E1]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none">
        <div className="flex items-center justify-center gap-1.5 mb-6 text-[#C9A27E]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-[#C9A27E]" />
          ))}
        </div>

        {/* Big Quote Mark */}
        <Quote className="w-10 sm:w-12 h-10 sm:h-12 text-[#E8D3B9] mx-auto mb-4 sm:mb-6 rotate-180 opacity-60" />

        {/* Current Review Quote */}
        <div className="min-h-[120px] sm:min-h-[140px] flex items-center justify-center">
          <blockquote className="font-serif text-lg sm:text-2xl lg:text-3xl font-light text-[#1C1B1F] leading-snug tracking-tight">
            "{current.quote}"
          </blockquote>
        </div>

        {/* Customer Details */}
        <div className="mt-6 sm:mt-8 pt-6 border-t border-[#EEE8E1] flex flex-col items-center">
          <span className="font-serif text-base sm:text-lg font-medium text-[#1C1B1F]">
            {current.name}
          </span>
          <div className="flex items-center gap-2 text-xs text-[#6B6670] mt-0.5">
            <span>{current.town}</span>
            <span>·</span>
            <span className="text-[#966C3E] font-medium">{current.productName}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#3F6212] font-semibold mt-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified UK Homeowner Purchase · {current.date}</span>
          </div>
        </div>

        {/* Navigation Dots and Arrows with 44px tap targets */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
          <button
            onClick={prev}
            className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-[#EEE8E1] hover:border-[#1C1B1F] flex items-center justify-center text-[#1C1B1F] transition-colors active:scale-95"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 py-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all min-h-[24px] flex items-center ${
                  currentIndex === idx ? 'w-8 bg-luxe-gradient' : 'w-2.5 bg-[#E5DFD7]'
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-[#EEE8E1] hover:border-[#1C1B1F] flex items-center justify-center text-[#1C1B1F] transition-colors active:scale-95"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
