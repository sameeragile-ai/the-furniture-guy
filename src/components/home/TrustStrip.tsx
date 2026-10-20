import React from 'react';
import { Truck, Wrench, Eye, ShieldCheck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Truck,
      title: 'Free UK Delivery',
      desc: 'On all orders over £499',
    },
    {
      icon: Wrench,
      title: 'White-Glove Assembly',
      desc: 'Room of choice & packaging removal',
    },
    {
      icon: Eye,
      title: 'Showroom Viewing',
      desc: 'Private viewings & video consultations',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout & Guarantee',
      desc: '256-bit encryption + 12-month warranty',
    },
  ];

  return (
    <div className="bg-white border-y border-[#EEE8E1] py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop 4-column strip */}
        <div className="hidden md:grid grid-cols-4 gap-8">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#FAF6F0] border border-[#EEE8E1] flex items-center justify-center text-[#C9A27E] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#1C1B1F]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#6B6670] mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile horizontal ticker */}
        <div className="md:hidden flex overflow-x-auto no-scrollbar gap-6 py-1">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3 shrink-0">
                <div className="w-9 h-9 rounded-full bg-[#FAF6F0] border border-[#EEE8E1] flex items-center justify-center text-[#C9A27E] shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-semibold text-[#1C1B1F] whitespace-nowrap">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#6B6670] whitespace-nowrap">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
