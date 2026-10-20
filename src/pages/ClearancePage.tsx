import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Sparkles, Clock } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const ClearancePage: React.FC = () => {
  useDocumentTitle('Clearance & Showroom Ex-Display', 'Save up to 40% on discontinued and ex-display mirrored furniture and crushed diamond suites.');

  const [selectedFinish, setSelectedFinish] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'discount' | 'price-asc' | 'price-desc'>('discount');

  const saleProducts = products
    .filter((p) => p.salePrice !== undefined)
    .filter((p) => selectedFinish === 'All' || p.finish === selectedFinish)
    .sort((a, b) => {
      const discountA = a.price - (a.salePrice ?? a.price);
      const discountB = b.price - (b.salePrice ?? b.price);
      if (sortBy === 'discount') return discountB - discountA;
      if (sortBy === 'price-asc') return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
    });

  const finishes = ['All', ...new Set(products.filter((p) => p.salePrice).map((p) => p.finish))];

  return (
    <div className="pt-28 pb-24 bg-[#FBF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="bg-[#FAF7F4] border border-[#EEE8E1] rounded-xs p-8 sm:p-12 mb-10 text-center relative overflow-hidden shadow-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C2566B]/10 text-[#C2566B] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Showroom Liquidation · Up to 40% Off</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1B1F] tracking-tight mb-3">
            Clearance & Vault Ex-Display
          </h1>
          <p className="text-sm sm:text-base text-[#6B6670] max-w-xl mx-auto leading-relaxed">
            Limited stock on premier showroom display models and seasonal discontinuations. All items carry our full 12-month structural guarantee.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white border border-[#EEE8E1] rounded-xs p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#6B6670] mr-1 font-medium">Finish:</span>
            {finishes.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFinish(f)}
                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                  selectedFinish === f
                    ? 'bg-[#C2566B] text-white border-[#C2566B]'
                    : 'bg-[#FBF9F6] text-[#6B6670] border-[#EEE8E1] hover:border-[#C2566B]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#6B6670]">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FBF9F6] border border-[#EEE8E1] rounded-xs px-3 py-1.5 text-xs text-[#1C1B1F] focus:outline-hidden"
            >
              <option value="discount">Biggest Savings</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
