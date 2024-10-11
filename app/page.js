'use client'
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import FeaturesSection from "@/components/features";
import IntroVideo from '@/components/intro';
import QuoteSection from "@/components/qoute";
import InteractiveBackground from "@/components/fullbg";
import CreditsSection from "@/components/Credits"

export default function Home() {
  return (
    <>
          <InteractiveBackground />
          <HeroSection />
          <IntroVideo />
          <FeaturesSection />
          <QuoteSection />
          <CreditsSection />
    </>
  );
}