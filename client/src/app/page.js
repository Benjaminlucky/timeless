import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import DestinationsSection from "./components/DestinationSection";
import ServicesSection from "./components/ServicesSection";
import PricingSection from "./components/PricingSection";
import ReviewsSection from "./components/ReviewSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <AboutSection />
      <DestinationsSection />
      <ServicesSection />
      <PricingSection />
      <ReviewsSection />
      <ContactSection />
    </main>
  );
}
