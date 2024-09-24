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
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, user } = useUser();  // Destructure to get both isSignedIn and user
  
  useEffect(() => {
    const sendUserIdToBackend = async () => {
      if (isSignedIn && user) {  // Check if user is signed in
        try {
          // Send the userId to your Python backend using fetch
          const response = await fetch("http://your-python-backend.com/api/send-user-id", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user.id }),  // Send user.id
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("User ID sent successfully:", data);
        } catch (error) {
          console.error("Error sending user ID:", error);
        }
      }
    };

    sendUserIdToBackend();  // Call the function if user is signed in
  }, [isSignedIn, user]);  // Effect runs when isSignedIn or user changes
  
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
        <Footer/>
        <Belowfooter/>
      </div>
    </div>
  );
}