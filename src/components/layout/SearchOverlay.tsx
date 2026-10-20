import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../../data/products';
import { collections } from '../../data/collections';
import { formatPrice } from '../../lib/formatPrice';
import { SmartImage } from '../ui/SmartImage';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedFinish, setSelectedFinish] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedFinish('All');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const finishes = ['All', 'Mirrored', 'Crushed Diamond', 'Velvet', 'Marble', 'Chrome', 'Glass'];

  const filteredProducts = products.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.collectionName.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());
    const matchesFinish = selectedFinish === 'All' || p.finish === selectedFinish;
    return matchesQuery && matchesFinish;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#FBF9F6]/95 backdrop-blur-xl overflow-y-auto"
        >
          <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen flex flex-col">
            {/* Header with Close */}
            <div className="flex items-center justify-between pb-8 border-b border-[#EEE8E1]">
              <span className="text-xs uppercase tracking-[0.2em] text-[#6B6670] font-medium">
                Live Showroom Search
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-[#EEE8E1] hover:border-[#1C1B1F] flex items-center justify-center text-[#1C1B1F] transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Big Search Input */}
            <div className="relative my-8">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-[#C9A27E]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search mirrored consoles, crushed diamond fireplaces, velvet chairs..."
                className="w-full bg-transparent pl-12 pr-4 py-4 text-2xl md:text-3xl font-serif text-[#1C1B1F] placeholder:text-[#A8A4AE] focus:outline-hidden border-b-2 border-transparent focus:border-[#C9A27E] transition-colors"
              />
            </div>

            {/* Quick Finish Filters */}
            <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-[#EEE8E1]">
              <span className="text-xs text-[#6B6670] mr-2 font-medium">Finish:</span>
              {finishes.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFinish(f)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                    selectedFinish === f
                      ? 'bg-[#1C1B1F] text-[#FBF9F6]'
                      : 'bg-white border border-[#EEE8E1] text-[#6B6670] hover:border-[#C9A27E] hover:text-[#1C1B1F]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Results Grid */}
            <div className="flex-1 py-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs uppercase tracking-wider text-[#6B6670]">
                  Showing {filteredProducts.length} matching piece{filteredProducts.length === 1 ? '' : 's'}
                </p>
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-xs text-[#C9A27E] hover:underline"
                  >
                    Clear search
                  </button>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white border border-[#EEE8E1] rounded-sm p-8">
                  <p className="font-serif text-2xl text-[#1C1B1F] mb-2">No items match your search</p>
                  <p className="text-sm text-[#6B6670] max-w-md mx-auto mb-6">
                    Try searching for "fireplace", "console", "mirrored", or browse our curated collections.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {collections.slice(0, 4).map((c) => (
                      <Link
                        key={c.id}
                        to={`/collections/${c.slug}`}
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-medium bg-[#FBF9F6] border border-[#EEE8E1] hover:border-[#1C1B1F] transition-colors"
                      >
                        {c.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.slice(0, 9).map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      onClick={onClose}
                      className="group flex gap-4 p-3 bg-white border border-[#EEE8E1] hover:border-[#C9A27E] transition-all rounded-xs hover:shadow-xs"
                    >
                      <div className="w-24 h-24 shrink-0 rounded-xs overflow-hidden">
                        <SmartImage
                          src={product.images[0]}
                          alt={product.name}
                          fallbackTitle={product.name}
                          aspectRatio="square"
                          imageClassName="group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-[#C9A27E] font-medium block truncate">
                            {product.collectionName}
                          </span>
                          <h4 className="font-serif text-base text-[#1C1B1F] line-clamp-1 group-hover:text-[#966C3E] transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-xs text-[#6B6670] mt-0.5 block">
                            Finish: {product.finish}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-baseline gap-2">
                            <span className="font-sans font-semibold text-sm text-[#1C1B1F]">
                              {formatPrice(product.salePrice ?? product.price)}
                            </span>
                            {product.salePrice && (
                              <span className="text-xs text-[#6B6670] line-through">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#C9A27E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            View <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
