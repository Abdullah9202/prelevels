'use client'
import Timeline from "@/components/ui/timeline";
import Navbar from "@/components/main/navbar";
import CartComponenet from "@/components/main/cart";
import Footer from "@/components/main/footer";
import Belowfooter from "@/components/main/belowfooter";

const Cart = () => {
    return (
        <>
        <Timeline />
        <div className="bg-[#F4F4F4] min-h-screen">
          <Navbar />
          <CartComponenet/>
          <Footer/>
          <Belowfooter/>
        </div>
      </>

    )
}

export default Cart