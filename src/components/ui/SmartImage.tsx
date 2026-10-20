import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto';
  className?: string;
  imageClassName?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallbackTitle,
  aspectRatio = 'square',
  className,
  imageClassName,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[4/5]',
    wide: 'aspect-[16/9]',
    auto: '',
  }[aspectRatio];

  if (hasError || !src) {
    return (
      <div
        className={cn(
          'relative overflow-hidden flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-[#F5F5F7] via-[#E8D3B9]/30 to-[#DCDDE1] border border-[#EEE8E1]',
          aspectClass,
          className
        )}
      >
        <div className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm border border-[#EEE8E1] flex items-center justify-center text-[#C9A27E] mb-3 shadow-xs">
          <Sparkles className="w-5 h-5" />
        </div>
        <p className="font-serif text-lg font-medium text-[#1C1B1F] line-clamp-2 max-w-[220px]">
          {fallbackTitle || alt || 'The Furniture Guy'}
        </p>
        <span className="text-[11px] uppercase tracking-widest text-[#6B6670] mt-1 font-sans">
          King of Bling · UK
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[#F5F5F7]',
        aspectClass,
        className
      )}
    >
      {/* Subtle skeleton shimmer before load */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F7] via-[#EDEBE8] to-[#F5F5F7] animate-pulse" />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          'w-full h-full object-cover transition-all duration-700 ease-out',
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-xs',
          imageClassName
        )}
        {...props}
      />
    </div>
  );
};
