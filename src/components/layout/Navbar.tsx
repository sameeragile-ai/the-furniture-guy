import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Phone, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 40);
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCollectionsHovered(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/shop', hasMegaMenu: true },
    { name: 'Clearance', href: '/clearance', isSale: true },
    { name: 'Book a Visit', href: '/book' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'h-[68px] glass-nav border-b border-[#EEE8E1] shadow-xs'
            : 'h-[88px] bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Wordmark (Zone 1) */}
          <Link
            to="/"
            className="flex flex-col group py-1 shrink-0"
            aria-label="The Furniture Guy homepage"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1C1B1F] group-hover:text-[#966C3E] transition-colors leading-none">
                {siteConfig.businessName}
              </span>
            </div>
            <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-luxe-gradient leading-none mt-1">
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
                      className={`relative flex items-center gap-1 text-sm font-medium tracking-wide transition-colors py-2 ${
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
                  className={`relative text-sm font-medium tracking-wide transition-colors py-2 ${
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

          {/* Right Action Icons (Zone 3) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#1C1B1F] hover:text-[#C9A27E] transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-[#1C1B1F] hover:text-[#C9A27E] transition-colors"
              aria-label={`View wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1C1B1F] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger with bounce animation */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative p-2 text-[#1C1B1F] hover:text-[#C9A27E] transition-colors"
              aria-label={`View shopping basket (${itemCount} items)`}
            >
              <motion.div
                animate={isCartBouncing ? { scale: [1, 1.3, 0.9, 1.15, 1] } : { scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <ShoppingBag className="w-5 h-5" />
              </motion.div>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-luxe-gradient text-[#1C1B1F] text-[10px] font-bold flex items-center justify-center shadow-xs"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* "Call Now" Pill with gradient border (desktop) */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1C1B1F] bg-white border border-[#D9A89A] hover:bg-luxe-gradient hover:border-transparent transition-all shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A27E]" />
              <span>Call Us</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 lg:hidden text-[#1C1B1F]"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#FBF9F6] lg:hidden flex flex-col pt-20 pb-8 px-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-6 border-b border-[#EEE8E1]">
              <span className="font-serif text-2xl text-[#1C1B1F]">{siteConfig.businessName}</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-[#EEE8E1] flex items-center justify-center text-[#1C1B1F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 flex flex-col gap-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={`font-serif text-2xl transition-colors block py-1 ${
                      link.isSale ? 'text-[#C2566B]' : 'text-[#1C1B1F]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Quick Collections */}
            <div className="pt-6 border-t border-[#EEE8E1]">
              <span className="text-[11px] uppercase tracking-wider text-[#6B6670] font-medium block mb-3">
                Featured Categories
              </span>
              <div className="grid grid-cols-2 gap-2">
                {collections.slice(0, 4).map((c) => (
                  <Link
                    key={c.id}
                    to={`/collections/${c.slug}`}
                    className="p-2.5 bg-white border border-[#EEE8E1] rounded-xs text-xs font-serif text-[#1C1B1F] flex items-center justify-between"
                  >
                    <span>{c.title}</span>
                    <Sparkles className="w-3 h-3 text-[#C9A27E]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Contact & WhatsApp CTAs */}
            <div className="mt-auto pt-8 flex flex-col gap-3">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hi,%20I'm%20interested%20in%20The%20Furniture%20Guy%20glam%20collection`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] text-white text-center rounded-xs text-sm font-semibold flex items-center justify-center gap-2 shadow-xs"
              >
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="w-full py-3 bg-[#1C1B1F] text-white text-center rounded-xs text-sm font-semibold flex items-center justify-center gap-2 shadow-xs"
              >
                <Phone className="w-4 h-4" /> Call Our Team ({siteConfig.displayPhone})
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
