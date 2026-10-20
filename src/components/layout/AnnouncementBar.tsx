import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { siteConfig } from '../../config/site';

interface AnnouncementBarProps {
  onDismiss: () => void;
  isDismissed: boolean;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onDismiss, isDismissed }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isDismissed) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % siteConfig.announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <div className="relative bg-[#1C1B1F] text-[#FBF9F6] text-xs font-medium py-2 px-4 border-b border-[#2D2B33] z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-6 shrink-0" />
        
        <div className="overflow-hidden flex-1 flex justify-center text-center h-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E8D3B9] shrink-0" />
              <span className="font-sans font-light tracking-wider">
                {siteConfig.announcements[currentIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={onDismiss}
          className="w-6 h-6 flex items-center justify-center text-[#9994A0] hover:text-[#FFFFFF] transition-colors rounded-sm"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
