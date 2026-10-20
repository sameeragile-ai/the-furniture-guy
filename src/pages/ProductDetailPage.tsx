import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Star,
  Truck,
  ShieldCheck,
  Heart,
  Clock,
  MessageCircle,
  PhoneCall,
  Check,
  Maximize2,
  X,
  Plus,
  Minus,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products, Product } from '../data/products';
import { formatPrice } from '../lib/formatPrice';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { siteConfig } from '../config/site';
import { SmartImage } from '../components/ui/SmartImage';
import { ProductCard } from '../components/product/ProductCard';
import { CallbackModal } from '../components/layout/CallbackModal';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColour, setSelectedColour] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'dimensions' | 'delivery' | 'care'>('description');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  useDocumentTitle(
    product ? `${product.name} | ${product.collectionName}` : 'Product Not Found',
    product?.description
  );

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedColour(product.colours[0] || '');
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  // Sync mobile swipe gallery with dot indicators
  const handleMobileScroll = () => {
    if (mobileGalleryRef.current) {
      const { scrollLeft, clientWidth } = mobileGalleryRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== activeImageIndex && index >= 0 && index < (product?.images.length || 1)) {
        setActiveImageIndex(index);
      }
    }
  };

  const scrollToImage = (index: number) => {
    setActiveImageIndex(index);
    if (mobileGalleryRef.current) {
      mobileGalleryRef.current.scrollTo({
        left: index * mobileGalleryRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const inWishlist = isInWishlist(product.id);
  const effectivePrice = product.salePrice ?? product.price;
  const savings = product.salePrice ? product.price - product.salePrice : 0;
  const savingsPercent = product.salePrice
    ? Math.round((savings / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColour);
  };

  const whatsappMessage = `Hi! I'm interested in the "${product.name}" (${formatPrice(effectivePrice)}) from your website: ${typeof window !== 'undefined' ? window.location.href : ''}`;

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.collectionSlug === product.collectionSlug || p.finish === product.finish))
    .slice(0, 4);

  return (
    <div className="pt-20 sm:pt-28 pb-32 bg-[#FBF9F6]">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        {/* Breadcrumb trail (hidden on small mobile to conserve space) */}
        <nav className="hidden sm:flex items-center gap-1.5 text-xs text-[#6B6670] mb-6 px-4 sm:px-0 font-sans">
          <Link to="/" className="hover:text-[#1C1B1F]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#C9A27E]" />
          <Link to="/shop" className="hover:text-[#1C1B1F]">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#C9A27E]" />
          <Link to={`/collections/${product.collectionSlug}`} className="hover:text-[#1C1B1F]">
            {product.collectionName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#C9A27E]" />
          <span className="text-[#1C1B1F] font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Product Purchase Module: Two-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Gallery: Mobile Swipeable Full-Width Carousel + Desktop Stage */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Mobile Full-Width Swipeable Gallery with snap & dot indicators */}
            <div className="sm:hidden relative">
              <div
                ref={mobileGalleryRef}
                onScroll={handleMobileScroll}
                className="flex overflow-x-auto no-scrollbar snap-carousel w-full aspect-[4/5] bg-[#F5F5F7]"
              >
                {product.images.map((img, idx) => (
                  <div key={idx} className="w-full shrink-0 snap-item h-full relative">
                    <SmartImage
                      src={img}
                      alt={`${product.name} - image ${idx + 1}`}
                      fallbackTitle={product.name}
                      aspectRatio="auto"
                      priority={idx === 0}
                      className="w-full h-full"
                      imageClassName="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Dot Indicators */}
              {product.images.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10 pointer-events-none">
                  {product.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeImageIndex === idx ? 'w-5 bg-[#1C1B1F]' : 'w-1.5 bg-[#1C1B1F]/30'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Wishlist button over mobile image */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1C1B1F] shadow-sm active:scale-90"
                aria-label="Save to wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-[#C2566B] text-[#C2566B]' : ''}`} />
              </button>

              {/* Sale Tag */}
              {product.salePrice && (
                <div className="absolute top-3 left-3 z-20 bg-[#C2566B] text-white text-[10px] font-bold px-2 py-1 rounded-xs uppercase tracking-wider">
                  Save {savingsPercent}%
                </div>
              )}
            </div>

            {/* Desktop Stage & Thumbnails (sm and up) */}
            <div className="hidden sm:block space-y-4">
              <div className="relative aspect-[4/3] sm:aspect-square bg-[#F5F5F7] border border-[#EEE8E1] rounded-xs overflow-hidden shadow-xs">
                <SmartImage
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  fallbackTitle={product.name}
                  aspectRatio="auto"
                  priority={true}
                  className="w-full h-full"
                  imageClassName="object-cover"
                />

                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-xs text-[#1C1B1F] hover:text-[#C9A27E] rounded-full shadow-md border border-[#EEE8E1] transition-colors"
                  aria-label="Enlarge image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {product.salePrice && (
                  <div className="absolute top-4 left-4 bg-[#C2566B] text-white text-xs font-bold px-2.5 py-1 rounded-xs uppercase tracking-wider shadow-xs">
                    Save {savingsPercent}% ({formatPrice(savings)})
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToImage(idx)}
                      className={`relative w-20 h-20 rounded-xs overflow-hidden border-2 transition-all shrink-0 bg-[#F5F5F7] ${
                        activeImageIndex === idx
                          ? 'border-[#C9A27E] ring-1 ring-[#C9A27E]'
                          : 'border-[#EEE8E1] hover:border-[#D9A89A]'
                      }`}
                    >
                      <SmartImage
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        fallbackTitle={product.name}
                        aspectRatio="square"
                        className="w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (5 cols) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6 bg-white sm:border border-[#EEE8E1] p-5 sm:p-8 rounded-xs shadow-xs sticky top-28">
            <div>
              {/* Category & Finish unboxed metadata */}
              <div className="flex items-center gap-2 text-xs text-[#6B6670] mb-1 uppercase tracking-wider font-medium">
                <span>{product.collectionName}</span>
                <span>·</span>
                <span>{product.finish}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C1B1F] leading-tight">
                {product.name}
              </h1>

              {/* Reviews & Stock */}
              <div className="flex items-center justify-between pt-2.5 border-b border-[#EEE8E1] pb-3.5 mt-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex text-[#C9A27E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C9A27E]" />
                    ))}
                  </div>
                  <span className="font-semibold text-[#1C1B1F]">{product.rating}</span>
                  <span className="text-[#6B6670]">({product.reviewCount})</span>
                </div>

                {/* Stock alert */}
                <div className="text-xs">
                  {product.stock <= 4 ? (
                    <span className="text-[#C2566B] font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Only {product.stock} left
                    </span>
                  ) : (
                    <span className="text-[#3F6212] font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> In Stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3">
              <span className="font-sans font-bold text-3xl sm:text-4xl text-[#1C1B1F] tabular-nums">
                {formatPrice(effectivePrice)}
              </span>
              {product.salePrice && (
                <span className="text-lg text-[#8E8A94] line-through tabular-nums">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Short Narrative */}
            <p className="text-xs sm:text-sm text-[#6B6670] leading-relaxed font-light">
              {product.description}
            </p>

            {/* Swatches / Colours */}
            {product.colours.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#1C1B1F]">Finish / Tone:</span>
                  <span className="text-[#966C3E] font-semibold">{selectedColour}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colours.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColour(col)}
                      className={`px-3 py-2 text-xs font-medium rounded-xs border transition-all min-h-[40px] ${
                        selectedColour === col
                          ? 'bg-[#1C1B1F] text-white border-[#1C1B1F]'
                          : 'bg-[#FBF9F6] text-[#6B6670] border-[#EEE8E1] hover:border-[#C9A27E]'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Desktop Add to Basket Module */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper (min 44px) */}
                <div className="flex items-center border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] h-12">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-full text-[#6B6670] hover:text-[#1C1B1F] flex items-center justify-center transition-colors active:scale-90"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 text-sm font-semibold text-[#1C1B1F] min-w-8 text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-11 h-full text-[#6B6670] hover:text-[#1C1B1F] flex items-center justify-center transition-colors active:scale-90"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add Button */}
                <button
                  id="primary-add-button"
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-luxe-gradient text-[#1C1B1F] text-xs sm:text-sm font-semibold rounded-xs shadow-md hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#7D5634]" />
                  <span>Add to Basket · {formatPrice(effectivePrice * quantity)}</span>
                </button>

                {/* Wishlist Button (desktop) */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`hidden sm:flex w-12 h-12 border rounded-xs items-center justify-center transition-all ${
                    inWishlist
                      ? 'bg-[#C2566B] text-white border-[#C2566B]'
                      : 'border-[#EEE8E1] text-[#1C1B1F] hover:border-[#C2566B] hover:text-[#C2566B] bg-[#FBF9F6]'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* WhatsApp Enquiry Link (min 44px touch target) */}
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] py-2.5 bg-white border border-[#25D366] text-[#128C7E] hover:bg-[#25D366] hover:text-white text-xs font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask about this item on WhatsApp</span>
              </a>

              {/* Request Call Back (min 44px) */}
              <button
                onClick={() => setIsCallbackOpen(true)}
                className="w-full min-h-[44px] py-2 text-xs text-[#6B6670] hover:text-[#1C1B1F] hover:underline flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#C9A27E]" />
                <span>Request a phone callback about this piece</span>
              </button>
            </div>

            {/* Delivery & Trust Highlights */}
            <div className="pt-4 border-t border-[#EEE8E1] space-y-2 text-xs text-[#6B6670]">
              <div className="flex items-center gap-2 text-[#1C1B1F]">
                <Truck className="w-4 h-4 text-[#C9A27E] shrink-0" />
                <span>
                  {effectivePrice >= siteConfig.freeDeliveryThreshold
                    ? 'Qualifies for Free Two-Man UK Mainland Delivery'
                    : 'Standard UK Specialist Delivery (£39.99 or free over £499)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A27E] shrink-0" />
                <span>12-Month Structural Guarantee · Pay on Delivery Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section: Description, Dimensions, Delivery, Care */}
        <div className="mt-12 sm:mt-16 bg-white sm:border border-[#EEE8E1] rounded-xs shadow-xs overflow-hidden mx-3 sm:mx-0">
          <div className="flex border-b border-[#EEE8E1] bg-[#FAF7F4] overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'description', label: 'Specification' },
                { id: 'dimensions', label: 'Dimensions' },
                { id: 'delivery', label: 'Delivery' },
                { id: 'care', label: 'Care Guide' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-3.5 sm:py-4 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap min-h-[44px] ${
                  activeTab === tab.id
                    ? 'border-[#C9A27E] bg-white text-[#1C1B1F]'
                    : 'border-transparent text-[#6B6670] hover:text-[#1C1B1F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-8">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1C1B1F]">
                  Craftsmanship & Features
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6670] leading-relaxed max-w-3xl">
                  {product.description}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 pt-3">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#1C1B1F]">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A27E] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'dimensions' && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1C1B1F]">
                  Physical Dimensions
                </h3>
                <div className="max-w-md border border-[#EEE8E1] rounded-xs overflow-hidden">
                  <table className="w-full text-xs">
                    <tbody>
                      <tr className="border-b border-[#EEE8E1] bg-[#FBF9F6]">
                        <td className="p-3 font-semibold text-[#1C1B1F]">Width</td>
                        <td className="p-3 font-mono text-[#6B6670]">{product.dimensions.width} cm</td>
                      </tr>
                      <tr className="border-b border-[#EEE8E1]">
                        <td className="p-3 font-semibold text-[#1C1B1F]">Depth</td>
                        <td className="p-3 font-mono text-[#6B6670]">{product.dimensions.depth} cm</td>
                      </tr>
                      <tr className="border-b border-[#EEE8E1] bg-[#FBF9F6]">
                        <td className="p-3 font-semibold text-[#1C1B1F]">Height</td>
                        <td className="p-3 font-mono text-[#6B6670]">{product.dimensions.height} cm</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#1C1B1F]">Assembly Required</td>
                        <td className="p-3 text-[#6B6670]">{product.assemblyRequired ? 'Minimal leg fastening required' : 'Fully constructed / No assembly'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-3 text-xs text-[#6B6670] leading-relaxed max-w-3xl">
                <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1C1B1F]">
                  White-Glove Delivery
                </h3>
                <p>
                  We dispatch delicate mirrored furniture through specialised two-man furniture couriers.
                  48 hours prior to delivery, you will receive a telephone call or SMS notification confirming a 3-hour arrival window.
                </p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3 text-xs text-[#6B6670] leading-relaxed max-w-3xl">
                <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1C1B1F]">
                  Preserving Your Glam Furniture
                </h3>
                <p>
                  {product.careInstructions ||
                    'Clean mirrored glass using a soft lint-free microfibre cloth and ammonia-free glass cleaner.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Complete the Look: 2 cols on mobile, 4 on desktop */}
        {relatedProducts.length > 0 && (
          <div className="mt-14 sm:mt-20 px-3 sm:px-0">
            <div className="mb-6 sm:mb-8">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold block mb-1">
                Complete The Look
              </span>
              <h2 className="font-serif text-xl sm:text-3xl text-[#1C1B1F]">
                Coordinating Showroom Pieces
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Sticky "Add to Basket" Bar on Mobile with Safe-Area padding */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#EEE8E1] p-3 z-30 lg:hidden shadow-2xl flex items-center justify-between gap-3 pb-safe">
        <div className="min-w-0 flex-1">
          <p className="font-serif text-xs sm:text-sm font-medium text-[#1C1B1F] truncate">
            {product.name}
          </p>
          <span className="font-sans font-bold text-xs sm:text-sm text-[#1C1B1F] tabular-nums">
            {formatPrice(effectivePrice)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="px-5 py-3 min-h-[44px] bg-luxe-gradient text-[#1C1B1F] text-xs font-bold rounded-xs shadow-sm hover:opacity-90 active:scale-[0.97] shrink-0 flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#7D5634]" />
          <span>Add to Basket</span>
        </button>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white p-3 hover:text-[#C9A27E] min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close enlarged view"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xs"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Callback Modal */}
      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        productContext={product.name}
      />
    </div>
  );
};
