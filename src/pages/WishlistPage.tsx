import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, Trash2, Sparkles } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { products } from '../data/products';
import { formatPrice } from '../lib/formatPrice';
import { SmartImage } from '../components/ui/SmartImage';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const WishlistPage: React.FC = () => {
  useDocumentTitle('Your Curated Wishlist', 'Saved glam pieces and bespoke mirrors ready to order.');
  const { productIds, toggleWishlist, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);

  const savedProducts = products.filter((p) => productIds.includes(p.id));

  return (
    <div className="pt-28 pb-24 bg-[#FBF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-[#EEE8E1]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Saved Selection</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1B1F] tracking-tight">
              Your Curated Wishlist
            </h1>
          </div>

          {savedProducts.length > 0 && (
            <button
              onClick={clearWishlist}
              className="mt-4 sm:mt-0 text-xs text-[#6B6670] hover:text-[#C2566B] transition-colors"
            >
              Clear All ({savedProducts.length} items)
            </button>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-white border border-[#EEE8E1] rounded-xs p-12 text-center max-w-md mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#C9A27E] mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl text-[#1C1B1F] mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-[#6B6670] mb-6">
              Click the heart icon on any product in our catalogue to save your favourite mirrored and diamond furniture.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs hover:opacity-95"
            >
              <span>Browse Catalogues</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((product) => {
              const effectivePrice = product.salePrice ?? product.price;
              return (
                <div
                  key={product.id}
                  className="bg-white border border-[#EEE8E1] rounded-xs overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/5] bg-[#F5F5F7]">
                    <SmartImage
                      src={product.images[0]}
                      alt={product.name}
                      fallbackTitle={product.name}
                      aspectRatio="auto"
                      className="w-full h-full"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-[#C2566B] flex items-center justify-center shadow-xs"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] text-[#6B6670] uppercase tracking-wider block mb-1">
                        {product.collectionName}
                      </span>
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="font-serif text-base font-medium text-[#1C1B1F] hover:text-[#C9A27E] transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                    </div>

                    <div className="pt-4 mt-3 border-t border-[#EEE8E1] flex items-center justify-between">
                      <span className="font-sans font-bold text-base text-[#1C1B1F]">
                        {formatPrice(effectivePrice)}
                      </span>
                      <button
                        onClick={() => addItem(product, 1)}
                        className="px-3 py-1.5 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs hover:opacity-90 flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Basket</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
