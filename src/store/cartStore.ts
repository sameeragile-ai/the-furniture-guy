import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../data/products';
import { siteConfig } from '../config/site';

export interface CartItem {
  id: string; // unique item key: productId + variant
  product: Product;
  quantity: number;
  selectedColour?: string;
  price: number;
}

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  promoCode: string | null;
  promoDiscountPercent: number;
  promoError: string | null;
  lastAddedItem: CartItem | null;
  
  // Actions
  addItem: (product: Product, quantity?: number, selectedColour?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setDrawerOpen: (open: boolean) => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  
  // Computed getters
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingCost: () => number;
  getTotal: () => number;
  getAmountUntilFreeDelivery: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      promoCode: null,
      promoDiscountPercent: 0,
      promoError: null,
      lastAddedItem: null,

      addItem: (product: Product, quantity = 1, selectedColour?: string) => {
        const colour = selectedColour || (product.colours.length > 0 ? product.colours[0] : undefined);
        const itemId = `${product.id}-${colour || 'default'}`;
        const itemPrice = product.salePrice ?? product.price;

        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === itemId);
          let newItems: CartItem[];
          let targetItem: CartItem;

          if (existingIndex > -1) {
            newItems = state.items.map((item, idx) => {
              if (idx === existingIndex) {
                targetItem = { ...item, quantity: item.quantity + quantity };
                return targetItem;
              }
              return item;
            });
          } else {
            targetItem = {
              id: itemId,
              product,
              quantity,
              selectedColour: colour,
              price: itemPrice,
            };
            newItems = [...state.items, targetItem];
          }

          return {
            items: newItems,
            isDrawerOpen: true,
            lastAddedItem: targetItem!,
          };
        });
      },

      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], promoCode: null, promoDiscountPercent: 0, promoError: null });
      },

      setDrawerOpen: (open: boolean) => {
        set({ isDrawerOpen: open });
      },

      applyPromoCode: (code: string) => {
        const trimmed = code.trim().toUpperCase();
        if (trimmed === 'BLING10') {
          set({ promoCode: 'BLING10', promoDiscountPercent: 10, promoError: null });
          return true;
        } else if (trimmed === 'GLAM15') {
          set({ promoCode: 'GLAM15', promoDiscountPercent: 15, promoError: null });
          return true;
        } else {
          set({ promoError: 'Invalid promo code. Try "BLING10" for 10% off.' });
          return false;
        }
      },

      removePromoCode: () => {
        set({ promoCode: null, promoDiscountPercent: 0, promoError: null });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const percent = get().promoDiscountPercent;
        return (subtotal * percent) / 100;
      },

      getShippingCost: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= siteConfig.freeDeliveryThreshold ? 0 : 49.99;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingCost();
        return Math.max(0, subtotal - discount + shipping);
      },

      getAmountUntilFreeDelivery: () => {
        const subtotal = get().getSubtotal();
        const diff = siteConfig.freeDeliveryThreshold - subtotal;
        return diff > 0 ? diff : 0;
      },
    }),
    {
      name: 'tfg-cart-storage',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        promoDiscountPercent: state.promoDiscountPercent,
      }),
    }
  )
);
