import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { SmartImage } from '../ui/SmartImage';

export const EditorialFeature: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#1C1B1F] text-white overflow-hidden">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0 opacity-40">
        <SmartImage
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"
          alt="Crushed diamond luxury living room interior"
          fallbackTitle="The Crushed Diamond Edit"
          aspectRatio="auto"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1B1F] via-[#1C1B1F]/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xs border border-white/20 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#E8D3B9]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#E8D3B9] font-medium">
              Signature Craftsmanship
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight leading-[1.15]">
            The Crushed Diamond Edit
          </h2>

          <p className="text-sm sm:text-base text-[#DCDDE1] leading-relaxed font-light">
            Every piece in our signature Crushed Diamond collection features thousands of microscopic cut-glass crystals encrusted by hand beneath flawless glass seals. Designed specifically to respond dynamically to natural daylight and warm evening spotlights.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              to="/collections/crushed-diamond"
              className="px-7 py-3.5 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
            >
              <span>Explore The Diamond Suites</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/book"
              className="px-6 py-3.5 bg-transparent border border-white/30 hover:border-white text-white text-xs font-medium rounded-xs transition-colors"
            >
              Book Showroom Viewing
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
