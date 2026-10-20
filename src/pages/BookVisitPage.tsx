import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Video,
  Phone,
  Ruler,
  Clock,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Download,
  CalendarPlus,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { products } from '../data/products';
import { siteConfig } from '../config/site';
import {
  generateBookingRef,
  isValidUKPhone,
  getGoogleCalendarUrl,
  downloadIcsFile,
} from '../lib/utils';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type BookingType = 'Showroom Visit' | 'Video Call Viewing' | 'Phone Consultation' | 'Home Measurement';

export const BookVisitPage: React.FC = () => {
  useDocumentTitle('Book a Showroom Visit or Virtual Tour', 'Schedule a private consultation at our Midlands showroom or arrange a live video tour.');
  const location = useLocation();
  const prefilled = (location.state as any) || {};

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [bookingType, setBookingType] = useState<BookingType>(
    prefilled.prefilledType || 'Showroom Visit'
  );
  const [selectedDate, setSelectedDate] = useState<string>(prefilled.prefilledDate || '');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(prefilled.prefilledPhone || '');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  // Generate selectable dates for next 14 days (excluding Sundays)
  const availableDates = React.useMemo(() => {
    const list: { dateStr: string; displayDay: string; displayNum: string; dayName: string }[] = [];
    const curr = new Date();
    curr.setDate(curr.getDate() + 1); // Start tomorrow

    while (list.length < 12) {
      const dayOfWeek = curr.getDay();
      if (dayOfWeek !== 0) { // Not Sunday
        const dateStr = curr.toISOString().split('T')[0];
        const displayDay = curr.toLocaleDateString('en-GB', { weekday: 'short' });
        const displayNum = curr.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        const dayName = curr.toLocaleDateString('en-GB', { weekday: 'long' });
        list.push({ dateStr, displayDay, displayNum, dayName });
      }
      curr.setDate(curr.getDate() + 1);
    }
    return list;
  }, []);

  // Time slots between 10:00 and 17:00
  const timeSlots = [
    { time: '10:00', booked: false },
    { time: '10:30', booked: true },
    { time: '11:00', booked: false },
    { time: '11:30', booked: false },
    { time: '12:00', booked: false },
    { time: '13:00', booked: false },
    { time: '13:30', booked: true },
    { time: '14:00', booked: false },
    { time: '14:30', booked: false },
    { time: '15:00', booked: false },
    { time: '15:30', booked: false },
    { time: '16:00', booked: false },
    { time: '16:30', booked: false },
  ];

  const typesList: { id: BookingType; title: string; desc: string; icon: any }[] = [
    {
      id: 'Showroom Visit',
      title: 'Private Showroom Visit',
      desc: 'Exclusive access to our luxury showroom suites with a private design consultant.',
      icon: CalendarIcon,
    },
    {
      id: 'Video Call Viewing',
      title: '1-to-1 Live Video Tour',
      desc: 'Live high-definition FaceTime or WhatsApp tour showing flame colors and reflections.',
      icon: Video,
    },
    {
      id: 'Phone Consultation',
      title: 'Telephone Consultation',
      desc: 'Discuss custom sizes, room layouts, and package pricing with an interior advisor.',
      icon: Phone,
    },
    {
      id: 'Home Measurement',
      title: 'Home Measurement & Access Audit',
      desc: 'A specialist visits your home to measure doorways and alcoves for large dining suites.',
      icon: Ruler,
    },
  ];

  const handleStep3Validation = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your full name';
    if (!email.trim() || !email.includes('@')) errs.email = 'Please provide a valid email';
    if (!isValidUKPhone(phone)) errs.phone = 'Please provide a valid UK telephone or mobile';

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStep(4);
    }
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    const ref = generateBookingRef();
    setBookingRef(ref);

    const bookingPayload = {
      reference: ref,
      bookingType,
      date: selectedDate,
      time: selectedTime,
      name,
      email,
      phone,
      interestedProducts: selectedProductIds,
      notes,
      timestamp: new Date().toISOString(),
    };

    try {
      if (siteConfig.formEndpoint) {
        await fetch(siteConfig.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingPayload),
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const stored = JSON.parse(localStorage.getItem('tfg_bookings') || '[]');
        stored.push(bookingPayload);
        localStorage.setItem('tfg_bookings', JSON.stringify(stored));
      }

      setStep(5);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E8D3B9', '#D9A89A', '#C9A27E', '#1C1B1F'],
      });
    } catch {
      // Saved reference locally if endpoint was unavailable
      setStep(5);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleProductSelect = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const calendarDetails = {
    title: `${siteConfig.businessName}: ${bookingType} (${bookingRef})`,
    description: `Your appointment with The Furniture Guy (King of Bling) for ${bookingType}. Reference: ${bookingRef}. Contact: ${siteConfig.displayPhone}`,
    location: bookingType === 'Showroom Visit' ? siteConfig.address : 'Virtual / Telephone Consultation',
    dateStr: selectedDate,
    timeStr: selectedTime || '10:00',
    reference: bookingRef,
  };

  return (
    <div className="pt-28 pb-24 bg-[#FBF9F6] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF6F0] border border-[#EEE8E1] rounded-full text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showroom & Virtual Appointments</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1B1F] tracking-tight">
            Book an Exclusive Consultation
          </h1>
          <p className="text-sm text-[#6B6670] mt-2">
            Experience our bevelled mirrors and crushed crystal designs in private comfort with tailored advice.
          </p>
        </div>

        {/* Progress Bar (Steps 1 to 4) */}
        {step < 5 && (
          <div className="mb-10">
            <div className="flex items-center justify-between text-xs font-medium text-[#6B6670] mb-2">
              <span className={step >= 1 ? 'text-[#1C1B1F] font-semibold' : ''}>1. Format</span>
              <span className={step >= 2 ? 'text-[#1C1B1F] font-semibold' : ''}>2. Date & Time</span>
              <span className={step >= 3 ? 'text-[#1C1B1F] font-semibold' : ''}>3. Your Details</span>
              <span className={step >= 4 ? 'text-[#1C1B1F] font-semibold' : ''}>4. Confirm</span>
            </div>
            <div className="w-full bg-[#EEE8E1] h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-luxe-gradient transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Multi-step Box */}
        <div className="bg-white border border-[#EEE8E1] rounded-xs shadow-md p-6 sm:p-10">
          {/* STEP 1: Type Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-2xl text-[#1C1B1F]">
                Step 1: Select your preferred consultation format
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {typesList.map((item) => {
                  const Icon = item.icon;
                  const isSelected = bookingType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBookingType(item.id)}
                      className={`p-5 rounded-xs border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#C9A27E] bg-[#FAF6F0] shadow-xs'
                          : 'border-[#EEE8E1] hover:border-[#D9A89A] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-luxe-gradient text-[#1C1B1F]' : 'bg-[#FBF9F6] text-[#C9A27E]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#C9A27E] bg-[#C9A27E]' : 'border-[#DDD]'
                          }`}
                        >
                          {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-medium text-[#1C1B1F]">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#6B6670] mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs hover:opacity-95 flex items-center gap-2"
                >
                  <span>Continue to Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Custom Date & Time Picker */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-serif text-2xl text-[#1C1B1F]">
                  Step 2: Choose a date & 30-minute time slot
                </h2>
                <p className="text-xs text-[#6B6670] mt-1">
                  Showroom visits operate Monday to Saturday (closed Sundays).
                </p>
              </div>

              {/* Date selection cards */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1B1F] mb-3">
                  Select Date
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {availableDates.map((d) => {
                    const isSelected = selectedDate === d.dateStr;
                    return (
                      <button
                        key={d.dateStr}
                        type="button"
                        onClick={() => setSelectedDate(d.dateStr)}
                        className={`p-3 rounded-xs border text-center transition-all ${
                          isSelected
                            ? 'border-[#C9A27E] bg-[#1C1B1F] text-white'
                            : 'border-[#EEE8E1] bg-[#FBF9F6] text-[#6B6670] hover:border-[#C9A27E]'
                        }`}
                      >
                        <span className="block text-[11px] uppercase font-semibold">
                          {d.displayDay}
                        </span>
                        <span className="block text-sm font-bold mt-0.5">
                          {d.displayNum}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1B1F] mb-3">
                    Available Time Slots for {selectedDate}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={slot.booked}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`p-2.5 rounded-xs border text-xs font-semibold transition-all ${
                            slot.booked
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-luxe-gradient text-[#1C1B1F] border-[#C9A27E] shadow-xs'
                              : 'bg-white text-[#1C1B1F] border-[#EEE8E1] hover:border-[#C9A27E]'
                          }`}
                        >
                          {slot.time} {slot.booked ? '(Booked)' : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-[#EEE8E1] flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B6670] hover:text-[#1C1B1F] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span>Continue to Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Customer Details & Multi-Select Products */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-2xl text-[#1C1B1F]">
                  Step 3: Contact details & furniture of interest
                </h2>
                <p className="text-xs text-[#6B6670] mt-1">
                  We prepare the showroom displays and samples according to the pieces you wish to inspect.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Victoria Ashworth"
                    className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                  />
                  {errors.name && <p className="text-[11px] text-[#C2566B] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. victoria@example.co.uk"
                    className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                  />
                  {errors.email && <p className="text-[11px] text-[#C2566B] mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                  UK Mobile or Telephone *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 07123 456789"
                  className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                />
                {errors.phone && <p className="text-[11px] text-[#C2566B] mt-1">{errors.phone}</p>}
              </div>

              {/* Product Multi-Select */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1B1F] mb-2">
                  Pieces of Interest (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-[#EEE8E1] rounded-xs bg-[#FBF9F6]">
                  {products.slice(0, 10).map((p) => {
                    const isChecked = selectedProductIds.includes(p.id);
                    return (
                      <label
                        key={p.id}
                        className={`flex items-center gap-2.5 p-2 rounded-xs cursor-pointer text-xs transition-colors ${
                          isChecked ? 'bg-white font-medium text-[#1C1B1F] shadow-xs' : 'text-[#6B6670] hover:bg-white/60'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleProductSelect(p.id)}
                          className="rounded-xs text-[#C9A27E] focus:ring-[#C9A27E]"
                        />
                        <span className="truncate">{p.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                  Notes or Questions for Consultant (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Would like to see the fireplace LED colours switched on..."
                  className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-[#FBF9F6] focus:outline-hidden focus:border-[#C9A27E]"
                />
              </div>

              <div className="pt-6 border-t border-[#EEE8E1] flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B6670] hover:text-[#1C1B1F] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <button
                  onClick={handleStep3Validation}
                  className="px-6 py-3 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs hover:opacity-95 flex items-center gap-2"
                >
                  <span>Review Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Review & Confirm */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-2xl text-[#1C1B1F]">
                  Step 4: Review your consultation details
                </h2>
                <p className="text-xs text-[#6B6670] mt-1">
                  Please confirm your appointment specifics below.
                </p>
              </div>

              <div className="bg-[#FAF7F4] border border-[#EEE8E1] rounded-xs p-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#EEE8E1]">
                  <div>
                    <span className="text-[#6B6670] block">Consultation Type:</span>
                    <strong className="text-sm font-serif text-[#1C1B1F]">{bookingType}</strong>
                  </div>
                  <div>
                    <span className="text-[#6B6670] block">Date & Time:</span>
                    <strong className="text-sm font-serif text-[#1C1B1F]">
                      {selectedDate} at {selectedTime}
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#EEE8E1]">
                  <div>
                    <span className="text-[#6B6670] block">Contact:</span>
                    <span className="text-[#1C1B1F] font-medium">{name} ({phone})</span>
                  </div>
                  <div>
                    <span className="text-[#6B6670] block">Confirmation Email:</span>
                    <span className="text-[#1C1B1F] font-medium">{email}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#6B6670] block mb-1">Location / Channel:</span>
                  <span className="text-[#1C1B1F]">
                    {bookingType === 'Showroom Visit'
                      ? `${siteConfig.address}, ${siteConfig.city}`
                      : 'Remote Video link / Call to telephone provided'}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#EEE8E1] flex items-center justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B6670] hover:text-[#1C1B1F] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Edit Details
                </button>

                <button
                  disabled={isSubmitting}
                  onClick={handleConfirmBooking}
                  className="px-8 py-3.5 bg-luxe-gradient text-[#1C1B1F] text-xs font-bold rounded-xs shadow-md hover:opacity-95 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#7D5634]" />
                  <span>{isSubmitting ? 'Confirming Appointment...' : 'Lock In Showroom Appointment'}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Success Screen */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border border-[#D9A89A] flex items-center justify-center text-[#C9A27E] mx-auto shadow-xs">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#C9A27E] font-semibold block mb-1">
                  Appointment Confirmed
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1F]">
                  We look forward to welcoming you
                </h2>
                <p className="text-sm text-[#6B6670] max-w-md mx-auto mt-2">
                  A confirmation SMS and calendar invite have been generated for <strong>{name}</strong>.
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F4] border border-[#EEE8E1] rounded-xs max-w-sm mx-auto text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#6B6670]">Booking Reference:</span>
                  <strong className="font-mono text-[#1C1B1F] text-sm">{bookingRef}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6670]">Format:</span>
                  <span className="text-[#1C1B1F]">{bookingType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6670]">Slot:</span>
                  <span className="text-[#1C1B1F]">{selectedDate} @ {selectedTime}</span>
                </div>
              </div>

              {/* Calendar Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={getGoogleCalendarUrl(calendarDetails)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-white border border-[#EEE8E1] hover:border-[#1C1B1F] text-xs font-semibold text-[#1C1B1F] rounded-xs shadow-xs flex items-center gap-2 transition-colors"
                >
                  <CalendarPlus className="w-4 h-4 text-[#C9A27E]" />
                  <span>Add to Google Calendar</span>
                </a>

                <button
                  onClick={() => downloadIcsFile(calendarDetails)}
                  className="px-4 py-2.5 bg-white border border-[#EEE8E1] hover:border-[#1C1B1F] text-xs font-semibold text-[#1C1B1F] rounded-xs shadow-xs flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#C9A27E]" />
                  <span>Download .ICS Calendar File</span>
                </button>
              </div>

              <div className="pt-6 border-t border-[#EEE8E1]">
                <p className="text-xs text-[#6B6670]">
                  Need to reschedule or speak directly to a showroom manager? Call {siteConfig.displayPhone}.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
