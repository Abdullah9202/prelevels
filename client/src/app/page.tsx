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

  const initializeSession = useCallback(async () => {
    try {
      // Checking if session has already been initialized
      const sessionInitialized = localStorage.getItem("sessionInitialized");
      if (sessionInitialized === "true") {
        console.log("Session already initialized, skipping backend request.")
        return;
      }

      // Get the Clerk session token
      const token = await getToken();
      if (!token) {
        console.log("No token found, user is not authenticated.");
        return;
      }

      if (!user) {
        console.log("No user found, user is not authenticated.");
        return;
      }

      // Proceed with session initialization if not already initialized
      const response = await fetch("http://127.0.0.1:8000/api/student/init-session/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
          body: JSON.stringify({ user_id: user.id }),
        });
        console.log("Request sent to backend");

        const data = await response.json();

        if (response.ok) {
          console.log("Django response:", data.message);

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
  }, [getToken, user]);

  useEffect(() => {
    initializeSession();

    // Cleanup when the user signs out
    return () => {
      if (!isSignedIn) {
        localStorage.removeItem("sessionInitialized");
      }
    };
  }, [initializeSession, isSignedIn]);

  return (
    <>
      <Timeline />
      <Navbar />
      <Hero />
      <Service />
      <TestimonialsSection />
      <ServicesSection />
      <PricingSection />
      <Footer />
      <Belowfooter />
    </>
  );
}