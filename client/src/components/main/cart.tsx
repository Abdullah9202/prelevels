"use client";

import { useState } from "react";

const CartComponent = () => {
    // Dynamic data for the cart
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "MDCAT Question Bank",
            price: 2000,
            quantity: 1,
            validTill: "25 June 2025",
        },
        {
            id: 2,
            name: "ETEA Bundle",
            price: 2600,
            quantity: 1,
            validTill: "16 August 2026",
        },
    ]);

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <>
        <div className="flex flex-col items-center mt-8 mx-auto">
            <div className="bg-[#454A54] w-full h-[500px]  md:max-w-[1200px] rounded-lg shadow-md p-6 text-gray-200">
                <h1 className="text-2xl font-bold mb-4">Here’s what you have ordered:</h1>
                <div className="border-t border-gray-500 pt-4">
                    {/* Table header */}
                    <div className="flex justify-between font-bold text-sm mb-2">
                        <p className="w-2/5">Items</p>
                        <p className="w-1/5 text-center">Quantity</p>
                        <p className="w-1/5 text-center">Valid Till</p>
                        <p className="w-1/5 text-right">Cost</p>
                    </div>
                    <div className="border-b border-gray-500 mb-4"></div>
                    {/* Dynamic items */}
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm mb-3">
                            <p className="w-2/5">{item.name}</p>
                            <p className="w-1/5 text-center">{item.quantity}</p>
                            <p className="w-1/5 text-center">{item.validTill}</p>
                            <p className="w-1/5 text-right">Rs. {item.price * item.quantity}</p>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-500 pt-4">
                    {/* Total calculation */}
                    <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p className="font-bold">Rs. {calculateTotal()}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Tax</p>
                        <p className="font-bold">Rs. 0</p>
                    </div>
                    <div className="flex justify-between text-lg font-bold mt-2">
                        <p>Total</p>
                        <p>Rs. {calculateTotal()}</p>
                    </div>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white w-full py-2 mt-6 rounded-lg font-bold">
                    Place Order
                </button>
                <p className="text-sm text-center text-red-400 mt-2">
                    Read the instructions below before placing the order!
                </p>
            </div>
            
            
        </div>
        <div className="lg:px-40 mt-5">
            <h1 className="font-bold mb-5">Instructions:</h1>
            <div className="border-t border-gray-400 mb-3">
                <div className="grid grid-cols-3 lg:gap-80 text-gray-700 text-sm mt-2">
                    <p className="font-bold">Bank</p>
                    <p className="font-bold">Account Holder</p>
                    <p className="font-bold">Account Number</p>
                </div>
                <div className="grid grid-cols-3 bg-gray-300 p-3 lg:gap-80 text-gray-700 text-sm mt-2">
                    <p>EasyPaisa</p>
                    <p>XY Name</p>
                    <p>03199249384</p>
                </div>
                <div className="grid grid-cols-3 lg:gap-80 text-gray-700 text-sm mt-4">
                    <p>JazzCash</p>
                    <p>XY Name</p>
                    <p>03199249384</p>
                </div>
                <div className="grid grid-cols-3 bg-gray-300 p-3 lg:gap-80 text-gray-700 text-sm mt-4">
                    <p>Meezan Bank</p>
                    <p>XY Name</p>
                    <p>03199249384</p>
                </div>
            </div>
            <h1 className="mt-10 text-sm text-gray-700 leading-relaxed">After placing the order, transfer the mentioned amount to the any of the above account. Capture the clear screenshot of payment and send it to the 
                admins with the order ID. Customer support team will process and confirm your order within 24 to 48 hours. After that, you can view the items in your 
                dashboard. <br/>
                In case of any issue, contact our customer support through contact form.
            </h1>
        </div>
        </>
    );
};

export default CartComponent;
