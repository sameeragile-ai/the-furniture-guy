import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Sparkles, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../lib/formatPrice';
import { siteConfig } from '../config/site';
import { SmartImage } from '../components/ui/SmartImage';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const CartPage: React.FC = () => {
  useDocumentTitle('Shopping Basket', 'Review your selected mirrored and glam furniture pieces before secure checkout.');
  const navigate = useNavigate();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
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
  const shipping = getShippingCost();
  const total = getTotal();
  const amountToFree = getAmountUntilFreeDelivery();
  const progressPercent = Math.min(100, Math.round((subtotal / siteConfig.freeDeliveryThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#FBF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold mb-2">
            <span>Checkout Process</span>
            <span>·</span>
            <span>Step 1 of 2</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1B1F] tracking-tight">
            Your Shopping Basket
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white border border-[#EEE8E1] rounded-xs p-12 text-center max-w-xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#C9A27E] mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl text-[#1C1B1F] mb-2">
              Your basket is currently empty
            </h2>
            <p className="text-sm text-[#6B6670] mb-6">
              You haven't selected any luxury mirrored pieces yet. Explore our bestsellers and newest arrivals.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs hover:opacity-95"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Items Column (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Delivery Bar */}
              <div className="bg-white border border-[#EEE8E1] p-4 rounded-xs shadow-xs">
                <div className="flex items-center justify-between text-xs font-medium mb-1.5 text-[#1C1B1F]">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#C9A27E]" />
                    {amountToFree === 0 ? (
                      <span className="text-[#3F6212] font-semibold">
                        Congratulations! You've unlocked FREE UK Delivery.
                      </span>
                    ) : (
                      <span>
                        Add <strong>{formatPrice(amountToFree)}</strong> more to unlock Free Specialist Delivery
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] text-[#6B6670]">{progressPercent}%</span>
                </div>
                <div className="w-full bg-[#EEE8E1] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-luxe-gradient transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items Table / Cards */}
              <div className="bg-white border border-[#EEE8E1] rounded-xs divide-y divide-[#EEE8E1] shadow-xs">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                    >
                      <div className="flex gap-4 items-center min-w-0">
                        <div className="w-20 h-20 rounded-xs overflow-hidden shrink-0 bg-[#F5F5F7] border border-[#EEE8E1]">
                          <SmartImage
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fallbackTitle={item.product.name}
                            aspectRatio="square"
                          />
                        </div>
                        <div className="min-w-0">
                          <Link
                            to={`/product/${item.product.slug}`}
                            className="font-serif text-base sm:text-lg font-medium text-[#1C1B1F] hover:text-[#C9A27E] transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <div className="flex items-center gap-2 text-xs text-[#6B6670] mt-0.5">
                            <span>{item.product.collectionName}</span>
                            {item.selectedColour && (
                              <>
                                <span>·</span>
                                <span>{item.selectedColour}</span>
                              </>
                            )}
                          </div>
                          <span className="font-sans text-sm font-semibold text-[#1C1B1F] mt-1 block">
                            {formatPrice(item.price)} each
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-[#EEE8E1]">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#EEE8E1] rounded-xs bg-[#FBF9F6]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-[#6B6670] hover:text-[#1C1B1F]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-[#1C1B1F] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-[#6B6670] hover:text-[#1C1B1F]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line total */}
                        <div className="text-right min-w-[80px]">
                          <span className="font-sans font-bold text-base text-[#1C1B1F] tabular-nums">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#9994A0] hover:text-[#C2566B] p-1.5 transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6B6670]">
                <Link to="/shop" className="hover:text-[#1C1B1F] underline underline-offset-4">
                  &larr; Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="hover:text-[#C2566B] transition-colors"
                >
                  Clear entire basket
                </button>
              </div>
            </div>

            {/* Right Summary Column (4 cols) */}
            <div className="lg:col-span-4 bg-white border border-[#EEE8E1] rounded-xs p-6 sm:p-8 space-y-6 shadow-xs sticky top-28">
              <h2 className="font-serif text-2xl text-[#1C1B1F]">
                Order Summary
              </h2>

              {/* Promo code */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#FAF6F0] border border-[#E8DFD5] rounded-xs text-xs">
                    <span className="flex items-center gap-1.5 text-[#1C1B1F] font-medium">
                      <Tag className="w-3.5 h-3.5 text-[#C9A27E]" /> {promoCode} (10% Off)
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
                      placeholder="Promo code (BLING10)"
                      className="flex-1 px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1C1B1F] text-white text-xs font-semibold rounded-xs hover:bg-[#333]"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-[#C2566B] mt-1">{promoError}</p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2.5 text-xs pb-4 border-b border-[#EEE8E1]">
                <div className="flex justify-between text-[#6B6670]">
                  <span>Item Subtotal</span>
                  <span className="font-medium text-[#1C1B1F]">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#C2566B]">
                    <span>VIP Promotion</span>
                    <span className="font-medium">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6B6670]">
                  <span>Two-Man UK Delivery</span>
                  <span className="font-medium text-[#1C1B1F]">
                    {shipping === 0 ? (
                      <span className="text-[#3F6212] font-semibold">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="pt-2 flex justify-between text-base font-bold text-[#1C1B1F]">
                  <span className="font-serif text-lg">Total Payable</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 bg-luxe-gradient text-[#1C1B1F] text-xs font-bold rounded-xs shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="space-y-2 text-[11px] text-[#6B6670] pt-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C9A27E]" />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C9A27E]" />
                  <span>Two-Man Handling & Room of Choice Delivery</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
