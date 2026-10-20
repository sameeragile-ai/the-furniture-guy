import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Video, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const ShowroomCtaBand: React.FC = () => {
  const navigate = useNavigate();
  const [visitType, setVisitType] = useState<'Showroom Visit' | 'Video Call'>('Showroom Visit');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');

  const handleMiniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to full booking flow with prefilled state
    navigate('/book', {
      state: {
        prefilledType: visitType,
        prefilledDate: date,
        prefilledPhone: phone,
      },
    });
  };

  // Get tomorrow's date formatted as YYYY-MM-DD for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  return (
    <section className="py-20 bg-hero-radial border-b border-[#EEE8E1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-md border border-[#E8DFD5] rounded-xs p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C9A27E] font-semibold block">
                Private Viewing Appointments
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1F] tracking-tight leading-snug">
                Experience the brilliance in person
              </h2>
              <p className="text-sm text-[#6B6670] leading-relaxed">
                Step inside our private Midlands showroom or enjoy a one-on-one virtual walk-around. Our specialists will demonstrate crushed diamond refraction, LED flame profiles, and velvet texture samples tailored to your home.
              </p>

              <div className="pt-2 flex items-center gap-6 text-xs text-[#6B6670]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C9A27E]" />
                  <span>{siteConfig.openingHours}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C9A27E]" />
                  <span>No obligation to buy</span>
                </div>
              </div>
            </div>

            {/* Right Mini-Booking Form */}
            <div className="lg:col-span-7 bg-[#FBF9F6] border border-[#EEE8E1] p-6 sm:p-8 rounded-xs shadow-xs">
              <h3 className="font-serif text-lg font-medium text-[#1C1B1F] mb-4">
                Fast-Track Showroom Booking
              </h3>

              <form onSubmit={handleMiniSubmit} className="space-y-4">
                {/* Visit Type Segmented Buttons */}
                <div>
                  <label className="block text-xs font-medium text-[#1C1B1F] mb-1.5">
                    Viewing Format
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setVisitType('Showroom Visit')}
                      className={`py-2.5 px-3 text-xs font-semibold rounded-xs border flex items-center justify-center gap-2 transition-all ${
                        visitType === 'Showroom Visit'
                          ? 'bg-[#1C1B1F] text-white border-[#1C1B1F]'
                          : 'bg-white text-[#6B6670] border-[#EEE8E1] hover:border-[#C9A27E]'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>In-Person Showroom</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVisitType('Video Call')}
                      className={`py-2.5 px-3 text-xs font-semibold rounded-xs border flex items-center justify-center gap-2 transition-all ${
                        visitType === 'Video Call'
                          ? 'bg-[#1C1B1F] text-white border-[#1C1B1F]'
                          : 'bg-white text-[#6B6670] border-[#EEE8E1] hover:border-[#C9A27E]'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Live Video Tour</span>
                    </button>
                  </div>
                </div>

                {/* Date & Phone Input Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      min={minDateStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-white focus:outline-hidden focus:border-[#C9A27E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C1B1F] mb-1">
                      Contact Telephone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 07123 456789"
                      className="w-full px-3 py-2 text-xs border border-[#EEE8E1] rounded-xs bg-white focus:outline-hidden focus:border-[#C9A27E]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                >
                  <span>Select Time Slot & Confirm</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
