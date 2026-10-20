import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, LayoutGrid, List, X, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products, Product } from '../data/products';
import { collections } from '../data/collections';
import { ProductCard } from '../components/product/ProductCard';
import { formatPrice } from '../lib/formatPrice';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { SmartImage } from '../components/ui/SmartImage';

export const ShopPage: React.FC = () => {
  useDocumentTitle('All Glam Furniture Collections', 'Shop Britain\'s finest selection of mirrored tables, crushed crystal fireplaces, and velvet dining suites.');

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCollection = searchParams.get('collection') || 'All';

  // Filter States
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [selectedFinish, setSelectedFinish] = useState<string>('All');
  const [selectedColour, setSelectedColour] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [onlySale, setOnlySale] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Available unique finishes and colours
  const finishes = ['All', 'Mirrored', 'Crushed Diamond', 'Velvet', 'Marble', 'Chrome', 'Glass'];
  const colours = ['All', 'Silver Mirror', 'Crystal Silver', 'Grey Velvet', 'Blush Pink', 'Champagne Gold'];

  // Handle URL query changes
  const handleCollectionChange = (slug: string) => {
    setSelectedCollection(slug);
    if (slug === 'All') {
      searchParams.delete('collection');
    } else {
      searchParams.set('collection', slug);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    setSelectedCollection('All');
    setSelectedFinish('All');
    setSelectedColour('All');
    setMaxPrice(2000);
    setOnlySale(false);
    searchParams.delete('collection');
    setSearchParams(searchParams);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCol =
          selectedCollection === 'All' || p.collectionSlug === selectedCollection;
        const matchesFinish =
          selectedFinish === 'All' || p.finish === selectedFinish;
        const matchesColour =
          selectedColour === 'All' || p.colours.some((c) => c.toLowerCase().includes(selectedColour.toLowerCase().replace(' velvet', '').replace(' mirror', '')));
        const actualPrice = p.salePrice ?? p.price;
        const matchesPrice = actualPrice <= maxPrice;
        const matchesSale = onlySale ? p.salePrice !== undefined : true;

        return matchesCol && matchesFinish && matchesColour && matchesPrice && matchesSale;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [selectedCollection, selectedFinish, selectedColour, maxPrice, onlySale, sortBy]);

  const activeFilterCount =
    (selectedCollection !== 'All' ? 1 : 0) +
    (selectedFinish !== 'All' ? 1 : 0) +
    (selectedColour !== 'All' ? 1 : 0) +
    (maxPrice < 2000 ? 1 : 0) +
    (onlySale ? 1 : 0);

  return (
    <div className="pt-24 sm:pt-28 pb-28 bg-[#FBF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-6 sm:mb-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-medium mb-1.5">
            <span>Catalogue</span>
            <span>·</span>
            <span>The Furniture Guy</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#1C1B1F] tracking-tight">
            Complete Glam Furniture Suite
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#6B6670] mt-1.5 sm:mt-2 max-w-2xl font-light">
            Browse our full repertoire of hand-finished mirrored storage, diamond crush electric fireplaces, and opulent velvet dining suites.
          </p>
        </div>

        {/* Top Control Bar: Count, Sort, Grid Toggle */}
        <div className="bg-white border border-[#EEE8E1] rounded-xs p-3 sm:p-4 mb-6 sm:mb-8 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B6670] font-sans">
              <strong className="text-[#1C1B1F]">{filteredProducts.length}</strong> pieces
            </span>
            {activeFilterCount > 0 && (
              <span className="text-[10px] bg-[#FAF6F0] border border-[#E8DFD5] text-[#966C3E] px-2 py-0.5 rounded-full font-semibold">
                {activeFilterCount} active
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Select */}
            <div className="flex items-center gap-1.5 text-xs text-[#6B6670]">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FBF9F6] border border-[#EEE8E1] rounded-xs px-2.5 py-1.5 text-xs text-[#1C1B1F] focus:outline-hidden focus:border-[#C9A27E]"
              >
                <option value="featured">Featured & Bestselling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

            {/* View Mode Toggle (desktop/tablet) */}
            <div className="hidden sm:flex items-center border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-xs transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-[#1C1B1F] shadow-xs' : 'text-[#8E8A94]'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-xs transition-colors ${
                  viewMode === 'list' ? 'bg-white text-[#1C1B1F] shadow-xs' : 'text-[#8E8A94]'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white border border-[#EEE8E1] rounded-xs p-6 space-y-6 shadow-xs sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#EEE8E1]">
              <h3 className="font-serif text-lg font-medium text-[#1C1B1F]">
                Refine Selection
              </h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#C9A27E] hover:underline"
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Collection Filter */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1B1F] mb-3">
                Collection
              </label>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => handleCollectionChange('All')}
                  className={`w-full text-left py-1.5 px-2 rounded-xs transition-colors flex items-center justify-between min-h-[40px] ${
                    selectedCollection === 'All'
                      ? 'bg-[#FAF6F0] text-[#1C1B1F] font-semibold'
                      : 'text-[#6B6670] hover:text-[#1C1B1F]'
                  }`}
                >
                  <span>All Pieces</span>
                  <span className="text-[11px] text-[#A8A4AE]">{products.length}</span>
                </button>
                {collections.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => handleCollectionChange(col.slug)}
                    className={`w-full text-left py-1.5 px-2 rounded-xs transition-colors flex items-center justify-between min-h-[40px] ${
                      selectedCollection === col.slug
                        ? 'bg-[#FAF6F0] text-[#1C1B1F] font-semibold'
                        : 'text-[#6B6670] hover:text-[#1C1B1F]'
                    }`}
                  >
                    <span>{col.title}</span>
                    <span className="text-[11px] text-[#A8A4AE]">{col.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Finish Filter */}
            <div className="pt-4 border-t border-[#EEE8E1]">
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1B1F] mb-3">
                Finish & Texture
              </label>
              <div className="flex flex-wrap gap-1.5">
                {finishes.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFinish(f)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all min-h-[36px] ${
                      selectedFinish === f
                        ? 'bg-[#1C1B1F] text-white border-[#1C1B1F]'
                        : 'bg-white text-[#6B6670] border-[#EEE8E1] hover:border-[#C9A27E]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="pt-4 border-t border-[#EEE8E1]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#1C1B1F]">
                  Maximum Price
                </label>
                <span className="font-sans text-xs font-semibold text-[#1C1B1F]">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C9A27E] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#A8A4AE] mt-1">
                <span>£100</span>
                <span>£2,000</span>
              </div>
            </div>

            {/* Sale Only Toggle */}
            <div className="pt-4 border-t border-[#EEE8E1]">
              <label className="flex items-center gap-2 cursor-pointer select-none min-h-[44px]">
                <input
                  type="checkbox"
                  checked={onlySale}
                  onChange={(e) => setOnlySale(e.target.checked)}
                  className="rounded-xs text-[#C2566B] focus:ring-[#C2566B] h-4 w-4"
                />
                <span className="text-xs font-medium text-[#1C1B1F]">
                  Show Clearance & Sale Only
                </span>
              </label>
            </div>
          </aside>

          {/* Product Grid / List Display (9 cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#EEE8E1] rounded-xs p-8 shadow-xs">
                <Sparkles className="w-10 h-10 text-[#C9A27E] mx-auto mb-3" />
                <h3 className="font-serif text-2xl text-[#1C1B1F] mb-2">
                  No furniture matches these exact criteria
                </h3>
                <p className="text-sm text-[#6B6670] max-w-md mx-auto mb-6">
                  Try broadening your price range, clearing specific finish filters, or view all collections.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs active:scale-95"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* Responsive Product Grid: 2 columns on mobile, 3 on tablet/desktop */
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-2.5 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-[#EEE8E1] rounded-xs p-3 sm:p-4 flex flex-col sm:flex-row gap-4 sm:gap-6 hover:border-[#D9A89A] transition-all shadow-xs"
                  >
                    <div className="w-full sm:w-48 aspect-[4/3] rounded-xs overflow-hidden shrink-0 bg-[#F5F5F7]">
                      <SmartImage
                        src={product.images[0]}
                        alt={product.name}
                        fallbackTitle={product.name}
                        aspectRatio="auto"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#6B6670] mb-1">
                          <span>{product.collectionName}</span>
                          <span>·</span>
                          <span>{product.finish}</span>
                        </div>
                        <Link to={`/product/${product.slug}`}>
                          <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1C1B1F] hover:text-[#966C3E] transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-[#6B6670] line-clamp-2 mt-1 sm:mt-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-3 sm:pt-4 flex items-center justify-between border-t border-[#F2ECE4] mt-3">
                        <div className="flex items-baseline gap-2">
                          <span className="font-sans font-semibold text-base sm:text-lg text-[#1C1B1F]">
                            {formatPrice(product.salePrice ?? product.price)}
                          </span>
                          {product.salePrice && (
                            <span className="text-xs text-[#8E8A94] line-through">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>

                        <Link
                          to={`/product/${product.slug}`}
                          className="px-4 py-2 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs hover:opacity-90 transition-opacity active:scale-95"
                        >
                          View Details &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky "Filter & Sort" Button on Mobile */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 lg:hidden mb-safe">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="px-5 py-3 rounded-full bg-[#1C1B1F] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-white/20 active:scale-95 transition-transform"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#C9A27E]" />
          <span>Filter & Sort {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
        </button>
      </div>

      {/* Mobile Filter Bottom-Sheet Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="absolute inset-0 bg-[#1C1B1F]/50 backdrop-blur-xs"
            />
            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl max-h-[85dvh] flex flex-col shadow-2xl pb-safe"
            >
              {/* Handlebar & Header */}
              <div className="p-4 border-b border-[#EEE8E1] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl font-medium text-[#1C1B1F]">
                    Filter & Refine
                  </h3>
                  {activeFilterCount > 0 && (
                    <span className="text-[10px] bg-[#FAF6F0] text-[#966C3E] px-2 py-0.5 rounded-full font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-[#C9A27E] hover:underline"
                    >
                      Reset
                    </button>
                  )}
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="w-10 h-10 rounded-full border border-[#EEE8E1] flex items-center justify-center text-[#1C1B1F] active:scale-90"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Filter Content */}
              <div className="p-5 overflow-y-auto space-y-6 flex-1">
                {/* Collections */}
                <div>
                  <span className="text-xs uppercase font-semibold text-[#1C1B1F] block mb-2">
                    Collection
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    <button
                      onClick={() => handleCollectionChange('All')}
                      className={`p-2.5 rounded-xs border text-left min-h-[44px] flex items-center justify-between ${
                        selectedCollection === 'All'
                          ? 'bg-[#1C1B1F] text-white border-[#1C1B1F] font-semibold'
                          : 'bg-[#FBF9F6] text-[#6B6670] border-[#EEE8E1]'
                      }`}
                    >
                      <span>All Pieces</span>
                      {selectedCollection === 'All' && <Check className="w-3.5 h-3.5" />}
                    </button>
                    {collections.map((col) => (
                      <button
                        key={col.id}
                        onClick={() => handleCollectionChange(col.slug)}
                        className={`p-2.5 rounded-xs border text-left min-h-[44px] flex items-center justify-between ${
                          selectedCollection === col.slug
                            ? 'bg-[#1C1B1F] text-white border-[#1C1B1F] font-semibold'
                            : 'bg-[#FBF9F6] text-[#6B6670] border-[#EEE8E1]'
                        }`}
                      >
                        <span className="truncate">{col.title}</span>
                        {selectedCollection === col.slug && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Finish */}
                <div className="pt-4 border-t border-[#EEE8E1]">
                  <span className="text-xs uppercase font-semibold text-[#1C1B1F] block mb-2">
                    Finish & Texture
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {finishes.map((f) => (
                      <button
                        key={f}
                        onClick={() => setSelectedFinish(f)}
                        className={`px-3.5 py-2 text-xs rounded-full border min-h-[40px] ${
                          selectedFinish === f
                            ? 'bg-[#1C1B1F] text-white border-[#1C1B1F] font-semibold'
                            : 'bg-[#FBF9F6] text-[#6B6670] border-[#EEE8E1]'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div className="pt-4 border-t border-[#EEE8E1]">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span>Max Price:</span>
                    <span className="font-bold text-[#1C1B1F]">{formatPrice(maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#C9A27E] h-2"
                  />
                  <div className="flex justify-between text-[11px] text-[#A8A4AE] mt-1">
                    <span>£100</span>
                    <span>£2,000</span>
                  </div>
                </div>

                {/* Sale Toggle */}
                <div className="pt-4 border-t border-[#EEE8E1]">
                  <label className="flex items-center gap-3 cursor-pointer select-none min-h-[44px]">
                    <input
                      type="checkbox"
                      checked={onlySale}
                      onChange={(e) => setOnlySale(e.target.checked)}
                      className="rounded-xs text-[#C2566B] focus:ring-[#C2566B] h-5 w-5"
                    />
                    <span className="text-xs font-semibold text-[#1C1B1F]">
                      Show Clearance & Sale Items Only
                    </span>
                  </label>
                </div>
              </div>

              {/* Bottom Sheet CTA */}
              <div className="p-4 border-t border-[#EEE8E1] bg-[#FAF7F4] shrink-0">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full py-3.5 bg-luxe-gradient text-[#1C1B1F] text-xs font-bold rounded-xs shadow-md active:scale-[0.98]"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
