export interface FaqItem {
  id: string;
  category: 'Delivery & Assembly' | 'Showroom & Booking' | 'Care & Quality' | 'Ordering & Payment';
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Delivery & Assembly',
    question: 'How does your delivery service work across the UK?',
    answer: 'We operate our own dedicated two-man fleet and specialist furniture couriers to ensure delicate mirrored and crystal goods arrive in pristine condition. Orders over £499 qualify for Free Standard Delivery to mainland UK. We contact you 48 hours prior to arrange a designated delivery window.',
  },
  {
    id: 'faq-2',
    category: 'Delivery & Assembly',
    question: 'Is assembly available for dining tables and mirrored cabinets?',
    answer: 'Yes! Most of our mirrored units, bedsides, and fireplaces arrive fully constructed. For larger dining suites, marble tops, and consoles, our two-man delivery team can assemble the furniture in your room of choice and remove all protective packaging for a small optional fee of £45 at checkout.',
  },
  {
    id: 'faq-3',
    category: 'Showroom & Booking',
    question: 'Can I view the furniture in person before purchasing?',
    answer: 'Absolutely. We invite you to experience the sparkle firsthand at our private showroom. Because we offer bespoke personal attention, showroom visits are by appointment Monday through Saturday. You can book online in seconds using our booking calendar or request a live 1-to-1 video walk-around.',
  },
  {
    id: 'faq-4',
    category: 'Care & Quality',
    question: 'How do I clean and maintain mirrored and crushed diamond furniture?',
    answer: 'Mirrored surfaces should be cleaned with a dry or lightly misted lint-free microfibre cloth and ammonia-free glass cleaner. For crushed crystal panels, simply dust gently with an anti-static soft duster or soft-bristled brush. Never use scouring pads or harsh solvents.',
  },
  {
    id: 'faq-5',
    category: 'Ordering & Payment',
    question: 'What payment options do you accept? Can I pay on delivery?',
    answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express) via secure SSL checkout. We also offer a "Reserve Now & Pay on Delivery" service for customers who prefer to inspect their luxury furniture upon arrival before completing payment.',
  },
  {
    id: 'faq-6',
    category: 'Ordering & Payment',
    question: 'What is your guarantee and returns policy?',
    answer: 'All our items carry a comprehensive 12-month structural and electrical warranty. In the unlikely event that a piece arrives with cosmetic transit damage, our two-man team inspects it on site and provides an immediate replacement or full refund.',
  },
];
