import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../../data/products';
import { formatPrice } from '../../lib/formatPrice';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { SmartImage } from '../ui/SmartImage';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);
  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white border border-[#EEE8E1] hover:border-[#D9A89A] transition-all duration-300 rounded-xs overflow-hidden hover:shadow-md"
    >
      {/* Image Container with secondary hover reveal */}
      <Link to={`/product/${product.slug}`} className="relative block aspect-[4/5] bg-[#F5F5F7] overflow-hidden">
        {/* Shimmer sweep effect on card hover */}
        <div
          className={`absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ${
            isHovered ? 'translate-x-full' : '-translate-x-full'
          }`}
        />

        {/* Primary Image */}
        <div className={`w-full h-full transition-opacity duration-500 ${isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'}`}>
          <SmartImage
            src={product.images[0]}
            alt={product.name}
            fallbackTitle={product.name}
            aspectRatio="auto"
            className="w-full h-full"
            imageClassName="group-hover:scale-106 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Secondary Image Crossfade */}
        {product.images[1] && (
          <div className={`absolute inset-0 transition-opacity duration-500 hidden sm:block ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <SmartImage
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fallbackTitle={product.name}
              aspectRatio="auto"
              className="w-full h-full"
              imageClassName="scale-106 transition-transform duration-700 ease-out"
            />
          </div>
        )}

        {/* Badges: Sale or Bestseller */}
        <div className="absolute top-2 left-2 z-20 flex flex-col gap-1 items-start">
          {product.salePrice && (
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold bg-[#C2566B] text-white px-1.5 sm:px-2 py-0.5 rounded-xs shadow-xs">
              Save {discountPercent}%
            </span>
          )}
          {product.isBestseller && !product.salePrice && (
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold bg-[#1C1B1F] text-white px-1.5 sm:px-2 py-0.5 rounded-xs shadow-xs">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button: Min 44x44px touch target area */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-1 right-1 z-20 w-11 h-11 flex items-center justify-center transition-all active:scale-90`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xs transition-colors ${
              inWishlist
                ? 'bg-[#C2566B] text-white'
                : 'bg-white/85 backdrop-blur-xs text-[#1C1B1F] hover:bg-white'
            }`}
          >
            <Heart className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${inWishlist ? 'fill-white' : ''}`} />
          </div>
        </button>

        {/* Desktop Hover Quick Action Slide-up */}
        <div
          className={`absolute bottom-0 inset-x-0 p-2 sm:p-3 z-20 transition-all duration-300 hidden md:block ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex gap-2">
            <button
              onClick={handleQuickAdd}
              className="flex-1 py-2 px-3 bg-white text-[#1C1B1F] hover:bg-luxe-gradient text-xs font-semibold rounded-xs shadow-md border border-[#EEE8E1] transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </button>
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="w-8 h-8 bg-white/95 backdrop-blur-xs text-[#1C1B1F] hover:text-[#C9A27E] rounded-xs shadow-md border border-[#EEE8E1] flex items-center justify-center transition-colors active:scale-95"
                aria-label="Quick view"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </Link>

      {/* Metadata & Pricing */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Collection & Finish unboxed metadata */}
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#6B6670] mb-0.5 truncate">
            <span className="truncate">{product.collectionName}</span>
            <span aria-hidden="true">·</span>
            <span>{product.finish}</span>
          </div>

          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-xs sm:text-sm md:text-base font-medium text-[#1C1B1F] group-hover:text-[#966C3E] transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-[#F2ECE4] flex items-center justify-between gap-1">
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span className="font-sans font-bold text-xs sm:text-base text-[#1C1B1F] tabular-nums">
              {formatPrice(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-[10px] sm:text-xs text-[#8E8A94] line-through tabular-nums hidden sm:inline">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Quick add icon button on mobile, rating on desktop */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleQuickAdd}
              className="md:hidden w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#EEE8E1] flex items-center justify-center text-[#1C1B1F] active:scale-90"
              aria-label={`Quick add ${product.name} to basket`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C9A27E]" />
            </button>
            <div className="hidden md:flex items-center gap-1 text-xs text-[#6B6670]">
              <Star className="w-3.5 h-3.5 text-[#C9A27E] fill-[#C9A27E]" />
              <span className="font-medium text-[#1C1B1F] text-[11px]">{product.rating}</span>
              <span className="text-[10px]">({product.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
