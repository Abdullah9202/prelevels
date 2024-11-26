'use client'
import useHandleLogout from "@/lib/logout";
import React, { useEffect, useState } from "react";

const CartComponent = () => {
  const [data, setData] = useState<any[]>([]); // Ensure data is initialized as an array
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handlelogout = useHandleLogout()

  useEffect(() => {
    const getCartData = async () => {
      try {
        const res = await fetch("/api/getCartData", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (res.ok) {
          setData(data.cart_data);
          setStatus(data.status);
        }
      } catch (error) {
        setError(String(error));
      }
    };

    getCartData();
  }, []); // Ensure the dependency array is always provided

  useEffect(() => {
    if (status === 401) {
      // Handle logout or redirect to login page
      console.log("Unauthorized access, redirecting to login...");
      handlelogout()
    
    }
  }, [status, handlelogout]); // Add status as a dependency

  const calculateTotal = () => {
    return Array.isArray(data)? data.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
  };

  const roundOff = (value: number) => {
    return Math.round(value * 100) / 100; // Round to 2 decimal places
  };

  if (error) {
    return <div className="mt-8 bg-red-100 border-2 border-red-500 p-6 shadow-md rounded-lg mx-auto">{error}</div>;
  }
  console.log('this is the data',data)
  return (
    <>
      <div className="flex flex-col items-center mt-8 mx-auto">
        <div className="bg-[#454A54] w-full h-[500px]  md:max-w-[1200px] rounded-lg shadow-md p-6 text-gray-200">
          <h1 className="text-2xl font-bold mb-4">
            Here’s what you have ordered:
          </h1>
          <div className="border-t border-gray-500 pt-4">
            {/* Table header */}
            <div className="flex justify-between font-bold text-sm mb-2">
              <p className="w-2/5">Items</p>
              <p className="w-1/5 text-center">Quantity</p>
              <p className="w-1/5 text-center">Category</p>
              <p className="w-1/5 text-right">Cost</p>
            </div>
            <div className="border-b border-gray-500 mb-4"></div>
            {/* Dynamic items */}
            {Array.isArray(data) && data.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-3">
                <p className="w-2/5">{item.product_name}</p>
                <p className="w-1/5 text-center">{item.quantity}</p>
                <p className="w-1/5 text-center">{item.category}</p>
                <p className="w-1/5 text-right">
                  Rs. {item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-500 pt-4">
            {/* Total calculation */}
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="font-bold">Rs. {roundOff(calculateTotal())}</p>
            </div>
            <div className="flex justify-between">
              <p>Tax</p>
              <p className="font-bold">Rs. {roundOff(calculateTotal() * 0.1)}</p>
            </div>
            <div className="flex justify-between">
              <p>Total</p>
              <p className="font-bold">Rs. {roundOff(calculateTotal() * 1.1)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartComponent;