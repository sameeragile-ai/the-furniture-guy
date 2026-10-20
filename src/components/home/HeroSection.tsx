import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { SmartImage } from '../ui/SmartImage';

export const HeroSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[90dvh] flex items-center pt-20 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-hero-radial bg-grain"
    >
      {/* Decorative ambient gradient blooms */}
      <div className="absolute top-1/4 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#F7E7E1]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#ECEAF2]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* On mobile: Flex col-reverse so the hero image is on top (around 50-55dvh), then content below */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Headline, Editorial & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:col-span-6 space-y-4 sm:space-y-6 text-center lg:text-left"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-xs border border-[#EEE8E1] rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A27E]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold text-[#1C1B1F]">
                Glam Furniture · Est. UK
              </span>
            </div>

            {/* Fluid Headline with Shimmer sweep */}
            <div className="relative overflow-hidden">
              <h1 className="font-serif text-[clamp(2.25rem,8vw,4.5rem)] text-[#1C1B1F] tracking-tight leading-[1.06] font-normal">
                Furniture that catches{' '}
                <span className="relative inline-block italic font-medium text-luxe-gradient">
                  the light.
                  <motion.span
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, delay: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none"
                  />
                </span>
              </h1>
            </div>

            {/* Editorial copy */}
            <p className="text-sm sm:text-base lg:text-lg text-[#6B6670] leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans font-light">
              Transform your living spaces with hand-finished bevelled mirrors, crushed diamond fireplaces, and sculpted velvet dining suites. Uncompromising British glam delivered directly to your room of choice.
            </p>

            {/* Action Buttons: Full width on mobile (< sm), side-by-side on desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-7 py-3.5 min-h-[46px] bg-luxe-gradient text-[#1C1B1F] text-sm font-semibold rounded-xs shadow-md hover:shadow-lg active:scale-[0.97] transition-all flex items-center justify-center gap-2"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/book"
                className="w-full sm:w-auto px-6 py-3.5 min-h-[46px] bg-white/90 backdrop-blur-xs border border-[#D9A89A] hover:border-[#1C1B1F] text-[#1C1B1F] text-sm font-medium rounded-xs hover:bg-white active:scale-[0.97] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#C9A27E]" />
                <span>Book a Showroom Visit</span>
              </Link>
            </div>

            {/* Micro trust row */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#6B6670]">
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

          {/* Hero Image Stage: ~50-55dvh on mobile, layered on desktop */}
          <div className="w-full lg:col-span-6 relative flex justify-center items-center py-2 sm:py-6">
            {/* Primary Display Cabinet & Living Room Hero */}
            <motion.div
              style={
                isDesktop
                  ? {
                      transform: `translate(${mousePos.x * -16}px, ${mousePos.y * -16}px)`,
                    }
                  : undefined
              }
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-none h-[48dvh] sm:h-[55dvh] lg:h-auto lg:aspect-[4/5] rounded-xs overflow-hidden shadow-xl sm:shadow-2xl border border-white/80 bg-[#F5F5F7]"
            >
              <SmartImage
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Venice mirrored display cabinet and glam living room"
                fallbackTitle="The Furniture Guy Glam Showroom"
                aspectRatio="auto"
                priority={true}
                className="w-full h-full"
                imageClassName="scale-103 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Overlapping Velvet & Chrome Accent Piece (Desktop/Tablet) */}
            <motion.div
              style={
                isDesktop
                  ? {
                      transform: `translate(${mousePos.x * 24}px, ${mousePos.y * 24}px)`,
                    }
                  : undefined
              }
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-8 w-36 sm:w-56 aspect-[4/5] rounded-xs overflow-hidden shadow-2xl border-4 border-white hidden sm:block bg-[#F5F5F7]"
            >
              <SmartImage
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
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
              transition={{ delay: 0.3, duration: 0.5 }}
              style={
                isDesktop
                  ? {
                      transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
                    }
                  : undefined
              }
              className="absolute top-4 right-2 sm:top-6 sm:right-4 glass-card px-3 sm:px-4 py-2 sm:py-3 rounded-xs border border-white shadow-lg flex items-center gap-2.5 z-20"
            >
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-luxe-gradient flex items-center justify-center text-[#1C1B1F] shrink-0 font-bold">
                <Star className="w-4 sm:w-5 h-4 sm:h-5 fill-[#1C1B1F]" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-sans font-bold text-xs sm:text-sm text-[#1C1B1F]">4.9 / 5.0</span>
                  <div className="flex text-[#C9A27E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 sm:w-3 h-2.5 sm:h-3 fill-[#C9A27E]" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#6B6670] font-medium whitespace-nowrap">
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
