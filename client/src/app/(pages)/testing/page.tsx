"use client";
import React from "react";
import { json } from "stream/consumers";

export default function Testing() {
  // Define the user data
  const User = {
    clerk_id: "123",
    first_name: "Jack",
    last_name: "Harper",
    email: "jack123@gmail.com",
    username: "jack@9202",
    avatar_url:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybTZCbG5vSUxnVGVJaWpNM3BwRjExZGluSVYifQ",
    phone_number: "+923355566939",
    password: "jack@9202",
  };

  // Function to handle the button click and send the data
  const handleClick = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/student/register/", // AZAK
        {
          // Replace with your Python backend URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(User), // Send the user data
        }
      );

      console.log(JSON.stringify(User));

      if (!response.ok) {
        console.error("Failed to send data to Python backend");
      } else {
        console.log("Data sent successfully");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return <button onClick={handleClick}>Send User Data</button>;
}
