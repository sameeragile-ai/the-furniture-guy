import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const ClearanceSpotlight: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const diff = Math.max(0, endOfMonth.getTime() - now.getTime());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const saleProducts = products.filter((p) => p.salePrice !== undefined).slice(0, 4);

  return (
    <section className="py-12 sm:py-20 bg-[#FAF7F4] border-b border-[#EEE8E1]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Banner with Countdown */}
        <div className="bg-white border border-[#EEE8E1] rounded-xs p-4 sm:p-8 mb-8 sm:mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#C2566B]/10 text-[#C2566B] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2">
              <Tag className="w-3.5 h-3.5" /> End of Month Showroom Clearance
            </div>
            <h2 className="font-serif text-xl sm:text-3xl text-[#1C1B1F]">
              Up to 40% Off Selected Ex-Display & Suites
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6670] mt-1 max-w-xl">
              Limited quantity showroom models and seasonal line liquidations. Once gone, they will not return at these rates.
            </p>
          </div>

          {/* Countdown Clock (compact & responsive for 360px phones) */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-[#6B6670]">
              <Clock className="w-3.5 h-3.5 text-[#C2566B]" />
              <span className="font-medium">Ends in:</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex flex-col items-center justify-center w-11 sm:w-14 h-12 sm:h-14 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xs">
                <span className="font-sans font-bold text-sm sm:text-lg text-[#1C1B1F] tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#6B6670]">Days</span>
              </div>
              <span className="font-serif text-base text-[#D9A89A]">:</span>
              <div className="flex flex-col items-center justify-center w-11 sm:w-14 h-12 sm:h-14 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xs">
                <span className="font-sans font-bold text-sm sm:text-lg text-[#1C1B1F] tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#6B6670]">Hours</span>
              </div>
              <span className="font-serif text-base text-[#D9A89A]">:</span>
              <div className="flex flex-col items-center justify-center w-11 sm:w-14 h-12 sm:h-14 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xs">
                <span className="font-sans font-bold text-sm sm:text-lg text-[#1C1B1F] tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#6B6670]">Mins</span>
              </div>
              <span className="font-serif text-base text-[#D9A89A]">:</span>
              <div className="flex flex-col items-center justify-center w-11 sm:w-14 h-12 sm:h-14 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xs">
                <span className="font-sans font-bold text-sm sm:text-lg text-[#C2566B] tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#6B6670]">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <Link
            to="/clearance"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1C1B1F] hover:text-[#C2566B] transition-colors py-2 min-h-[44px]"
          >
            <span>View All Clearance Pieces ({products.filter((p) => p.salePrice).length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
