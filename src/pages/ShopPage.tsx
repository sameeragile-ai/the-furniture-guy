import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, LayoutGrid, List, X, Sparkles } from 'lucide-react';
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
    <div className="pt-28 pb-24 bg-[#FBF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-medium mb-2">
            <span>Catalogue</span>
            <span>·</span>
            <span>The Furniture Guy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1B1F] tracking-tight">
            Complete Glam Furniture Suite
          </h1>
          <p className="text-sm sm:text-base text-[#6B6670] mt-2 max-w-2xl font-light">
            Browse our full repertoire of hand-finished mirrored storage, diamond crush electric fireplaces, and opulent velvet dining suites.
          </p>
        </div>

        {/* Top Control Bar: Count, Sort, Mobile Filter Trigger, Grid Toggle */}
        <div className="bg-white border border-[#EEE8E1] rounded-xs p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden px-3.5 py-2 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xs text-xs font-semibold text-[#1C1B1F] flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C9A27E]" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>
            <span className="text-xs text-[#6B6670] font-sans">
              Showing <strong className="text-[#1C1B1F]">{filteredProducts.length}</strong> of {products.length} luxury pieces
            </span>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs text-[#6B6670]">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FBF9F6] border border-[#EEE8E1] rounded-xs px-3 py-1.5 text-xs text-[#1C1B1F] focus:outline-hidden focus:border-[#C9A27E]"
              >
                <option value="featured">Featured & Bestselling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

            {/* View Mode Toggle */}
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
                  className={`w-full text-left py-1 px-2 rounded-xs transition-colors flex items-center justify-between ${
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
                    className={`w-full text-left py-1 px-2 rounded-xs transition-colors flex items-center justify-between ${
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
                    className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
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
              <label className="flex items-center gap-2 cursor-pointer select-none">
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
              <div className="text-center py-24 bg-white border border-[#EEE8E1] rounded-xs p-8 shadow-xs">
                <Sparkles className="w-10 h-10 text-[#C9A27E] mx-auto mb-3" />
                <h3 className="font-serif text-2xl text-[#1C1B1F] mb-2">
                  No furniture matches these exact criteria
                </h3>
                <p className="text-sm text-[#6B6670] max-w-md mx-auto mb-6">
                  Try broadening your price range, clearing specific finish filters, or view all collections.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-[#EEE8E1] rounded-xs p-4 flex flex-col sm:flex-row gap-6 hover:border-[#D9A89A] transition-all shadow-xs"
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
                          <h3 className="font-serif text-xl font-medium text-[#1C1B1F] hover:text-[#966C3E] transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-[#6B6670] line-clamp-2 mt-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-4 flex items-center justify-between border-t border-[#F2ECE4] mt-4">
                        <div className="flex items-baseline gap-2">
                          <span className="font-sans font-semibold text-lg text-[#1C1B1F]">
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
                          className="px-4 py-2 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs hover:opacity-90 transition-opacity"
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

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="absolute inset-0 bg-[#1C1B1F]/40 backdrop-blur-xs"
            />
            <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-xs bg-white p-6 overflow-y-auto flex flex-col justify-between shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#EEE8E1] mb-6">
                    <h3 className="font-serif text-xl font-medium text-[#1C1B1F]">
                      Filters
                    </h3>
                    <button
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="p-1 text-[#1C1B1F]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Collections */}
                  <div className="mb-6">
                    <span className="text-xs uppercase font-semibold text-[#1C1B1F] block mb-2">
                      Collection
                    </span>
                    <div className="space-y-1 text-xs">
                      <button
                        onClick={() => handleCollectionChange('All')}
                        className={`w-full text-left py-1.5 px-2 rounded-xs ${
                          selectedCollection === 'All' ? 'bg-[#FAF6F0] font-semibold text-[#1C1B1F]' : 'text-[#6B6670]'
                        }`}
                      >
                        All Pieces
                      </button>
                      {collections.map((col) => (
                        <button
                          key={col.id}
                          onClick={() => handleCollectionChange(col.slug)}
                          className={`w-full text-left py-1.5 px-2 rounded-xs ${
                            selectedCollection === col.slug ? 'bg-[#FAF6F0] font-semibold text-[#1C1B1F]' : 'text-[#6B6670]'
                          }`}
                        >
                          {col.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Finish */}
                  <div className="mb-6 pt-4 border-t border-[#EEE8E1]">
                    <span className="text-xs uppercase font-semibold text-[#1C1B1F] block mb-2">
                      Finish
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {finishes.map((f) => (
                        <button
                          key={f}
                          onClick={() => setSelectedFinish(f)}
                          className={`px-3 py-1 text-xs rounded-full border ${
                            selectedFinish === f
                              ? 'bg-[#1C1B1F] text-white border-[#1C1B1F]'
                              : 'bg-white text-[#6B6670] border-[#EEE8E1]'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pt-4 border-t border-[#EEE8E1]">
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span>Max Price:</span>
                      <span>{formatPrice(maxPrice)}</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      step="50"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[#C9A27E]"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-[#EEE8E1]">
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="w-full py-3 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs"
                  >
                    Apply Filters ({filteredProducts.length} Results)
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
