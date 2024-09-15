"use client";
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Testing() {
  // Define the user data
  const User = {
    id: uuidv4(),
    clerkId: "123",
    firstName: "Abdullah",
    lastName: "Zulliqar",
    email: "abdullah341@gmail.com",
    username: "abdullahZ",
    avatarUrl: "sdfgdggsgsdgsdgsdgsdg",
    phoneNumber: "+923196576632",
    password: "daad3dafd443r",
    createdAt: new Date(),
    updatedAt: new Date()
};

  // Function to handle the button click and send the data
  const handleClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/student/register/', { // Replace with your Python backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(User), // Send the user data
      });
      
      if (!response.ok) {
        console.error('Failed to send data to Python backend');
      } else {
        console.log('Data sent successfully');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <button onClick={handleClick}>
      Send User Data
    </button>
  );
}
