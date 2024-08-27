
import Timeline from "@/components/ui/timeline";
import Navbar from "@/components/main/navbar";
import Image from "next/image";
import Hero from "@/components/main/hero";
import Service from "@/components/main/services";
import TestimonialsSection from "@/components/main/teatimonials";

export default function Home() {
  return (
    
    <div>
      <Timeline/>
      <div className="bg-[#F4F4F4] min-h-screen">
        <Navbar/>
        <Hero/>
        <Service/>
        <TestimonialsSection/>
      </div>
      
    </div>
  );
}
