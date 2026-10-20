# The Furniture Guy (King of Bling) — E-Commerce Website

A bespoke, production-ready luxury e-commerce platform for **The Furniture Guy** (sub-brand / social name: **King of Bling**), Britain's premier glam retailer specialising in mirrored, crushed diamond, velvet, and crystal furniture.

## Features Included

- **Tech Stack**: Vite + React 19 + TypeScript + Tailwind CSS + Zustand (with persist) + Lenis smooth scroll + Motion animations + Lucide icons.
- **Brand Palette ("Light Luxe Glam")**: Warm pearl (`#FBF9F6`), champagne & rose gold gradients, hairline borders, and silver shimmer accents.
- **Refined Navigation**: Transparent-to-frosted glass sticky navbar, live search overlay, collection mega-menu dropdown, cart bounce count indicator, and mobile full-screen drawer.
- **Product Repertoire**: Over 25 rich items with high-resolution photography, dimension specifications (W×D×H cm), genuine British copy, and sale pricing.
- **Contiguous Purchase Flow**:
  - Slide-in Cart Drawer with Free Delivery threshold meter and promo code support (`BLING10` for 10% off).
  - 3-Step Checkout with Live Interactive Credit Card preview and "Pay on Delivery / Reserve Now" option.
  - Wishlist persistent store.
- **Showroom Consultation & Video Tour Booking**:
  - 4-step booking process with appointment format selection, interactive calendar with unavailable Sunday logic, UK phone validation, Google Calendar link, and `.ics` file generation.
- **Customer Engagement**:
  - Floating WhatsApp & Click-to-Call buttons with pulse rings.
  - "Request a Call Back" modal accessible across navigation, product pages, and footer.
  - Real customer spaces section featuring official Facebook showroom media.

## Project Structure & Where to Edit

| Location | Purpose |
| :--- | :--- |
| `src/config/site.ts` | **Central business details**: Phone, WhatsApp, email, showroom address, opening hours, Facebook URL, free delivery threshold (£499), and announcement banners. |
| `src/data/products.ts` | **Product catalog**: Add, modify, or remove items, change GBP prices, sale discounts, dimensions, finishes, and image URLs. |
| `src/data/collections.ts` | **Suites & Collections**: Categories, descriptions, and hero banner photos. |
| `src/data/testimonials.ts` | Customer reviews, UK hometowns, and verified purchaser flags. |
| `src/data/faqs.ts` | FAQ questions and answers organized by category. |

## Local Development & Build

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```

## Vercel Deployment

This project includes a `vercel.json` file with SPA rewrite rules (`/*` → `/index.html`) to ensure clean route reloading across all subpages (`/shop`, `/product/:slug`, `/book`, `/checkout`, etc.) with zero 404 errors.
