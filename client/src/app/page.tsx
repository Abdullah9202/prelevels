"use client";
import Timeline from "@/components/ui/timeline";
import Navbar from "@/components/main/navbar";
import Hero from "@/components/main/hero";
import Service from "@/components/main/services";
import TestimonialsSection from "@/components/main/teatimonials";
import ServicesSection from "@/components/main/servicessection";
import PricingSection from "@/components/main/pricingsection";
import Footer from "@/components/main/footer";
import Belowfooter from "@/components/main/belowfooter";
import { useEffect, useState } from "react";

import React from "react";

export default function Home() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <>
      <Timeline />
      <div className="bg-[#F4F4F4] min-h-screen">
        <Navbar />
        <Hero />
        <Service />
        <TestimonialsSection />
        <ServicesSection />
        <PricingSection />
        <Footer />
        <Belowfooter />
      </div>
    </>
  );
}
