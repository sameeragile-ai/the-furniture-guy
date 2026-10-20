import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  MapPin,
  Building,
} from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../lib/formatPrice';
import { siteConfig } from '../config/site';
import { generateOrderRef, isValidUKPhone, isValidUKPostcode } from '../lib/utils';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SmartImage } from '../components/ui/SmartImage';

export const CheckoutPage: React.FC = () => {
  useDocumentTitle('Secure Checkout', 'Complete your order with The Furniture Guy.');
  const navigate = useNavigate();
  const {
    items,
    getSubtotal,
    getDiscountAmount,
    clearCart,
  } = useCartStore();

  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Delivery Address, 2: Delivery Method, 3: Payment
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'collect'>('standard');
  const [includeAssembly, setIncludeAssembly] = useState(false);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();

  // Delivery fee logic
  const deliveryFee =
    deliveryMethod === 'collect'
      ? 0
      : deliveryMethod === 'express'
      ? 49.99
      : subtotal >= siteConfig.freeDeliveryThreshold
      ? 0
      : 39.99;

  const assemblyFee = includeAssembly ? 45.0 : 0;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee + assemblyFee);

  const validateAddressStep = () => {
    const errs: Record<string, string> = {};
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email address is required';
    if (!firstName.trim()) errs.firstName = 'First name is required';
    if (!lastName.trim()) errs.lastName = 'Last name is required';
    if (!isValidUKPhone(phone)) errs.phone = 'Valid UK phone number required (e.g. 07123 456789)';
    if (!addressLine1.trim()) errs.addressLine1 = 'Street address is required';
    if (!city.trim()) errs.city = 'Town / City is required';
    if (!isValidUKPostcode(postcode)) errs.postcode = 'Valid UK Postcode required (e.g. B1 1AA, SW1A 1AA)';

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStep(2);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ref = generateOrderRef();
    setOrderNumber(ref);

    // Snapshot of order data
    const orderPayload = {
      orderNumber: ref,
      items: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        quantity: i.quantity,
        price: i.price,
        selectedColour: i.selectedColour,
      })),
      customer: {
        firstName,
        lastName,
        email,
        phone,
      },
      shippingAddress: {
        addressLine1,
        addressLine2,
        city,
        postcode,
      },
      deliveryMethod,
      includeAssembly,
      paymentMethod,
      totals: {
        subtotal,
        discount,
        deliveryFee,
        assemblyFee,
        total: finalTotal,
      },
      timestamp: new Date().toISOString(),
    };

    try {
      /*
        TODO: Stripe Payment Intent Integration:
        When ready for production Stripe, send `finalTotal` and currency ('gbp') to your backend
        endpoint (e.g. POST /api/create-payment-intent), get clientSecret, and confirmCardPayment()
        via @stripe/stripe-js.
      */
      if (siteConfig.formEndpoint) {
        await fetch(siteConfig.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const stored = JSON.parse(localStorage.getItem('tfg_orders') || '[]');
        stored.push(orderPayload);
        localStorage.setItem('tfg_orders', JSON.stringify(stored));
      }

      setIsSuccess(true);
      clearCart();
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#E8D3B9', '#D9A89A', '#C9A27E', '#1C1B1F'],
      });
    } catch {
      alert('Unable to process order. Please call our showroom to complete over the telephone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format Card Number input with spaces
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  // Format Card Expiry MM/YY
  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, '');
    if (raw.length <= 4) {
      if (raw.length > 2) {
        setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
      } else {
        setCardExpiry(raw);
      }
    }
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl text-[#1C1B1F] mb-3">Your basket is empty</h2>
        <p className="text-sm text-[#6B6670] mb-6">
          Please add items to your basket before proceeding to checkout.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs"
        >
          Return to Showroom
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#FBF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Screen */}
        {isSuccess ? (
          <div className="max-w-2xl mx-auto bg-white border border-[#EEE8E1] rounded-xs p-8 sm:p-12 text-center shadow-lg">
            <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border border-[#D9A89A] flex items-center justify-center text-[#C9A27E] mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C9A27E] font-semibold block mb-1">
              Order Confirmed & Logged
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1B1F] mb-2">
              Thank you for your order, {firstName}!
            </h1>
            <p className="text-sm text-[#6B6670] mb-6">
              Your bespoke glam pieces are being prepared for dispatch. Our two-man delivery logistics team will contact you 48 hours prior with your designated window.
            </p>

            <div className="p-4 bg-[#FAF7F4] border border-[#EEE8E1] rounded-xs text-xs space-y-2 text-left mb-8">
              <div className="flex justify-between border-b border-[#EEE8E1] pb-2">
                <span className="text-[#6B6670]">Order Number:</span>
                <strong className="font-mono text-sm text-[#1C1B1F]">{orderNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6670]">Delivery Address:</span>
                <span className="text-[#1C1B1F]">{addressLine1}, {city}, {postcode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6670]">Payment Option:</span>
                <span className="text-[#1C1B1F] font-medium">
                  {paymentMethod === 'cod' ? 'Pay on Delivery (Cash / Card on Arrival)' : 'Paid Online (Demo Card)'}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#EEE8E1] pt-2 text-sm font-bold text-[#1C1B1F]">
                <span>Total Amount:</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Link
                to="/"
                className="px-6 py-3 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs"
              >
                Return to Showroom
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Form Steps (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-[#EEE8E1] rounded-xs p-6 sm:p-10 shadow-xs">
              {/* Step indicator */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#EEE8E1]">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                      step >= 1 ? 'bg-luxe-gradient text-[#1C1B1F]' : 'bg-[#F5F5F7] text-[#8E8A94]'
                    }`}
                  >
                    1
                  </div>
                  <span className={`text-xs font-semibold ${step === 1 ? 'text-[#1C1B1F]' : 'text-[#8E8A94]'}`}>
                    Address
                  </span>
                </div>

                <div className="w-8 h-0.5 bg-[#EEE8E1]" />

                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                      step >= 2 ? 'bg-luxe-gradient text-[#1C1B1F]' : 'bg-[#F5F5F7] text-[#8E8A94]'
                    }`}
                  >
                    2
                  </div>
                  <span className={`text-xs font-semibold ${step === 2 ? 'text-[#1C1B1F]' : 'text-[#8E8A94]'}`}>
                    Delivery
                  </span>
                </div>

                <div className="w-8 h-0.5 bg-[#EEE8E1]" />

                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                      step >= 3 ? 'bg-luxe-gradient text-[#1C1B1F]' : 'bg-[#F5F5F7] text-[#8E8A94]'
                    }`}
                  >
                    3
                  </div>
                  <span className={`text-xs font-semibold ${step === 3 ? 'text-[#1C1B1F]' : 'text-[#8E8A94]'}`}>
                    Payment
                  </span>
                </div>
              </div>

              {/* STEP 1: Address & Contact */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-[#1C1B1F]">
                    Contact & UK Delivery Address
                  </h2>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      Email for Order Updates *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. marcus@example.co.uk"
                      className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                    />
                    {errors.email && <p className="text-[11px] text-[#C2566B] mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Marcus"
                        className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                      />
                      {errors.firstName && <p className="text-[11px] text-[#C2566B] mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Vance"
                        className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                      />
                      {errors.lastName && <p className="text-[11px] text-[#C2566B] mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      UK Telephone or Mobile (for 48h Delivery Window SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 07123 456789"
                      className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                    />
                    {errors.phone && <p className="text-[11px] text-[#C2566B] mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="e.g. 14 Highgrove Lane"
                      className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                    />
                    {errors.addressLine1 && <p className="text-[11px] text-[#C2566B] mt-1">{errors.addressLine1}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      Apartment, Suite, Unit (Optional)
                    </label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="e.g. Flat 3B"
                      className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                        Town / City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Solihull"
                        className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                      />
                      {errors.city && <p className="text-[11px] text-[#C2566B] mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                        UK Postcode *
                      </label>
                      <input
                        type="text"
                        required
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        placeholder="B91 3AB"
                        className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                      />
                      {errors.postcode && <p className="text-[11px] text-[#C2566B] mt-1">{errors.postcode}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      Access Instructions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g. Second floor with lift access, gate code 1234..."
                      className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={validateAddressStep}
                      className="px-6 py-3 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs hover:opacity-95 flex items-center gap-2"
                    >
                      <span>Continue to Delivery Options</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Delivery Method */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl text-[#1C1B1F]">
                    Choose Delivery Option
                  </h2>

                  <div className="space-y-3">
                    {/* Standard Delivery */}
                    <label
                      className={`block p-4 border rounded-xs cursor-pointer transition-all ${
                        deliveryMethod === 'standard'
                          ? 'border-[#C9A27E] bg-[#FAF6F0]'
                          : 'border-[#EEE8E1] hover:border-[#D9A89A]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="delivery"
                            checked={deliveryMethod === 'standard'}
                            onChange={() => setDeliveryMethod('standard')}
                            className="text-[#C9A27E] focus:ring-[#C9A27E]"
                          />
                          <div>
                            <span className="font-serif text-base text-[#1C1B1F] block">
                              Specialist Two-Man UK Delivery
                            </span>
                            <span className="text-xs text-[#6B6670]">
                              Room of choice delivery within 5–7 business days
                            </span>
                          </div>
                        </div>
                        <span className="font-sans font-bold text-xs text-[#1C1B1F]">
                          {subtotal >= siteConfig.freeDeliveryThreshold ? 'FREE' : '£39.99'}
                        </span>
                      </div>
                    </label>

                    {/* Express Delivery */}
                    <label
                      className={`block p-4 border rounded-xs cursor-pointer transition-all ${
                        deliveryMethod === 'express'
                          ? 'border-[#C9A27E] bg-[#FAF6F0]'
                          : 'border-[#EEE8E1] hover:border-[#D9A89A]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="delivery"
                            checked={deliveryMethod === 'express'}
                            onChange={() => setDeliveryMethod('express')}
                            className="text-[#C9A27E] focus:ring-[#C9A27E]"
                          />
                          <div>
                            <span className="font-serif text-base text-[#1C1B1F] block">
                              Express Priority Dispatch
                            </span>
                            <span className="text-xs text-[#6B6670]">
                              Expedited routing within 48–72 hours
                            </span>
                          </div>
                        </div>
                        <span className="font-sans font-bold text-xs text-[#1C1B1F]">
                          £49.99
                        </span>
                      </div>
                    </label>

                    {/* Click & Collect */}
                    <label
                      className={`block p-4 border rounded-xs cursor-pointer transition-all ${
                        deliveryMethod === 'collect'
                          ? 'border-[#C9A27E] bg-[#FAF6F0]'
                          : 'border-[#EEE8E1] hover:border-[#D9A89A]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="delivery"
                            checked={deliveryMethod === 'collect'}
                            onChange={() => setDeliveryMethod('collect')}
                            className="text-[#C9A27E] focus:ring-[#C9A27E]"
                          />
                          <div>
                            <span className="font-serif text-base text-[#1C1B1F] block">
                              Showroom Click & Collect
                            </span>
                            <span className="text-xs text-[#6B6670]">
                              Collect from Birmingham showroom (free protective vehicle loading)
                            </span>
                          </div>
                        </div>
                        <span className="font-sans font-bold text-xs text-[#3F6212]">
                          FREE
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Optional White-Glove Assembly Add-on */}
                  <div className="p-4 bg-[#FAF7F4] border border-[#EEE8E1] rounded-xs">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeAssembly}
                        onChange={(e) => setIncludeAssembly(e.target.checked)}
                        className="mt-0.5 rounded-xs text-[#C9A27E] focus:ring-[#C9A27E]"
                      />
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-sm font-semibold text-[#1C1B1F]">
                            Add Two-Man Assembly & Packaging Removal (+£45.00)
                          </span>
                        </div>
                        <p className="text-xs text-[#6B6670] mt-0.5">
                          Our team will unpack, assemble table pedestals or legs, position furniture, and remove all protective wood/foam crating.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-xs font-semibold text-[#6B6670] hover:text-[#1C1B1F] flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Address
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs hover:opacity-95 flex items-center gap-2"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Payment */}
              {step === 3 && (
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <h2 className="font-serif text-2xl text-[#1C1B1F]">
                    Payment Method
                  </h2>

                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border rounded-xs text-left transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#C9A27E] bg-[#FAF6F0]'
                          : 'border-[#EEE8E1] hover:border-[#D9A89A]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="w-4 h-4 text-[#C9A27E]" />
                        <span className="font-serif text-sm font-semibold text-[#1C1B1F]">
                          Debit / Credit Card
                        </span>
                      </div>
                      <span className="text-[11px] text-[#6B6670] block">
                        Visa, Mastercard, Amex
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 border rounded-xs text-left transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#C9A27E] bg-[#FAF6F0]'
                          : 'border-[#EEE8E1] hover:border-[#D9A89A]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Building className="w-4 h-4 text-[#C9A27E]" />
                        <span className="font-serif text-sm font-semibold text-[#1C1B1F]">
                          Pay on Delivery
                        </span>
                      </div>
                      <span className="text-[11px] text-[#6B6670] block">
                        Reserve now, pay on arrival
                      </span>
                    </button>
                  </div>

                  {/* Card Form UI with Live Card Mockup */}
                  {paymentMethod === 'card' ? (
                    <div className="space-y-4 pt-2">
                      {/* Live Card Mockup */}
                      <div className="p-5 rounded-xs bg-gradient-to-tr from-[#1C1B1F] via-[#2A2830] to-[#1C1B1F] text-white shadow-xl relative overflow-hidden border border-[#D9A89A]/40 max-w-sm mx-auto">
                        <div className="flex justify-between items-center mb-6">
                          <span className="font-serif text-sm tracking-wider text-[#E8D3B9]">
                            THE FURNITURE GUY
                          </span>
                          <Sparkles className="w-4 h-4 text-[#C9A27E]" />
                        </div>
                        <div className="font-mono text-base tracking-widest mb-4">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </div>
                        <div className="flex justify-between text-[11px] text-[#A8A4AE]">
                          <div>
                            <span className="block uppercase text-[9px]">Cardholder</span>
                            <span className="font-semibold text-white tracking-wide">
                              {cardName.toUpperCase() || 'YOUR NAME'}
                            </span>
                          </div>
                          <div>
                            <span className="block uppercase text-[9px]">Expires</span>
                            <span className="font-semibold text-white">
                              {cardExpiry || 'MM/YY'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="e.g. Marcus Vance"
                          className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          placeholder="4532 •••• •••• 8891"
                          className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E] font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                            Expiry (MM/YY) *
                          </label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => handleExpiryChange(e.target.value)}
                            placeholder="08/28"
                            className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E] font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                            CVC / CVV *
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            required
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                            placeholder="•••"
                            className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E] font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-[#FAF7F4] border border-[#EEE8E1] rounded-xs text-xs text-[#6B6670] space-y-2">
                      <span className="font-serif text-sm font-semibold text-[#1C1B1F] block">
                        Pay on Delivery Instructions
                      </span>
                      <p>
                        Your pieces will be reserved and assigned to our next logistical delivery route. Our two-man team will transport the items into your room of choice, unpack them, and allow you to inspect the finish before accepting card or cash payment.
                      </p>
                      <p className="text-[11px] text-[#3F6212] font-semibold">
                        Zero deposit required. Total due upon satisfactory arrival: {formatPrice(finalTotal)}.
                      </p>
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between border-t border-[#EEE8E1]">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-xs font-semibold text-[#6B6670] hover:text-[#1C1B1F] flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Delivery
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 bg-luxe-gradient text-[#1C1B1F] text-xs font-bold rounded-xs shadow-md hover:opacity-95 flex items-center gap-2"
                    >
                      <Lock className="w-3.5 h-3.5 text-[#7D5634]" />
                      <span>{isSubmitting ? 'Securing Order...' : `Complete Order · ${formatPrice(finalTotal)}`}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-[#EEE8E1] rounded-xs p-6 sm:p-8 space-y-6 shadow-xs sticky top-28">
              <h2 className="font-serif text-xl text-[#1C1B1F]">
                Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
              </h2>

              {/* Items List */}
              <div className="max-h-72 overflow-y-auto divide-y divide-[#EEE8E1]">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 items-center">
                    <div className="w-14 h-14 rounded-xs overflow-hidden bg-[#F5F5F7] shrink-0">
                      <SmartImage
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fallbackTitle={item.product.name}
                        aspectRatio="square"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-medium text-[#1C1B1F] truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] text-[#6B6670]">
                        Qty: {item.quantity} · {item.selectedColour || item.product.finish}
                      </span>
                    </div>
                    <span className="font-sans font-semibold text-xs text-[#1C1B1F] tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculation Breakdown */}
              <div className="space-y-2 text-xs pt-4 border-t border-[#EEE8E1]">
                <div className="flex justify-between text-[#6B6670]">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#C2566B]">
                    <span>VIP Promotion</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6B6670]">
                  <span>Two-Man UK Delivery</span>
                  <span>{deliveryFee === 0 ? <strong className="text-[#3F6212]">FREE</strong> : formatPrice(deliveryFee)}</span>
                </div>
                {includeAssembly && (
                  <div className="flex justify-between text-[#6B6670]">
                    <span>Assembly & De-crating</span>
                    <span>{formatPrice(assemblyFee)}</span>
                  </div>
                )}
                <div className="pt-2 flex justify-between text-base font-bold text-[#1C1B1F] border-t border-[#EEE8E1]">
                  <span className="font-serif text-lg">Total</span>
                  <span className="tabular-nums">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="text-[11px] text-[#6B6670] space-y-1.5 pt-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C9A27E]" />
                  <span>12-Month Structural Guarantee Included</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C9A27E]" />
                  <span>Delivered to Ground or Upper Floor Room of Choice</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
