import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import NotReadySection from "@/components/NRY";
import FeaturesSection from "@/components/features";
export default function Home() {
  return (
    <>
    <Header />
    <HeroSection videoSrc="/vid.mp4" />
    <FeaturesSection />
    </>
  );
}
