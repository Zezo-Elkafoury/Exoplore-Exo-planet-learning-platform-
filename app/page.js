'use client'
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import FeaturesSection from "@/components/features";
import IntroVideo from '@/components/intro';
import QuoteSection from "@/components/qoute";
import InteractiveBackground from "@/components/fullbg";


export default function Home() {
  return (
    <>
          <Header />
          <InteractiveBackground />
          <HeroSection videoSrc="/vid1.mp4" />
          <IntroVideo />
          <FeaturesSection />
          <QuoteSection />
    </>
  );
}