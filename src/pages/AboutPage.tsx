import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, HeartHandshake, Eye, Award } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { siteConfig } from '../config/site';
import { SmartImage } from '../components/ui/SmartImage';

export const AboutPage: React.FC = () => {
  useDocumentTitle('About The Furniture Guy | King of Bling', 'Our heritage in high-impact British glam, hand-inlaid crushed diamond fireplaces, and bespoke mirrored suites.');

  const stats = [
    { value: '3,000+', label: 'Happy UK Homes', sub: 'Across England, Scotland & Wales' },
    { value: '500+', label: 'Luxury Designs', sub: 'Mirrored, Diamond & Velvet' },
    { value: '10+', label: 'Years of Heritage', sub: 'Family-Run British Retailer' },
    { value: '4.9★', label: 'Over 300 Reviews', sub: 'Verified 5-Star Feedback' },
  ];

  return (
    <div className="pt-28 pb-24 bg-[#FBF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Narrative */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF6F0] border border-[#EEE8E1] rounded-full text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our British Heritage</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1B1F] tracking-tight">
            Furniture that commands every room
          </h1>
          <p className="text-base sm:text-lg text-[#6B6670] mt-4 leading-relaxed font-light">
            Founded with a singular passion: to deliver high-octane luxury and opulent mirrored architecture to British homes at accessible, direct-from-workshop value.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#EEE8E1] p-6 text-center rounded-xs shadow-xs"
            >
              <span className="font-serif text-3xl sm:text-4xl text-[#1C1B1F] font-normal block mb-1">
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#C9A27E] block">
                {s.label}
              </span>
              <span className="text-[11px] text-[#8E8A94] mt-0.5 block">{s.sub}</span>
            </div>
          ))}
        </div>

        {/* Story Section: Two Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold block">
              The King of Bling Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1F] tracking-tight">
              From local passion to Britain's most recognisable glam retailer
            </h2>
            <p className="text-sm text-[#6B6670] leading-relaxed font-light">
              Known affectionately across the Midlands and beyond as "The Furniture Guy" and "King of Bling", our journey began with a simple observation: high-street department stores were charging exorbitant markups for flat, uninspiring furniture while glam and mirrored designs were treated as an afterthought.
            </p>
            <p className="text-sm text-[#6B6670] leading-relaxed font-light">
              We partnered directly with artisan workshops specialising in diamond-bevelled glasscutting, precision crystal setting, and heavy Chesterfield upholstery. Today, our pieces take pride of place in townhouses, country manors, and contemporary family homes throughout the UK.
            </p>

            <div className="pt-2">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-6 py-3 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs hover:opacity-95"
              >
                Book a Showroom Visit &rarr;
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-xs overflow-hidden shadow-xl border border-[#EEE8E1]">
            <SmartImage
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
              alt="The Furniture Guy Showroom Interior"
              fallbackTitle="Showroom Interior"
              aspectRatio="auto"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="border-t border-[#EEE8E1] pt-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B1F]">
              Our Guiding Principles
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white border border-[#EEE8E1] rounded-xs text-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#C9A27E] mx-auto mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-medium text-[#1C1B1F] mb-2">
                Real Bevelled Glass Only
              </h4>
              <p className="text-xs text-[#6B6670] leading-relaxed">
                Zero cheap plastic films or acrylic substitutes. We use genuine tempered mirror glass with hand-chamfered edges.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#EEE8E1] rounded-xs text-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#C9A27E] mx-auto mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-medium text-[#1C1B1F] mb-2">
                White-Glove Respect
              </h4>
              <p className="text-xs text-[#6B6670] leading-relaxed">
                Our two-man delivery team respects your home. We wear protective overshoes, carry goods to your chosen room, and remove packaging.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#EEE8E1] rounded-xs text-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#C9A27E] mx-auto mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-medium text-[#1C1B1F] mb-2">
                See Before You Pay
              </h4>
              <p className="text-xs text-[#6B6670] leading-relaxed">
                We believe in total peace of mind. Our "Pay on Delivery" service lets you inspect pieces in your room before parting with funds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
