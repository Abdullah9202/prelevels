"use client";

import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";

const dummyCartData = [
  { id: 1, name: "Complete Physiology Test", price: "Rs. 100", quantity: 1, image: "/path/to/image1.jpg" },
  { id: 2, name: "Complete Cardiology Test", price: "Rs. 250", quantity: 2, image: "/path/to/image2.jpg" },
  { id: 3, name: "Complete Pathology Test", price: "Rs. 300", quantity: 1, image: "/path/to/image3.jpg" },
];

const Cart = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [cartData, setCartData] = useState(dummyCartData);

  const toggleCart = () => {
    setIsOpened(!isOpened);
  };

  const removeItem = (id: number) => {
    setCartData(cartData.filter((item) => item.id !== id));
  };

  return (
    <div className="relative">
      <button onClick={toggleCart} className="cursor-pointer">
        <FaShoppingCart />
      </button>

      {isOpened && (
        <div className="absolute right-7 mt-2 bg-white w-64 max-h-64 border border-gray-200 rounded-lg shadow-lg z-50 overflow-y-auto">
          <div className="p-2 border-b border-gray-300 text-sm font-semibold text-gray-700 flex justify-between">
            <span>Image</span>
            <span>Price</span>
            <span>Quantity</span>
          </div>
          <ul>
            {cartData.length > 0 ? (
              cartData.map((item) => (
                <li key={item.id} className="p-2 border-b border-gray-200 flex justify-between items-center">
                  <img src={item.image} alt={item.name} className="w-8 h-8 object-cover mr-2" />
                  <div className="flex-1">
                    <span className="font-semibold block">{item.name}</span>
                    <span className="text-gray-500 text-sm">Qty: {item.quantity}</span>
                  </div>
                  <span className="ml-2">{item.price}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <FaTrashAlt />
                  </button>
                </li>
              ))
            ) : (
              <li className="p-2 text-center">Cart is empty</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;
