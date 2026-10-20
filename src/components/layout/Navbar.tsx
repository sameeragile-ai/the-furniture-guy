import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Phone, Menu, X, ChevronDown, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { siteConfig } from '../../config/site';
import { collections } from '../../data/collections';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { SmartImage } from '../ui/SmartImage';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenCallback?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartBouncing, setIsCartBouncing] = useState(false);

  const location = useLocation();
  const itemCount = useCartStore((state) => state.getItemCount());
  const setDrawerOpen = useCartStore((state) => state.setDrawerOpen);
  const lastAddedItem = useCartStore((state) => state.lastAddedItem);
  const wishlistCount = useWishlistStore((state) => state.productIds.length);

  // Scroll detection for navbar shrinking & frosted glass
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart bounce animation on item addition
  useEffect(() => {
    if (lastAddedItem) {
      setIsCartBouncing(true);
      const timer = setTimeout(() => setIsCartBouncing(false), 700);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCollectionsHovered(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop All', href: '/shop' },
    { name: 'Collections', href: '/shop', hasMegaMenu: true },
    { name: 'Clearance', href: '/clearance', isSale: true },
    { name: 'Book a Visit', href: '/book' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pt-safe ${
          isScrolled
            ? 'h-[64px] sm:h-[68px] glass-nav border-b border-[#EEE8E1] shadow-xs'
            : 'h-[76px] sm:h-[88px] bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Wordmark (Logo left) */}
          <Link
            to="/"
            className="flex flex-col group py-1 shrink-0 min-h-[44px] justify-center"
            aria-label="The Furniture Guy homepage"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-[#1C1B1F] group-hover:text-[#966C3E] transition-colors leading-none">
                {siteConfig.businessName}
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-semibold text-luxe-gradient leading-none mt-1">
              {siteConfig.subBrand}
            </span>
          </Link>

          {/* Desktop Nav Links (Zone 2) */}
          <nav className="hidden lg:flex items-center gap-7 h-full">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              if (link.hasMegaMenu) {
                return (
                  <div
                    key={link.name}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => setIsCollectionsHovered(true)}
                    onMouseLeave={() => setIsCollectionsHovered(false)}
                  >
                    <button
                      className={`relative flex items-center gap-1 text-sm font-medium tracking-wide transition-colors py-2 min-h-[44px] ${
                        active ? 'text-[#1C1B1F] font-semibold' : 'text-[#4A4650] hover:text-[#1C1B1F]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isCollectionsHovered ? 'rotate-180 text-[#C9A27E]' : 'text-[#8E8A94]'
                        }`}
                      />
                      {active && (
                        <motion.div
                          layoutId="navUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-luxe-gradient"
                        />
                      )}
                    </button>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {isCollectionsHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white border border-[#EEE8E1] shadow-xl p-6 rounded-xs z-50"
                        >
                          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EEE8E1]">
                            <div>
                              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C9A27E] font-semibold">
                                Curated Suites
                              </span>
                              <h4 className="font-serif text-lg text-[#1C1B1F]">
                                Explore by Design Collection
                              </h4>
                            </div>
                            <Link
                              to="/shop"
                              className="text-xs font-semibold text-[#1C1B1F] hover:text-[#C9A27E] flex items-center gap-1 transition-colors"
                            >
                              View All Products &rarr;
                            </Link>
                          </div>

                          <div className="grid grid-cols-4 gap-4">
                            {collections.slice(0, 8).map((col) => (
                              <Link
                                key={col.id}
                                to={`/collections/${col.slug}`}
                                className="group/item block text-center"
                              >
                                <div className="aspect-[4/3] rounded-xs overflow-hidden mb-2 bg-[#F5F5F7] border border-[#EEE8E1]">
                                  <SmartImage
                                    src={col.image}
                                    alt={col.title}
                                    fallbackTitle={col.title}
                                    aspectRatio="auto"
                                    className="w-full h-full"
                                    imageClassName="group-hover/item:scale-108 transition-transform duration-500"
                                  />
                                </div>
                                <span className="font-serif text-xs font-medium text-[#1C1B1F] group-hover/item:text-[#C9A27E] transition-colors block truncate">
                                  {col.title}
                                </span>
                                <span className="text-[10px] text-[#6B6670]">
                                  {col.itemCount} items
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors py-2 min-h-[44px] flex items-center ${
                    link.isSale ? 'text-[#C2566B] font-semibold' : ''
                  } ${
                    active ? 'text-[#1C1B1F] font-semibold' : 'text-[#4A4650] hover:text-[#1C1B1F]'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {link.name}
                    {link.isSale && (
                      <span className="text-[9px] uppercase px-1 py-0.5 rounded-xs bg-[#C2566B]/10 text-[#C2566B] font-bold">
                        Sale
                      </span>
                    )}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-luxe-gradient"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons (On mobile: Cart icon + Hamburger, Search & Wishlist also accessible) */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="w-11 h-11 flex items-center justify-center text-[#1C1B1F] hover:text-[#C9A27E] transition-colors active-press"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link (Hidden on smallest screens, available in mobile menu) */}
            <Link
              to="/wishlist"
              className="relative w-11 h-11 hidden sm:flex items-center justify-center text-[#1C1B1F] hover:text-[#C9A27E] transition-colors active-press"
              aria-label={`View wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#1C1B1F] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger with bounce animation */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative w-11 h-11 flex items-center justify-center text-[#1C1B1F] hover:text-[#C9A27E] transition-colors active-press"
              aria-label={`View shopping basket (${itemCount} items)`}
            >
              <motion.div
                animate={isCartBouncing ? { scale: [1, 1.25, 0.95, 1.15, 1] } : { scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ShoppingBag className="w-5 h-5" />
              </motion.div>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-4 h-4 rounded-full bg-luxe-gradient text-[#1C1B1F] text-[10px] font-bold flex items-center justify-center shadow-xs"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* "Call Now" Pill with gradient border (desktop) */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1C1B1F] bg-white border border-[#D9A89A] hover:bg-luxe-gradient hover:border-transparent transition-all shadow-xs active-press"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A27E]" />
              <span>Call Us</span>
            </a>

            {/* Mobile Hamburger Menu Toggle (Min 44x44px touch target) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-11 h-11 lg:hidden flex items-center justify-center text-[#1C1B1F] active-press"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu with light luxury gradient background */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-hero-radial lg:hidden flex flex-col pt-safe pb-safe px-5 sm:px-8 overflow-y-auto"
            style={{ height: '100dvh' }}
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between py-4 border-b border-[#EEE8E1] shrink-0">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="font-serif text-2xl font-medium text-[#1C1B1F]">
                  {siteConfig.businessName}
                </span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#C9A27E] font-semibold">
                  {siteConfig.subBrand}
                </span>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-11 h-11 rounded-full border border-[#EEE8E1] bg-white flex items-center justify-center text-[#1C1B1F] shadow-xs active-press"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Staggered Nav Links */}
            <div className="py-6 flex flex-col gap-3 my-auto">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.04, duration: 0.3 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-serif text-2xl sm:text-3xl transition-colors block py-2 min-h-[44px] flex items-center justify-between border-b border-[#EEE8E1]/60 ${
                      link.isSale ? 'text-[#C2566B]' : 'text-[#1C1B1F]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.isSale ? (
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-[#C2566B]/10 text-[#C2566B] px-2 py-0.5 rounded-xs">
                        Sale
                      </span>
                    ) : (
                      <span className="text-xs text-[#C9A27E] font-sans font-light">&rarr;</span>
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
              >
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-xl sm:text-2xl text-[#6B6670] flex items-center justify-between py-2 min-h-[44px]"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#C9A27E]" />
                    <span>Saved Wishlist ({wishlistCount})</span>
                  </span>
                  <span className="text-xs text-[#C9A27E]">&rarr;</span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Contact & WhatsApp Callouts at bottom */}
            <div className="pt-4 pb-6 mt-auto flex flex-col gap-3 border-t border-[#EEE8E1] shrink-0">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hi,%20I'm%20interested%20in%20The%20Furniture%20Guy%20glam%20collection`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[46px] py-3 bg-[#25D366] text-white text-center rounded-xs text-sm font-semibold flex items-center justify-center gap-2 shadow-xs active-press"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp ({siteConfig.whatsappDisplay})</span>
              </a>

              <a
                href={`tel:${siteConfig.phone}`}
                className="w-full min-h-[46px] py-3 bg-[#1C1B1F] text-white text-center rounded-xs text-sm font-semibold flex items-center justify-center gap-2 shadow-xs active-press"
              >
                <Phone className="w-4 h-4" />
                <span>Call Showroom ({siteConfig.displayPhone})</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
