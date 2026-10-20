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
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white border-y border-[#EEE8E1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Showroom Favourites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1F] tracking-tight">
              Our Most Coveted Pieces
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-[#EEE8E1] hover:border-[#1C1B1F] flex items-center justify-center text-[#1C1B1F] transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-[#EEE8E1] hover:border-[#1C1B1F] flex items-center justify-center text-[#1C1B1F] transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
        >
          {bestsellers.map((product) => (
            <div key={product.id} className="w-[280px] sm:w-[320px] shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/shop"
            className="text-xs font-semibold text-[#1C1B1F] underline underline-offset-4"
          >
            View all bestsellers &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};
