import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useLenisScroll } from './hooks/useLenisScroll';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Preloader } from './components/layout/Preloader';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchOverlay } from './components/layout/SearchOverlay';
import { FloatingActions } from './components/layout/FloatingActions';
import { CallbackModal } from './components/layout/CallbackModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ClearancePage } from './pages/ClearancePage';
import { BookVisitPage } from './pages/BookVisitPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { DeliveryReturnsPage, PrivacyPage, TermsPage } from './pages/LegalPages';
import { NotFoundPage } from './pages/NotFoundPage';

// Animated wrapper for route transitions
const AnimatedRoutes: React.FC<{ onOpenCallback: () => void }> = ({ onOpenCallback }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage onOpenCallback={onOpenCallback} />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/collections/:slug" element={<CollectionPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/clearance" element={<ClearancePage />} />
          <Route path="/book" element={<BookVisitPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/delivery-returns" element={<DeliveryReturnsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
};

export default function App() {
  useLenisScroll();

  const [isAnnouncementDismissed, setIsAnnouncementDismissed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Preloader />

      <div className="flex flex-col min-h-screen bg-[#FBF9F6] text-[#1C1B1F]">
        <AnnouncementBar
          isDismissed={isAnnouncementDismissed}
          onDismiss={() => setIsAnnouncementDismissed(true)}
        />

        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenCallback={() => setIsCallbackOpen(true)}
        />

        <AnimatedRoutes onOpenCallback={() => setIsCallbackOpen(true)} />

        <Footer onOpenCallback={() => setIsCallbackOpen(true)} />

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <SearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
        <FloatingActions />
        <CallbackModal
          isOpen={isCallbackOpen}
          onClose={() => setIsCallbackOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
