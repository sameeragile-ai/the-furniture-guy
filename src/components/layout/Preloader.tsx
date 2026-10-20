import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { siteConfig } from '../../config/site';

export const Preloader: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('tfg_preloader_shown');
    if (!hasLoaded) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('tfg_preloader_shown', 'true');
      }, 1100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#FBF9F6] flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1C1B1F]">
              {siteConfig.businessName}
            </span>
            <span className="block text-[11px] uppercase tracking-[0.25em] text-[#C9A27E] font-semibold mt-1">
              {siteConfig.subBrand}
            </span>

            {/* Shimmer line */}
            <div className="w-36 h-[2px] bg-[#EEE8E1] rounded-full mx-auto mt-4 overflow-hidden relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full bg-luxe-gradient"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
