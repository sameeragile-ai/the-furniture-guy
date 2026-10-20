/**
 * Site-wide configuration and brand details
 * All business details, contact information, and defaults are centralized here.
 */

export interface SiteConfig {
  businessName: string;
  subBrand: string;
  tagline: string;
  phone: string;
  displayPhone: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  openingHours: string;
  facebook: string;
  instagram: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  formEndpoint: string;
  freeDeliveryThreshold: number;
  announcements: string[];
}

export const siteConfig: SiteConfig = {
  businessName: "The Furniture Guy",
  subBrand: "King of Bling",
  tagline: "Glam furniture that catches the light",
  phone: "+447400000000",
  displayPhone: "07400 000000",
  whatsapp: "447400000000",
  whatsappDisplay: "+44 7400 000000",
  email: "hello@thefurnitureguy.co.uk",
  address: "Unit 4, Diamond Way, West Midlands",
  city: "Birmingham",
  postcode: "B1 1AA",
  country: "United Kingdom",
  openingHours: "Mon–Sat 10:00–18:00, Sun Closed",
  facebook: "https://www.facebook.com/thefurnitureguy.co.uk/",
  instagram: "https://www.instagram.com/thefurnitureguyuk",
  currency: "GBP",
  currencySymbol: "£",
  locale: "en-GB",
  formEndpoint: "", // Configurable: Formspree/EmailJS endpoint or fallback to simulated 1s delay + localStorage
  freeDeliveryThreshold: 499,
  announcements: [
    "Free local UK delivery on orders over £499",
    "Clearance now on — up to 40% off selected mirrored pieces",
    "Private showroom viewings & video consultations available"
  ]
};
