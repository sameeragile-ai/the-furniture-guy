export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  itemCount: number;
  featured?: boolean;
}

export const collections: Collection[] = [
  {
    id: 'mirrored-furniture',
    slug: 'mirrored-furniture',
    title: 'Mirrored Furniture',
    subtitle: 'Luminous Bevelled Reflections',
    description: 'Bespoke mirrored consoles, chests, bedside cabinets, and display cases engineered to amplify natural light and bring ballroom opulence to contemporary homes.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    itemCount: 14,
    featured: true,
  },
  {
    id: 'crushed-diamond',
    slug: 'crushed-diamond',
    title: 'Crushed Diamond',
    subtitle: 'Hand-Finished Crystal Sparkle',
    description: 'Our iconic signature line. Encrusted with microscopic multi-faceted glass crystals that refract ambient light with diamond-grade brilliance.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    itemCount: 12,
    featured: true,
  },
  {
    id: 'dining-sets',
    slug: 'dining-sets',
    title: 'Dining Sets',
    subtitle: 'Dramatic Entertainer Tables',
    description: 'Polished marble tops, chrome cross-leg architecture, and crushed crystal border details paired with bespoke quilted velvet dining chairs.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    itemCount: 8,
    featured: true,
  },
  {
    id: 'living-room-tv-units',
    slug: 'living-room-tv-units',
    title: 'Living Room & TV Units',
    subtitle: 'Entertainment Centrepieces',
    description: 'Statement media suites combining bevelled glass panelling, integrated electric warmth, and concealed cable conduits for pristine glamour.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    itemCount: 9,
    featured: false,
  },
  {
    id: 'fireplaces',
    slug: 'fireplaces',
    title: 'Fireplaces',
    subtitle: 'LED Flame & Crystal Surrounds',
    description: 'Zero-chimney electric suites with lifelike ambient flames, adjustable glow intensities, and crushed crystal surrounds that command any drawing room.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    itemCount: 6,
    featured: true,
  },
  {
    id: 'chairs-seating',
    slug: 'chairs-seating',
    title: 'Chairs & Seating',
    subtitle: 'Sculpted Chesterfield & Wingback',
    description: 'Opulent deep-buttoned velvet wingback chairs, chrome lion-knocker accents, and tufted cocktail ottomans made for decadent comfort.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    itemCount: 10,
    featured: false,
  },
  {
    id: 'lighting-decor',
    slug: 'lighting-decor',
    title: 'Lighting & Décor',
    subtitle: 'Crystal Accents & Wall Statements',
    description: 'Prismatic crystal chandelier table lamps, illuminated mirrored letter signs, and faceted sunburst mirrors designed as heirloom focal points.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    itemCount: 11,
    featured: false,
  },
  {
    id: 'clearance',
    slug: 'clearance',
    title: 'Clearance & Ex-Display',
    subtitle: 'Final Showroom Reductions',
    description: 'Discontinued showroom display models and seasonal vault liquidations at up to 40% off. Immediate dispatch across mainland UK.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    itemCount: 7,
    featured: true,
  },
];
