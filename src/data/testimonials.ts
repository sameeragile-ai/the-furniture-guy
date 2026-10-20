export interface Testimonial {
  id: string;
  name: string;
  town: string;
  rating: number;
  productName: string;
  quote: string;
  date: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Charlotte Pemberton',
    town: 'Alderley Edge, Cheshire',
    rating: 5,
    productName: 'Crushed Diamond Mirrored TV Unit with Electric Fire',
    quote: 'The photos genuinely do not do it justice. When the evening downlights hit the crushed diamonds, the whole lounge glows. The delivery lads brought it straight into our living room and took away every scrap of packing. Absolute five-star service.',
    date: 'March 2026',
    verified: true,
  },
  {
    id: 't-2',
    name: 'Marcus & Hayley Vance',
    town: 'Solihull, West Midlands',
    rating: 5,
    productName: 'Marble Effect Dining Table with 6 Grey Velvet Chairs',
    quote: 'We booked a private showroom visit on a Saturday morning. The quality of the bevelled mirror work and the heavy marble top blew us away. Everyone who visits stops dead in their tracks when they see the dining room.',
    date: 'February 2026',
    verified: true,
  },
  {
    id: 't-3',
    name: 'Eleanor Sterling',
    town: 'Kensington, London',
    rating: 5,
    productName: 'Venice Mirrored Display Cabinet with LED Lights',
    quote: 'I had been hunting for a mirrored display cabinet with genuine high-clarity bevelled glass for months. King of Bling is head and shoulders above high-street alternatives. Impeccable craftsmanship and white-glove arrival.',
    date: 'January 2026',
    verified: true,
  },
  {
    id: 't-4',
    name: 'Victoria Ashworth',
    town: 'Harrogate, North Yorkshire',
    rating: 5,
    productName: 'Diamond Crush Fireplace Surround with LED Flame',
    quote: 'Plugged it straight into the wall socket and instantly had an opulent focal point for our Georgian townhouse. The heat fan is whisper quiet and the crystals sparkle like genuine jewels.',
    date: 'March 2026',
    verified: true,
  },
  {
    id: 't-5',
    name: 'David & Sian MacLeod',
    town: 'Morningside, Edinburgh',
    rating: 5,
    productName: 'Silver Crushed Diamond Angel Wings Wall Art',
    quote: 'Delivered to Scotland in timber-reinforced crates without a single scratch. It looks like a high-end gallery installation above our mirrored console table. Extraordinary value for bespoke glam.',
    date: 'February 2026',
    verified: true,
  },
];
