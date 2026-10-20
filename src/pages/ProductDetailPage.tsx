import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Star,
  Truck,
  ShieldCheck,
  Heart,
  Share2,
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
  const [showStickyBar, setShowStickyBar] = useState(false);

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

  // Monitor scroll for mobile sticky buy bar
  useEffect(() => {
    const handleScroll = () => {
      const buyButton = document.getElementById('primary-add-button');
      if (buyButton) {
        const rect = buyButton.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleWhatsAppEnquiry = () => {
    const message = `Hi! I'm interested in the "${product.name}" (${formatPrice(effectivePrice)}) from your website: ${window.location.href}`;
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.collectionSlug === product.collectionSlug || p.finish === product.finish))
    .slice(0, 4);

  return (
    <div className="pt-28 pb-24 bg-[#FBF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb trail */}
        <nav className="flex items-center gap-1.5 text-xs text-[#6B6670] mb-8 font-sans">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] sm:aspect-square bg-[#F5F5F7] border border-[#EEE8E1] rounded-xs overflow-hidden shadow-xs">
              <SmartImage
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fallbackTitle={product.name}
                aspectRatio="auto"
                className="w-full h-full"
                imageClassName="object-contain sm:object-cover"
              />

              {/* Lightbox Zoom Trigger */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-xs text-[#1C1B1F] hover:text-[#C9A27E] rounded-full shadow-md border border-[#EEE8E1] transition-colors"
                aria-label="Enlarge image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Sale Tag */}
              {product.salePrice && (
                <div className="absolute top-4 left-4 bg-[#C2566B] text-white text-xs font-bold px-2.5 py-1 rounded-xs uppercase tracking-wider shadow-xs">
                  Save {savingsPercent}% ({formatPrice(savings)})
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
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

          {/* Right Column: Contiguous Purchase Module (5 cols) */}
          <div className="lg:col-span-5 space-y-6 bg-white border border-[#EEE8E1] p-6 sm:p-8 rounded-xs shadow-xs sticky top-28">
            <div>
              {/* Category & Finish unboxed metadata */}
              <div className="flex items-center gap-2 text-xs text-[#6B6670] mb-1.5 uppercase tracking-wider font-medium">
                <span>{product.collectionName}</span>
                <span>·</span>
                <span>Finish: {product.finish}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C1B1F] leading-tight">
                {product.name}
              </h1>

              {/* Reviews & Stock */}
              <div className="flex items-center justify-between pt-3 border-b border-[#EEE8E1] pb-4 mt-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex text-[#C9A27E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C9A27E]" />
                    ))}
                  </div>
                  <span className="font-semibold text-[#1C1B1F]">{product.rating}</span>
                  <span className="text-[#6B6670]">({product.reviewCount} reviews)</span>
                </div>

                {/* Stock alert */}
                <div className="text-xs">
                  {product.stock <= 4 ? (
                    <span className="text-[#C2566B] font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Only {product.stock} pieces remaining
                    </span>
                  ) : (
                    <span className="text-[#3F6212] font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> In Stock & Ready to Dispatch
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
            <p className="text-sm text-[#6B6670] leading-relaxed font-light">
              {product.description}
            </p>

            {/* Swatches / Colours */}
            {product.colours.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#1C1B1F]">Finish / Tone:</span>
                  <span className="text-[#966C3E] font-semibold">{selectedColour}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colours.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColour(col)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-xs border transition-all ${
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

            {/* Quantity Stepper & Add to Basket Button */}
            <div className="space-y-3 pt-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] h-12">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 h-full text-[#6B6670] hover:text-[#1C1B1F] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-sm font-semibold text-[#1C1B1F] min-w-8 text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-3.5 h-full text-[#6B6670] hover:text-[#1C1B1F] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add Button */}
                <button
                  id="primary-add-button"
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-luxe-gradient text-[#1C1B1F] text-sm font-semibold rounded-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#7D5634]" />
                  <span>Add to Shopping Basket · {formatPrice(effectivePrice * quantity)}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 h-12 border rounded-xs flex items-center justify-center transition-all ${
                    inWishlist
                      ? 'bg-[#C2566B] text-white border-[#C2566B]'
                      : 'border-[#EEE8E1] text-[#1C1B1F] hover:border-[#C2566B] hover:text-[#C2566B] bg-[#FBF9F6]'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* WhatsApp Enquiry Link */}
              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full py-2.5 bg-white border border-[#25D366] text-[#128C7E] hover:bg-[#25D366] hover:text-white text-xs font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask about this item on WhatsApp</span>
              </button>

              {/* Request Call Back */}
              <button
                onClick={() => setIsCallbackOpen(true)}
                className="w-full py-2 text-xs text-[#6B6670] hover:text-[#1C1B1F] hover:underline flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#C9A27E]" />
                <span>Request a phone callback about this piece</span>
              </button>
            </div>

            {/* Delivery & Trust Highlights */}
            <div className="pt-4 border-t border-[#EEE8E1] space-y-2.5 text-xs text-[#6B6670]">
              <div className="flex items-center gap-2 text-[#1C1B1F]">
                <Truck className="w-4 h-4 text-[#C9A27E] shrink-0" />
                <span>
                  {effectivePrice >= siteConfig.freeDeliveryThreshold
                    ? 'Qualifies for Free Two-Man UK Mainland Delivery'
                    : 'Standard UK Specialist Delivery (£49.99 or free over £499)'}
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
        <div className="mt-16 bg-white border border-[#EEE8E1] rounded-xs shadow-xs overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#EEE8E1] bg-[#FAF7F4] overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'description', label: 'Specification & Details' },
                { id: 'dimensions', label: 'Dimensions & Sizing' },
                { id: 'delivery', label: 'Delivery & Assembly' },
                { id: 'care', label: 'Care & Maintenance' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#C9A27E] bg-white text-[#1C1B1F]'
                    : 'border-transparent text-[#6B6670] hover:text-[#1C1B1F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-medium text-[#1C1B1F]">
                  Craftsmanship & Features
                </h3>
                <p className="text-sm text-[#6B6670] leading-relaxed max-w-3xl">
                  {product.description}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
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
                <h3 className="font-serif text-xl font-medium text-[#1C1B1F]">
                  Physical Dimensions
                </h3>
                <p className="text-xs text-[#6B6670]">
                  Please measure your doorways, hallways, and intended room space prior to delivery.
                </p>
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
              <div className="space-y-4 text-xs text-[#6B6670] leading-relaxed max-w-3xl">
                <h3 className="font-serif text-xl font-medium text-[#1C1B1F]">
                  White-Glove Delivery
                </h3>
                <p>
                  We dispatch delicate mirrored furniture through specialised two-man furniture couriers rather than high-speed parcel networks. All products are encased in thick shock-absorbing foam and timber-reinforced protective corners.
                </p>
                <p>
                  <strong>Delivery Windows:</strong> Our logistical team will contact you 48 hours prior to delivery with a 3-hour time slot. The team will deliver to your room of choice.
                </p>
                <p>
                  <strong>Optional Assembly:</strong> If selected, our drivers can assemble the piece, inspect every mirror bevel alongside you, and remove all packaging.
                </p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4 text-xs text-[#6B6670] leading-relaxed max-w-3xl">
                <h3 className="font-serif text-xl font-medium text-[#1C1B1F]">
                  Preserving Your Glam Furniture
                </h3>
                <p>
                  {product.careInstructions ||
                    'Clean mirrored glass using a soft lint-free microfibre cloth and ammonia-free glass cleaner. Never spray directly onto crushed diamond seams; mist onto the cloth first.'}
                </p>
                <p>
                  For velvet upholstery, gently vacuum with a soft brush attachment and blot any spills immediately with a clean, damp white cotton towel. Avoid abrasive sponges or bleach-based solvents.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* "Complete the Look" / Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold block mb-1">
                Complete The Look
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1B1F]">
                Coordinating Showroom Pieces
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#EEE8E1] p-3 z-40 lg:hidden shadow-2xl flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="font-serif text-sm font-medium text-[#1C1B1F] truncate">
                {product.name}
              </p>
              <span className="font-sans font-bold text-sm text-[#1C1B1F] tabular-nums">
                {formatPrice(effectivePrice)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="px-5 py-2.5 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs hover:opacity-90 shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Add to Basket</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="absolute top-6 right-6 text-white p-2 hover:text-[#C9A27E]"
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
