import React from 'react';

export default function Testing() {
  // Define the user data
  const User = {
    id: 1,
    clerkId: 123,
    firstName: "Abdullah",
    lastName: "Zulliqar",
    email: "abdullah@gmail.com",
    avatarUrl: "sdfgdggsgsdgsdgsdgsdg",
    phoneNumber: null, // Assuming phone number is not included in the payload
    password: null, // Assuming password is not included in the payload
    createdAt: new Date(),
    updatedAt: new Date()
};

  // Function to handle the button click and send the data
  const handleClick = async () => {
    try {
      const response = await fetch('https://your-python-backend-url/api/users', { // Replace with your Python backend URL
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
