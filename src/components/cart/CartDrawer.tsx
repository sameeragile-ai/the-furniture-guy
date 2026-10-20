import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Sparkles, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../lib/formatPrice';
import { siteConfig } from '../../config/site';
import { SmartImage } from '../ui/SmartImage';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    isDrawerOpen,
    setDrawerOpen,
    removeItem,
    updateQuantity,
    getSubtotal,
    getDiscountAmount,
    getTotal,
    getAmountUntilFreeDelivery,
    promoCode,
    promoError,
    applyPromoCode,
    removePromoCode,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const total = getTotal();
  const amountToFree = getAmountUntilFreeDelivery();
  const progressPercent = Math.min(100, Math.round((subtotal / siteConfig.freeDeliveryThreshold) * 100));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, setDrawerOpen]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const ok = applyPromoCode(promoInput);
    if (ok) setPromoInput('');
  };

  const handleProceedToCheckout = () => {
    setDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-[#1C1B1F]/40 backdrop-blur-xs"
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="w-screen max-w-md bg-[#FBF9F6] border-l border-[#EEE8E1] shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-[#EEE8E1] flex items-center justify-between bg-white">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#1C1B1F]">
                    Your Shopping Basket
                  </h3>
                  <span className="text-xs text-[#6B6670]">
                    {items.length} {items.length === 1 ? 'item' : 'items'} selected
                  </span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-9 h-9 rounded-full border border-[#EEE8E1] hover:border-[#1C1B1F] flex items-center justify-center text-[#1C1B1F] transition-colors"
                  aria-label="Close basket"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Free Delivery Meter */}
              <div className="px-6 py-3 bg-[#FAF6F0] border-b border-[#E8DFD5]">
                <div className="flex items-center justify-between text-xs font-medium mb-1.5 text-[#1C1B1F]">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#C9A27E]" />
                    {amountToFree === 0 ? (
                      <span className="text-[#3F6212] font-semibold">
                        You have unlocked FREE UK Delivery!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-[#1C1B1F]">{formatPrice(amountToFree)}</strong> for Free Delivery
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] text-[#6B6670]">{progressPercent}%</span>
                </div>
                <div className="w-full bg-[#E5DFD7] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-luxe-gradient transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#EEE8E1]/50 flex items-center justify-center text-[#C9A27E] mb-4">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <h4 className="font-serif text-xl text-[#1C1B1F] mb-2">
                      Your basket is currently empty
                    </h4>
                    <p className="text-xs text-[#6B6670] max-w-xs mx-auto mb-6">
                      Explore our hand-finished mirrored consoles, crushed diamond TV units, and plush velvet seating.
                    </p>
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        navigate('/shop');
                      }}
                      className="px-6 py-2.5 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs hover:opacity-90 transition-opacity shadow-xs"
                    >
                      Browse All Glam Furniture
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex gap-4 p-3 bg-white border border-[#EEE8E1] rounded-xs shadow-xs"
                    >
                      <div className="w-20 h-20 shrink-0 rounded-xs overflow-hidden bg-[#F5F5F7]">
                        <SmartImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fallbackTitle={item.product.name}
                          aspectRatio="square"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              to={`/product/${item.product.slug}`}
                              onClick={() => setDrawerOpen(false)}
                              className="font-serif text-sm font-medium text-[#1C1B1F] hover:text-[#C9A27E] transition-colors line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            {item.selectedColour && (
                              <span className="text-[11px] text-[#6B6670] block">
                                Colour: {item.selectedColour}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#9994A0] hover:text-[#C2566B] p-1 transition-colors"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Stepper */}
                          <div className="flex items-center border border-[#EEE8E1] rounded-xs bg-[#FBF9F6]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-[#6B6670] hover:text-[#1C1B1F]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold text-[#1C1B1F]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-[#6B6670] hover:text-[#1C1B1F]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="font-sans font-semibold text-sm text-[#1C1B1F]">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Drawer Footer with Totals and Checkout CTA */}
              {items.length > 0 && (
                <div className="p-6 bg-white border-t border-[#EEE8E1] space-y-4">
                  {/* Promo Code Form */}
                  <div className="pt-1">
                    {promoCode ? (
                      <div className="flex items-center justify-between px-3 py-1.5 bg-[#FAF6F0] border border-[#E8DFD5] rounded-xs text-xs">
                        <span className="flex items-center gap-1.5 text-[#1C1B1F] font-medium">
                          <Tag className="w-3.5 h-3.5 text-[#C9A27E]" /> Code {promoCode} applied (10% off)
                        </span>
                        <button
                          onClick={removePromoCode}
                          className="text-[#C2566B] hover:underline text-[11px]"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Promo code (try BLING10)"
                          className="flex-1 px-3 py-1.5 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-[#1C1B1F] text-white text-xs font-medium rounded-xs hover:bg-[#333] transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    {promoError && (
                      <p className="text-[11px] text-[#C2566B] mt-1">{promoError}</p>
                    )}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#6B6670]">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-[#C2566B]">
                        <span>Promotion Discount</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#6B6670]">
                      <span>UK Delivery</span>
                      <span>
                        {subtotal >= siteConfig.freeDeliveryThreshold ? (
                          <span className="text-[#3F6212] font-semibold">FREE</span>
                        ) : (
                          formatPrice(49.99)
                        )}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-[#EEE8E1] flex justify-between text-base font-semibold text-[#1C1B1F]">
                      <span className="font-serif text-lg">Estimated Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={handleProceedToCheckout}
                      className="w-full py-3.5 bg-luxe-gradient text-[#1C1B1F] text-sm font-semibold rounded-xs shadow-xs hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Secure Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        navigate('/cart');
                      }}
                      className="w-full py-2.5 bg-transparent border border-[#EEE8E1] text-[#1C1B1F] hover:border-[#1C1B1F] text-xs font-medium rounded-xs transition-colors"
                    >
                      View Full Basket Details
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-[#6B6670] pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C9A27E]" /> 256-Bit SSL Checkout
                    </span>
                    <span>·</span>
                    <span>Two-Man Handling</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
