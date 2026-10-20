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
    <section className="py-20 bg-[#FBF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Collections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1F] tracking-tight">
              Curated by aesthetic & finish
            </h2>
          </div>
          <Link
            to="/shop"
            className="group mt-4 md:mt-0 text-sm font-semibold text-[#1C1B1F] hover:text-[#C9A27E] flex items-center gap-1.5 transition-colors"
          >
            <span>Explore All 8 Suites</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Large Bento Tile (Spans 7 cols, tall) */}
          <Link
            to={`/collections/${primary.slug}`}
            className="group relative md:col-span-7 aspect-[4/3] md:aspect-auto md:min-h-[500px] rounded-xs overflow-hidden bg-[#F5F5F7] border border-[#EEE8E1] flex flex-col justify-end p-8"
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
              <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-2">
                {primary.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-md line-clamp-2 mb-4 font-light">
                {primary.description}
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#E8D3B9] group-hover:text-white transition-colors">
                Discover Collection ({primary.itemCount} pieces) &rarr;
              </span>
            </div>
          </Link>

          {/* Right Column Stack (5 cols) */}
          <div className="md:col-span-5 grid grid-cols-1 gap-6">
            {/* Tile 2: Crushed Diamond */}
            <Link
              to={`/collections/${secondary.slug}`}
              className="group relative aspect-[16/9] md:aspect-auto md:min-h-[238px] rounded-xs overflow-hidden bg-[#F5F5F7] border border-[#EEE8E1] flex flex-col justify-end p-6"
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
                <h3 className="font-serif text-xl sm:text-2xl font-medium mb-1">
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
              className="group relative aspect-[16/9] md:aspect-auto md:min-h-[238px] rounded-xs overflow-hidden bg-[#F5F5F7] border border-[#EEE8E1] flex flex-col justify-end p-6"
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
                <h3 className="font-serif text-xl sm:text-2xl font-medium mb-1">
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
            className="group relative md:col-span-6 aspect-[16/9] rounded-xs overflow-hidden bg-[#F5F5F7] border border-[#EEE8E1] flex flex-col justify-end p-6"
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
              <h3 className="font-serif text-xl sm:text-2xl font-medium mb-1">
                {tertiary.title}
              </h3>
              <span className="text-xs font-semibold text-[#E8D3B9] flex items-center gap-1">
                Explore Dining Suites &rarr;
              </span>
            </div>
          </Link>

          <Link
            to={`/collections/${fourth.slug}`}
            className="group relative md:col-span-6 aspect-[16/9] rounded-xs overflow-hidden bg-[#F5F5F7] border border-[#EEE8E1] flex flex-col justify-end p-6"
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
              <h3 className="font-serif text-xl sm:text-2xl font-medium mb-1">
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
