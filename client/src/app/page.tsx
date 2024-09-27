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
      if (isSignedIn && user) {
        const sessionInitialized = localStorage.getItem("sessionInitialized");

        if (!sessionInitialized) {
          try {
            const body = JSON.stringify({ user_id: user.id });

            const response = await fetch("http://127.0.0.1:8000/api/student/init-session/", {
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

            if (data.session_active) {
              // Updating the local storage to indicate that the session has been initialized
              localStorage.setItem("sessionInitialized", "true");
            } else {
              // If session is not active, remove the sessionInitialized flag
              localStorage.removeItem("sessionInitialized");
            }
          } catch (error) {
            console.error("Error sending user ID:", error);
          }
        }
      }
    };

    // Send the userId if signed in
    sendUserIdToBackend();

    // Cleanup function to remove session when user logs out
    return () => {
      if (!isSignedIn) {
        localStorage.removeItem("sessionInitialized");
      }
    };
  }, [isSignedIn, user]);

  return (
    <>
      <Navbar />
      <Hero />
      <Service />
      <TestimonialsSection />
      <ServicesSection />
      <PricingSection />
      <Timeline />
      <Footer />
      <Belowfooter />
    </>
  );
}