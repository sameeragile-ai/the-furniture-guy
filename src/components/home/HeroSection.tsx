import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { SmartImage } from '../ui/SmartImage';

export const HeroSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-hero-radial bg-grain"
    >
      {/* Decorative ambient gradient blooms */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#F7E7E1]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#ECEAF2]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/70 backdrop-blur-xs border border-[#EEE8E1] rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A27E]" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#1C1B1F]">
                Glam Furniture · Est. UK
              </span>
            </div>

            {/* Serif Headline with Shimmer sweep */}
            <div className="relative overflow-hidden">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1B1F] tracking-tight leading-[1.08] font-normal">
                Furniture that catches{' '}
                <span className="relative inline-block italic font-medium text-luxe-gradient">
                  the light.
                  <motion.span
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.8, delay: 0.6, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none"
                  />
                </span>
              </h1>
            </div>

            {/* Editorial copy */}
            <p className="text-base sm:text-lg text-[#6B6670] leading-relaxed max-w-xl font-sans font-light">
              Transform your living spaces with hand-finished bevelled mirrors, crushed diamond fireplaces, and sculpted velvet dining suites. Uncompromising British glam delivered directly to your room of choice.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/shop"
                className="group px-7 py-3.5 bg-luxe-gradient text-[#1C1B1F] text-sm font-semibold rounded-xs shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/book"
                className="px-6 py-3.5 bg-white/80 backdrop-blur-xs border border-[#D9A89A] hover:border-[#1C1B1F] text-[#1C1B1F] text-sm font-medium rounded-xs hover:bg-white transition-all flex items-center gap-2 shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#C9A27E]" />
                <span>Book a Showroom Visit</span>
              </Link>
            </div>

            {/* Micro trust row */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#6B6670]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A27E]" />
                <span>Free delivery over £499</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A27E]" />
                <span>Two-man handling</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A27E]" />
                <span>Pay on delivery option</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Layered Asymmetric Parallax Imagery */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-6">
            {/* Background mirrored display cabinet hero */}
            <motion.div
              style={{
                transform: `translate(${mousePos.x * -16}px, ${mousePos.y * -16}px)`,
              }}
              className="relative w-full max-w-md lg:max-w-none aspect-[4/5] rounded-xs overflow-hidden shadow-2xl border border-white/60 bg-[#F5F5F7]"
            >
              <SmartImage
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Venice mirrored display cabinet and glam living room"
                fallbackTitle="The Furniture Guy Glam Showroom"
                aspectRatio="auto"
                className="w-full h-full"
                imageClassName="scale-103 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Layered Overlapping Velvet & Chrome Accent Piece */}
            <motion.div
              style={{
                transform: `translate(${mousePos.x * 24}px, ${mousePos.y * 24}px)`,
              }}
              className="absolute -bottom-6 -left-6 sm:-left-10 w-48 sm:w-60 aspect-[4/5] rounded-xs overflow-hidden shadow-2xl border-4 border-white hidden sm:block bg-[#F5F5F7]"
            >
              <SmartImage
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
                alt="Valentina sculpted velvet chair"
                fallbackTitle="Velvet & Chrome Seating"
                aspectRatio="auto"
                className="w-full h-full"
              />
            </motion.div>

            {/* Floating Glass Social Proof Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
              }}
              className="absolute top-6 -right-2 sm:right-4 glass-card px-4 py-3 rounded-xs border border-white shadow-xl flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-luxe-gradient flex items-center justify-center text-[#1C1B1F] shrink-0 font-bold">
                <Star className="w-5 h-5 fill-[#1C1B1F]" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-sans font-bold text-sm text-[#1C1B1F]">4.9 / 5.0</span>
                  <div className="flex text-[#C9A27E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#C9A27E]" />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-[#6B6670] font-medium">
                  300+ Happy UK Homes Reviewed
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
