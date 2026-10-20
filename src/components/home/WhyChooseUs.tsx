import React from 'react';
import { Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Precision Bevelled Glass & Micro-Crystal Fill',
      desc: 'We reject plastic acrylic lookalikes. All our mirrored furniture features heavy, diamond-polished bevelled safety glass, and our crystal ranges use genuine multi-faceted high-refraction glass crystals that sparkle under any room lighting.',
    },
    {
      num: '02',
      title: 'Specialist Two-Man Delivery Across the UK',
      desc: 'Fragile luxury mirrors require white-glove transport, not standard postal couriers. Our vetted two-man delivery specialists deliver directly to your ground or upper floor room of choice, unpack, inspect every bevel, and can provide full assembly.',
    },
    {
      num: '03',
      title: 'Pay on Delivery & Transparent Inspection',
      desc: 'We are so confident in the finish and reflective brilliance of our pieces that we offer a full "Pay on Delivery" option. Inspect your dining suite, cabinet, or fireplace in your home before completing payment.',
    },
    {
      num: '04',
      title: 'Private Showroom & Video Concierge',
      desc: 'Experience our pieces before deciding. Book an exclusive appointment at our showroom or request a live 1-to-1 video walk-around with one of our stylists who will demonstrate flame effects, LED settings, and lighting response.',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-[#EEE8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The King of Bling Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1F] tracking-tight">
            Why discerning UK homeowners choose The Furniture Guy
          </h2>
        </div>

        {/* Numbered Editorial List */}
        <div className="divide-y divide-[#EEE8E1]">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline transition-colors hover:bg-[#FBF9F6]/50 px-4 -mx-4 rounded-xs"
            >
              <div className="lg:col-span-2">
                <span className="font-serif text-4xl sm:text-5xl font-light text-[#D9A89A]">
                  {pillar.num}
                </span>
              </div>
              <div className="lg:col-span-4">
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1B1F]">
                  {pillar.title}
                </h3>
              </div>
              <div className="lg:col-span-6">
                <p className="text-sm sm:text-base text-[#6B6670] leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
