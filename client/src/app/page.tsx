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
import { useEffect,useState } from "react";

export default function Home() {
  const { isSignedIn, user } = useUser();  // Destructure to get both isSignedIn and user
  
   // Destructure to get both isSignedIn and user
  const [requestSent, setRequestSent] = useState(false);  // Track if the request has been sent

  useEffect(() => {
    const sendUserIdToBackend = async () => {
      if (isSignedIn && user && !requestSent) {
        try {
          const body = JSON.stringify({ user_id: user.id });

          const response = await fetch("http://127.0.0.1:8000/api/student/login/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: body,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("User ID sent successfully:", data);

          // Set the state to true to prevent duplicate requests
          setRequestSent(true);
        } catch (error) {
          console.error("Error sending user ID:", error);
        }
      }
    };

    // Send the userId if signed in
    sendUserIdToBackend();

    // Reset requestSent to false when the user logs out
    if (!isSignedIn) {
      setRequestSent(false);
    }
  }, [isSignedIn, user, requestSent]);    // Effect runs when isSignedIn or user changes
  
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