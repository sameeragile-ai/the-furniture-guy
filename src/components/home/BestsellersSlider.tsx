import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const BestsellersSlider: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bestsellers = products.filter((p) => p.isBestseller);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-y border-[#EEE8E1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Showroom Favourites</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1B1F] tracking-tight">
              Our Most Coveted Pieces
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full border border-[#EEE8E1] hover:border-[#1C1B1F] flex items-center justify-center text-[#1C1B1F] transition-colors active:scale-95"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full border border-[#EEE8E1] hover:border-[#1C1B1F] flex items-center justify-center text-[#1C1B1F] transition-colors active:scale-95"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider: touch-swipeable with momentum and snap, partial next card visible */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar snap-carousel -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {bestsellers.map((product) => (
            <div
              key={product.id}
              className="snap-item w-[70vw] xs:w-[240px] sm:w-[280px] md:w-[320px] shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/shop"
            className="text-xs font-semibold text-[#1C1B1F] underline underline-offset-4 py-2 inline-block min-h-[44px]"
          >
            View all bestsellers &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};
