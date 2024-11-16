"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";



const Cart = () => {
  const router = useRouter()
  return (
    <div className="relative">
      <button onClick={()=> router.push('/cart')} className="cursor-pointer">
        <FaShoppingCart />
      </button>
    </div>
  );
};

export default Cart;
