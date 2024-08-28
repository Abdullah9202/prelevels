
import Timeline from "@/components/ui/timeline";
import Navbar from "@/components/main/navbar";
import Image from "next/image";
import Hero from "@/components/main/hero";
import Service from "@/components/main/services";
import TestimonialsSection from "@/components/main/teatimonials";
import ServicesSection from "@/components/main/servicessection";
import PricingSection from "@/components/main/pricingsection";

export default function Home() {
  return (
    
    <div>
      <Timeline/>
      <div className="bg-[#F4F4F4] min-h-screen">
        <Navbar/>
        <Hero/>
        <Service/>
        <TestimonialsSection/>
        <ServicesSection/>
        <PricingSection/>
      </div>
      
    </div>
  );
}
