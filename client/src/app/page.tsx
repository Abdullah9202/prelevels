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
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect, useCallback } from "react";
import React from "react";


export default function Home() {
  const { getToken } = useAuth();
  const { isSignedIn, user } = useUser();  // Destructure to get both isSignedIn and user
  
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const token = await getToken();
        const sessionInitialized = localStorage.getItem("sessionInitialized");
  
        if (!token) {
          console.log("No token found, user is not authenticated."); // AZAK
          return;
        }
  
        if (!user) {
          console.log("No user found, user is not authenticated."); // AZAK
          return;
        }
  
        // Check if session is already initialized
        if (sessionInitialized === "true") {
          console.log("Session already initialized.");
          return;
        }
  
        // Proceed with session initialization if not already initialized
        console.log("Token retrieved:", token);
        const response = await fetch("http://127.0.0.1:8000/api/student/init-session/", { // AZAK
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user.id }),
        });
        console.log("Request sent to backend"); // AZAK
  
        const data = await response.json();
  
        if (response.ok) {
          console.log("Django response:", data.message); // AZAK
  
          // Set session initialization status in local storage
          if (data.session_active === true) {
            localStorage.setItem("sessionInitialized", "true");
          } else {
            localStorage.removeItem("sessionInitialized");
          }
        } else {
          console.log("Error initializing session:", data.error);
        }
      } catch (error) {
        console.error("Error initializing session:", error);
      }
    };
  
    const timeoutId = setTimeout(() => { // Intentional time delay to allow clerk to register user and then initialize session
      initializeSession();
    }, 5000);
  
    // Cleanup when the user signs out
    return () => {
      clearTimeout(timeoutId);
      if (!isSignedIn) {
        localStorage.removeItem("sessionInitialized");
      }
    };
  }, [getToken, user, isSignedIn]);

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