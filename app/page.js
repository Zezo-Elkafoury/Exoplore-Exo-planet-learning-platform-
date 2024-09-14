import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import NotReadySection from "@/components/NRY";
export default function Home() {
  return (
    <>
    <Header />
    <HeroSection videoSrc="/vid.mp4" />
    <NotReadySection />
    </>
  );
}
