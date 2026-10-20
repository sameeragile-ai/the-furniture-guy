import React from 'react';
import { Truck, ShieldCheck, Clock, RotateCcw } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const DeliveryReturnsPage: React.FC = () => {
  useDocumentTitle('UK Delivery & Returns Information', 'Details on two-man furniture delivery, room-of-choice positioning, and 12-month warranty.');

  return (
    <div className="pt-28 pb-24 bg-[#FBF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold block mb-2">
            Logistical Excellence
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1B1F] tracking-tight">
            Delivery, Assembly & Returns
          </h1>
          <p className="text-sm text-[#6B6670] mt-2">
            How we protect, transport, and guarantee your mirrored and crushed diamond furniture.
          </p>
        </div>

        <div className="bg-white border border-[#EEE8E1] rounded-xs p-6 sm:p-10 space-y-8 shadow-xs text-sm text-[#4A4650] leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#1C1B1F]">
              <Truck className="w-5 h-5 text-[#C9A27E]" />
              <h2 className="font-serif text-xl font-semibold">Specialist Two-Man Delivery</h2>
            </div>
            <p>
              We operate a dedicated delivery network designed specifically for high-fragility mirrored goods. Unlike general parcel couriers who flip boxes onto conveyor belts, our team handles each item with bespoke care.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#6B6670]">
              <li><strong>Free Delivery:</strong> All orders of £499 and above receive complimentary delivery to mainland England, Wales, and lowland Scotland.</li>
              <li><strong>Standard Orders (&lt;£499):</strong> Fixed subsidized rate of £39.99 per order.</li>
              <li><strong>48-Hour Notification:</strong> You will receive a telephone call or SMS notification confirming a 3-hour arrival window.</li>
              <li><strong>Room of Choice:</strong> Our team will bring your items directly into your ground or upper-floor room of choice (subject to adequate stair/hallway clearance).</li>
            </ul>
          </section>

          <section className="space-y-3 pt-6 border-t border-[#EEE8E1]">
            <div className="flex items-center gap-2 text-[#1C1B1F]">
              <ShieldCheck className="w-5 h-5 text-[#C9A27E]" />
              <h2 className="font-serif text-xl font-semibold">White-Glove Assembly Option</h2>
            </div>
            <p>
              For £45.00, our experienced delivery specialists will assemble your dining pedestals, fix console legs, ensure all mirror panels are aligned, and remove all protective wood, styrofoam, and carton packaging for eco-conscious recycling.
            </p>
          </section>

          <section id="returns" className="space-y-3 pt-6 border-t border-[#EEE8E1]">
            <div className="flex items-center gap-2 text-[#1C1B1F]">
              <RotateCcw className="w-5 h-5 text-[#C9A27E]" />
              <h2 className="font-serif text-xl font-semibold">14-Day Returns & 12-Month Guarantee</h2>
            </div>
            <p>
              We stand behind every item we craft. If you are not completely enchanted by your furniture upon arrival:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#6B6670]">
              <li><strong>Transit Inspection:</strong> You are encouraged to inspect your pieces upon delivery. If any mirror facet has sustained transit damage, we exchange it immediately without cost.</li>
              <li><strong>14-Day In-Home Return:</strong> You may return unused items in their original protective packaging within 14 days of delivery.</li>
              <li><strong>12-Month Warranty:</strong> All structural joints, drawer runners, and electric fireplace heating units carry an unconditional 12-month guarantee.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  useDocumentTitle('Privacy Policy | The Furniture Guy', 'Our customer privacy standards under UK GDPR.');

  return (
    <div className="pt-28 pb-24 bg-[#FBF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1B1F] mb-6">
          Privacy Policy
        </h1>
        <div className="bg-white border border-[#EEE8E1] rounded-xs p-8 text-xs text-[#6B6670] space-y-4 leading-relaxed shadow-xs">
          <p>
            At {siteConfig.businessName} (King of Bling), we respect your privacy and process personal information in strict compliance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
          </p>
          <h2 className="font-serif text-base font-semibold text-[#1C1B1F] pt-2">Data We Collect</h2>
          <p>
            We collect your name, delivery address, contact telephone, and email solely for the purpose of coordinating your showroom consultation, dispatching your delivery, and generating order invoices.
          </p>
          <h2 className="font-serif text-base font-semibold text-[#1C1B1F] pt-2">Third-Party Sharing</h2>
          <p>
            We never sell or monetise customer data. Information is shared only with our trusted logistics and delivery drivers to facilitate the transport of your furniture.
          </p>
          <h2 className="font-serif text-base font-semibold text-[#1C1B1F] pt-2">Your Rights</h2>
          <p>
            You have the right to request access to your records or request data deletion at any time by contacting hello@thefurnitureguy.co.uk.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  useDocumentTitle('Terms of Service | The Furniture Guy', 'Conditions of sale and showroom bookings.');

  return (
    <div className="pt-28 pb-24 bg-[#FBF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1B1F] mb-6">
          Terms of Service
        </h1>
        <div className="bg-white border border-[#EEE8E1] rounded-xs p-8 text-xs text-[#6B6670] space-y-4 leading-relaxed shadow-xs">
          <p>
            Welcome to {siteConfig.businessName}. By browsing our website, booking an appointment, or placing an order, you agree to these terms.
          </p>
          <h2 className="font-serif text-base font-semibold text-[#1C1B1F] pt-2">1. Orders & Pricing</h2>
          <p>
            All prices are stated in Pounds Sterling (GBP £) and include applicable UK taxes. We reserve the right to correct accidental typographical pricing errors prior to dispatch.
          </p>
          <h2 className="font-serif text-base font-semibold text-[#1C1B1F] pt-2">2. Delivery Access</h2>
          <p>
            It is the customer's responsibility to verify that doorways, hallways, and stairwells can accommodate the dimensions of ordered dining tables and display cabinets.
          </p>
          <h2 className="font-serif text-base font-semibold text-[#1C1B1F] pt-2">3. Pay on Delivery</h2>
          <p>
            When selecting "Pay on Delivery", the full balance becomes due immediately upon delivery of goods in undamaged condition.
          </p>
        </div>
      </div>
    </div>
  );
};
