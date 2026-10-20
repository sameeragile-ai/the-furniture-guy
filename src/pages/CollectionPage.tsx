import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { collections } from '../data/collections';
import { products } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SmartImage } from '../components/ui/SmartImage';

export const CollectionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const collection = collections.find((c) => c.slug === slug);

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedFinish, setSelectedFinish] = useState<string>('All');

  useDocumentTitle(
    collection ? `${collection.title} | Luxury Suites` : 'Collection Not Found',
    collection?.description
  );

  const matchingProducts = useMemo(() => {
    if (!collection) return [];
    return products
      .filter((p) => {
        const matchesCol = p.collectionSlug === collection.slug;
        const matchesFinish = selectedFinish === 'All' || p.finish === selectedFinish;
        return matchesCol && matchesFinish;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [collection, selectedFinish, sortBy]);

  if (!collection) {
    return <Navigate to="/shop" replace />;
  }

  const finishes = ['All', ...new Set(products.filter((p) => p.collectionSlug === collection.slug).map((p) => p.finish))];

  return (
    <div className="pt-24 pb-24 bg-[#FBF9F6]">
      {/* Hero Banner */}
      <div className="relative bg-[#1C1B1F] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <SmartImage
            src={collection.image}
            alt={collection.title}
            fallbackTitle={collection.title}
            aspectRatio="auto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1F] via-[#1C1B1F]/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#E8D3B9] font-medium mb-3">
            <Link to="/shop" className="hover:underline">Shop</Link>
            <span>/</span>
            <span>Collections</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight mb-3">
            {collection.title}
          </h1>
          <p className="text-sm sm:text-base text-[#DCDDE1] max-w-2xl leading-relaxed font-light">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Main Grid & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Filter & Sort Bar */}
        <div className="bg-white border border-[#EEE8E1] rounded-xs p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          {/* Finish pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-[#6B6670] mr-2 font-medium">Finish:</span>
            {finishes.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFinish(f)}
                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                  selectedFinish === f
                    ? 'bg-[#1C1B1F] text-white border-[#1C1B1F]'
                    : 'bg-[#FBF9F6] text-[#6B6670] border-[#EEE8E1] hover:border-[#C9A27E]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 text-xs text-[#6B6670]">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FBF9F6] border border-[#EEE8E1] rounded-xs px-3 py-1.5 text-xs text-[#1C1B1F] focus:outline-hidden focus:border-[#C9A27E]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {matchingProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#EEE8E1] rounded-xs p-8 shadow-xs">
            <p className="font-serif text-xl text-[#1C1B1F] mb-2">
              No pieces match this specific finish filter
            </p>
            <button
              onClick={() => setSelectedFinish('All')}
              className="mt-2 text-xs text-[#C9A27E] hover:underline"
            >
              Show all {collection.title}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {matchingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
