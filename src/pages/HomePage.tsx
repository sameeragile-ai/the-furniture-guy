import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStrip } from '../components/home/TrustStrip';
import { CollectionBentoGrid } from '../components/home/CollectionBentoGrid';
import { BestsellersSlider } from '../components/home/BestsellersSlider';
import { EditorialFeature } from '../components/home/EditorialFeature';
import { ClearanceSpotlight } from '../components/home/ClearanceSpotlight';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ShowroomCtaBand } from '../components/home/ShowroomCtaBand';
import { TestimonialsSlider } from '../components/home/TestimonialsSlider';
import { SocialProofGrid } from '../components/home/SocialProofGrid';
import { FaqAccordion } from '../components/home/FaqAccordion';

interface HomePageProps {
  onOpenCallback?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenCallback }) => {
  useDocumentTitle(
    'Luxury Mirrored & Crushed Diamond Furniture UK',
    'Discover British glam mirrored furniture, crushed diamond fireplaces, velvet seating, and crystal home décor. Free delivery over £499.'
  );

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TrustStrip />
      <CollectionBentoGrid />
      <BestsellersSlider />
      <EditorialFeature />
      <ClearanceSpotlight />
      <WhyChooseUs />
      <ShowroomCtaBand />
      <TestimonialsSlider />
      <SocialProofGrid />
      <FaqAccordion onOpenCallback={onOpenCallback} />
    </div>
  );
};
