import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { collections } from '../../data/collections';
import { SmartImage } from '../ui/SmartImage';

export const CollectionBentoGrid: React.FC = () => {
  const featured = collections.slice(0, 5);
  const primary = featured[0]; // Mirrored Furniture (big tile)
  const secondary = featured[1]; // Crushed Diamond
  const tertiary = featured[2]; // Dining Sets
  const fourth = featured[3]; // Living Room & TV Units
  const fifth = featured[4]; // Fireplaces

  return (
    <section className="py-14 sm:py-20 bg-[#FBF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Collections</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1B1F] tracking-tight">
              Curated by aesthetic & finish
            </h2>
          </div>
          <Link
            to="/shop"
            className="group mt-3 sm:mt-0 text-xs sm:text-sm font-semibold text-[#1C1B1F] hover:text-[#C9A27E] flex items-center gap-1.5 transition-colors"
          >
            <span>Explore All 8 Suites</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile View: Horizontal Touch-Swipeable Carousel with Scroll-Snap & partial card visible */}
        <div className="md:hidden flex overflow-x-auto no-scrollbar snap-carousel gap-3.5 pb-4 -mx-4 px-4">
          {collections.map((col) => (
            <Link
              key={col.id}
              to={`/collections/${col.slug}`}
              className="snap-item w-[78vw] max-w-[310px] shrink-0 relative aspect-[4/5] rounded-xs overflow-hidden bg-[#F5F5F7] border border-[#EEE8E1] flex flex-col justify-end p-5 active:scale-[0.98] transition-transform"
            >
              <div className="absolute inset-0 z-0">
                <SmartImage
                  src={col.image}
                  alt={col.title}
                  fallbackTitle={col.title}
                  aspectRatio="auto"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1F]/85 via-[#1C1B1F]/30 to-transparent" />
              </div>

              <div className="relative z-10 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D3B9] font-medium block mb-1">
                  {col.subtitle}
                </span>
                <h3 className="font-serif text-xl font-medium mb-1.5">
                  {col.title}
                </h3>
                <p className="text-xs text-white/80 line-clamp-2 mb-3 font-light">
                  {col.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8D3B9]">
                  Discover ({col.itemCount} pieces) &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop View: Asymmetric Bento Grid */}
        <div className="hidden md:grid grid-cols-12 gap-6">
          {/* Main Large Bento Tile (Spans 7 cols, tall) */}
          <Link
            to={`/collections/${primary.slug}`}
            className="group relative col-span-7 aspect-auto min-h-[500px] rounded-xs overflow-hidden bg-[#F5F5F7] border border-[#EEE8E1] flex flex-col justify-end p-8"
          >
            <div className="absolute inset-0 z-0">
              <SmartImage
                src={primary.image}
                alt={primary.title}
                fallbackTitle={primary.title}
                aspectRatio="auto"
                className="w-full h-full"
                imageClassName="group-hover:scale-106 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1F]/80 via-[#1C1B1F]/30 to-transparent" />
            </div>

            <div className="relative z-10 text-white transition-transform duration-300 group-hover:-translate-y-1">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#E8D3B9] font-medium block mb-1">
                {primary.subtitle}
              </span>
              <h3 className="font-serif text-3xl font-medium mb-2">
                {primary.title}
              </h3>
              <p className="text-sm text-white/80 max-w-md line-clamp-2 mb-4 font-light">
                {primary.description}
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#E8D3B9] group-hover:text-white transition-colors">
                Discover Collection ({primary.itemCount} pieces) &rarr;
              </span>
            </div>
          </Link>

          {/* Right Column Stack (5 cols) */}
          <div className="col-span-5 grid grid-cols-1 gap-6">
            {/* Tile 2: Crushed Diamond */}
            <Link
              to={`/collections/${secondary.slug}`}
              className="group relative aspect-auto min-h-[238px] rounded-xs overflow-hidden bg-[#F5F5F7] border border-[#EEE8E1] flex flex-col justify-end p-6"
            >
              <div className="absolute inset-0 z-0">
                <SmartImage
                  src={secondary.image}
                  alt={secondary.title}
                  fallbackTitle={secondary.title}
                  aspectRatio="auto"
                  className="w-full h-full"
                  imageClassName="group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1F]/75 via-[#1C1B1F]/20 to-transparent" />
              </div>
              <div className="relative z-10 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D3B9] block mb-1">
                  {secondary.subtitle}
                </span>
                <h3 className="font-serif text-2xl font-medium mb-1">
                  {secondary.title}
                </h3>
                <span className="text-xs font-semibold text-[#E8D3B9] flex items-center gap-1">
                  View Collection &rarr;
                </span>
              </div>
            </Link>

            {/* Tile 3: Fireplaces */}
            <Link
              to={`/collections/${fifth.slug}`}
              className="group relative aspect-auto min-h-[238px] rounded-xs overflow-hidden bg-[#F5F5F7] border border-[#EEE8E1] flex flex-col justify-end p-6"
            >
              <div className="absolute inset-0 z-0">
                <SmartImage
                  src={fifth.image}
                  alt={fifth.title}
                  fallbackTitle={fifth.title}
                  aspectRatio="auto"
                  className="w-full h-full"
                  imageClassName="group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1F]/75 via-[#1C1B1F]/20 to-transparent" />
              </div>
              <div className="relative z-10 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D3B9] block mb-1">
                  {fifth.subtitle}
                </span>
                <h3 className="font-serif text-2xl font-medium mb-1">
                  {fifth.title}
                </h3>
                <span className="text-xs font-semibold text-[#E8D3B9] flex items-center gap-1">
                  View Collection &rarr;
                </span>
              </div>
            </Link>
          </div>

          {/* Bottom Row (6 cols + 6 cols) */}
          <Link
            to={`/collections/${tertiary.slug}`}
            className="group relative col-span-6 aspect-[16/9] rounded-xs overflow-hidden bg-[#F5F5F7] border border-[#EEE8E1] flex flex-col justify-end p-6"
          >
            <div className="absolute inset-0 z-0">
              <SmartImage
                src={tertiary.image}
                alt={tertiary.title}
                fallbackTitle={tertiary.title}
                aspectRatio="auto"
                className="w-full h-full"
                imageClassName="group-hover:scale-106 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1F]/75 via-[#1C1B1F]/20 to-transparent" />
            </div>
            <div className="relative z-10 text-white">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D3B9] block mb-1">
                {tertiary.subtitle}
              </span>
              <h3 className="font-serif text-2xl font-medium mb-1">
                {tertiary.title}
              </h3>
              <span className="text-xs font-semibold text-[#E8D3B9] flex items-center gap-1">
                Explore Dining Suites &rarr;
              </span>
            </div>
          </Link>

          <Link
            to={`/collections/${fourth.slug}`}
            className="group relative col-span-6 aspect-[16/9] rounded-xs overflow-hidden bg-[#F5F5F7] border border-[#EEE8E1] flex flex-col justify-end p-6"
          >
            <div className="absolute inset-0 z-0">
              <SmartImage
                src={fourth.image}
                alt={fourth.title}
                fallbackTitle={fourth.title}
                aspectRatio="auto"
                className="w-full h-full"
                imageClassName="group-hover:scale-106 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1F]/75 via-[#1C1B1F]/20 to-transparent" />
            </div>
            <div className="relative z-10 text-white">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D3B9] block mb-1">
                {fourth.subtitle}
              </span>
              <h3 className="font-serif text-2xl font-medium mb-1">
                {fourth.title}
              </h3>
              <span className="text-xs font-semibold text-[#E8D3B9] flex items-center gap-1">
                Explore Living & TV Suites &rarr;
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
