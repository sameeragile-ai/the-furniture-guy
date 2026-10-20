import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ShieldCheck, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { siteConfig } from '../../config/site';

interface FooterProps {
  onOpenCallback?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCallback }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    collections: false,
    care: false,
    showroom: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#1C1B1F] text-[#FBF9F6] border-t border-[#2D2B33] pt-12 sm:pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 sm:pb-14 border-b border-[#2D2B33]">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#FBF9F6]">
                {siteConfig.businessName}
              </span>
              <span className="block text-xs uppercase tracking-[0.25em] text-[#E8D3B9] font-medium mt-1">
                {siteConfig.subBrand} · Established UK
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#A8A4AE] leading-relaxed max-w-md">
              Specialists in high-impact glam furniture, hand-inlaid crushed diamond electric fireplaces, bevelled mirrored display suites, and sculpted velvet chairs. Built to catch the light in extraordinary British homes.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2B2930] hover:bg-[#E8D3B9] hover:text-[#1C1B1F] flex items-center justify-center transition-colors text-[#FBF9F6]"
                aria-label="Visit The Furniture Guy on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2B2930] hover:bg-[#E8D3B9] hover:text-[#1C1B1F] flex items-center justify-center transition-colors text-[#FBF9F6]"
                aria-label="Follow The Furniture Guy on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              {onOpenCallback && (
                <button
                  onClick={onOpenCallback}
                  className="text-xs text-[#E8D3B9] hover:underline flex items-center gap-1.5 ml-2 min-h-[44px] cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Request a Call Back
                </button>
              )}
            </div>
          </div>

          {/* Column 2: Collections / Suites (Collapsible Accordion on Mobile) */}
          <div className="border-t border-[#2D2B33] md:border-t-0 pt-4 md:pt-0">
            <button
              onClick={() => toggleSection('collections')}
              className="w-full flex items-center justify-between text-left md:pointer-events-none py-1 md:py-0"
              aria-expanded={openSections.collections}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[#E8D3B9] font-semibold block">
                Suites & Ranges
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#A8A4AE] md:hidden transition-transform duration-200 ${
                  openSections.collections ? 'rotate-180 text-[#E8D3B9]' : ''
                }`}
              />
            </button>
            <div className={`mt-3 space-y-2 text-sm text-[#A8A4AE] ${openSections.collections ? 'block' : 'hidden md:block'}`}>
              <ul className="space-y-2">
                <li>
                  <Link to="/collections/mirrored-furniture" className="hover:text-[#FBF9F6] transition-colors block py-1">
                    Mirrored Furniture
                  </Link>
                </li>
                <li>
                  <Link to="/collections/crushed-diamond" className="hover:text-[#FBF9F6] transition-colors block py-1">
                    Crushed Diamond Edit
                  </Link>
                </li>
                <li>
                  <Link to="/collections/fireplaces" className="hover:text-[#FBF9F6] transition-colors block py-1">
                    Electric Fireplace Suites
                  </Link>
                </li>
                <li>
                  <Link to="/collections/dining-sets" className="hover:text-[#FBF9F6] transition-colors block py-1">
                    Marble & Mirrored Dining
                  </Link>
                </li>
                <li>
                  <Link to="/collections/chairs-seating" className="hover:text-[#FBF9F6] transition-colors block py-1">
                    Velvet Accent Seating
                  </Link>
                </li>
                <li>
                  <Link to="/clearance" className="text-[#D9A89A] hover:text-[#FFFFFF] transition-colors font-medium block py-1">
                    Showroom Clearance
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Customer Care (Collapsible Accordion on Mobile) */}
          <div className="border-t border-[#2D2B33] md:border-t-0 pt-4 md:pt-0">
            <button
              onClick={() => toggleSection('care')}
              className="w-full flex items-center justify-between text-left md:pointer-events-none py-1 md:py-0"
              aria-expanded={openSections.care}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[#E8D3B9] font-semibold block">
                Customer Care
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#A8A4AE] md:hidden transition-transform duration-200 ${
                  openSections.care ? 'rotate-180 text-[#E8D3B9]' : ''
                }`}
              />
            </button>
            <div className={`mt-3 space-y-2 text-sm text-[#A8A4AE] ${openSections.care ? 'block' : 'hidden md:block'}`}>
              <ul className="space-y-2">
                <li>
                  <Link to="/book" className="hover:text-[#FBF9F6] transition-colors block py-1">
                    Book a Showroom Visit
                  </Link>
                </li>
                <li>
                  <Link to="/delivery-returns" className="hover:text-[#FBF9F6] transition-colors block py-1">
                    UK Delivery & Assembly
                  </Link>
                </li>
                <li>
                  <Link to="/delivery-returns#returns" className="hover:text-[#FBF9F6] transition-colors block py-1">
                    Returns & 12-Month Guarantee
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[#FBF9F6] transition-colors block py-1">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-[#FBF9F6] transition-colors block py-1">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#FBF9F6] transition-colors block py-1">
                    Contact Our Showroom
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Showroom & Concierge (Collapsible Accordion on Mobile) */}
          <div className="border-t border-[#2D2B33] md:border-t-0 pt-4 md:pt-0">
            <button
              onClick={() => toggleSection('showroom')}
              className="w-full flex items-center justify-between text-left md:pointer-events-none py-1 md:py-0"
              aria-expanded={openSections.showroom}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[#E8D3B9] font-semibold block">
                UK Showroom
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#A8A4AE] md:hidden transition-transform duration-200 ${
                  openSections.showroom ? 'rotate-180 text-[#E8D3B9]' : ''
                }`}
              />
            </button>
            <div className={`mt-3 space-y-2.5 text-xs text-[#A8A4AE] ${openSections.showroom ? 'block' : 'hidden md:block'}`}>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#E8D3B9] shrink-0 mt-0.5" />
                  <span>{siteConfig.address}, {siteConfig.city}, {siteConfig.postcode}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#E8D3B9] shrink-0" />
                  <span>{siteConfig.openingHours}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E8D3B9] shrink-0" />
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-[#FBF9F6] transition-colors">
                    {siteConfig.displayPhone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E8D3B9] shrink-0" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-[#FBF9F6] transition-colors">
                    {siteConfig.email}
                  </a>
                </li>
              </ul>

              {/* VIP Club Signup */}
              <div className="pt-3">
                <span className="text-xs text-[#FBF9F6] font-medium block mb-1.5">
                  Join our VIP Glam Club
                </span>
                {subscribed ? (
                  <div className="p-2 bg-[#2B2930] rounded-xs text-[11px] text-[#E8D3B9]">
                    Welcome to VIP Club. Use code <strong>BLING10</strong> for 10% off!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-1.5">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="flex-1 px-3 py-2 text-xs bg-[#2B2930] border border-[#3E3C44] rounded-xs text-[#FBF9F6] placeholder:text-[#7A7582] focus:outline-hidden focus:border-[#E8D3B9]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 min-h-[44px] bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer"
                      aria-label="Subscribe to VIP Club"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8E8A94]">
          <div className="flex items-center gap-2 text-center md:text-left">
            <span>&copy; {new Date().getFullYear()} {siteConfig.businessName} (King of Bling). All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-[#A8A4AE]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E8D3B9]" /> Secure Checkout
            </span>
            <span>·</span>
            <span>Visa</span>
            <span>·</span>
            <span>Mastercard</span>
            <span>·</span>
            <span>Amex</span>
            <span>·</span>
            <span>Pay on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
