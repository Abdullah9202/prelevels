"use client";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import TestImage from "@/assets/Banner.png";
import Image from "next/image";
import { FaBook, FaInfoCircle } from "react-icons/fa";
import useHandleLogout from "@/lib/logout";


interface SidebarProps {
  data: any;
  type: string
}


export default function Sidebar({ data, type }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<string | "ETEA">("ETEA");
  const [currentPage, setCurrentPage] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<number>(0);
  const handlelogout = useHandleLogout()

  const pricingData = [
    {
      id: 1,
      title: "Complete Physiology Test",
      price: "Rs. 100",
      originalPrice: "Rs. 500",
      validTill: "Valid Till 02/2025",
      image: TestImage,
    },
    {
      id: 2,
      title: "Complete Cardiology Test",
      price: "Rs. 250",
      originalPrice: "Rs. 700",
      validTill: "Valid Till 02/2025",
      image: TestImage,
    },
    {
      id: 3,
      title: "Complete Pathology Test",
      price: "Rs. 300",
      originalPrice: "Rs. 500",
      validTill: "Valid Till 02/2025",
      image: TestImage,
    },
    {
      id: 4,
      title: "Complete Neurology Test",
      price: "Rs. 150",
      originalPrice: "Rs. 600",
      validTill: "Valid Till 02/2025",
      image: TestImage,
    },
    {
      id: 5,
      title: "Complete Immunology Test",
      price: "Rs. 350",
      originalPrice: "Rs. 800",
      validTill: "Valid Till 02/2025",
      image: TestImage,
    },
    {
      id: 6,
      title: "Complete Dermatology Test",
      price: "Rs. 200",
      originalPrice: "Rs. 450",
      validTill: "Valid Till 02/2025",
      image: TestImage,
    },
    // Add more items as needed
  ];

  console.log("this is the props data ", data);
  console.log(category);
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (status === 401) {
      handlelogout();
      
    }
  }, [status, handlelogout]);

  if (!hydrated) {
    return null;
  }

  const filterData = category
    ? data?.filter((item: any) => item.category.name === category)
    : pricingData;

  console.log("this is filter data", filterData);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filterData.length / itemsPerPage);


  const handleAddTOCart = async (product_id: string) => {
    const res = await fetch("/backend/api/addToCart", { // AZAK
      method: "POST",
      headers : {"Content-Type": "application/json"},
      body: JSON.stringify({ product_id:product_id, product_model:type, quantity:1 })
    })
    const data = await res.json();
    if (res.ok){
      setStatus(data.status)
      alert("Items has been added to cart")
    }else{
      throw new Error("Error Getting data")
    }
  }




  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = (filterData || []).slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );



  return (
    <div className="flex h-[925px]">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white text-gray-800 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-30 md:relative md:translate-x-0 shadow-lg`}
      >
        {/* Close Button for Mobile */}
        <div className="p-4 flex justify-between items-center md:hidden">
          <h1 className="text-lg font-semibold">Menu</h1>
          <button onClick={() => setIsOpen(!isOpen)} title="Toggle Menu">
            <FiX className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button
            onClick={() => setCategory("ETEA")}
            className="flex items-center p-2 rounded hover:bg-gray-200 active:bg-gray-300"
          >
            <FaBook className="w-5 h-5 text-black active:text-red-600 " />
            <span className="ml-2 text-balance active:text-red-600 font-semibold">
              ETA
            </span>
          </button>

          <button
            onClick={() => setCategory("NMDCAT")}
            className="flex items-center p-2 rounded hover:bg-gray-200 active:bg-gray-300"
          >
            <FaBook className="w-5 h-5 text-gray-800 active:text-red-500" />
            <span className="ml-2 text-gray-900 active:text-red-500">
              NMDCAT
            </span>
          </button>

          <button
            onClick={() => setCategory("GAT")}
            className="flex items-center p-2 rounded hover:bg-gray-200 active:bg-gray-300"
          >
            <FaBook className="w-5 h-5 text-gray-800" />
            <span className="ml-2">GAT</span>
          </button>

          <button
            onClick={() => setCategory("LUMS")}
            className="flex items-center p-2 rounded hover:bg-gray-200 active:bg-gray-300"
          >
            <FaBook className="w-5 h-5 text-gray-800" />
            <span className="ml-2">LUMS</span>
          </button>

          <button
            onClick={() => setCategory("NUST")}
            className="flex items-center p-2 rounded hover:bg-gray-200 active:bg-gray-300"
          >
            <FaBook className="w-5 h-5 text-gray-800" />
            <span className="ml-2">NUST</span>
          </button>
        </div>

        {/* Help Section */}
        <div className="p-4 mt-auto">
          <div className="flex items-center p-4 rounded bg-gray-100">
            <FaInfoCircle size={30} className="w-6 h-6 text-green-600" />
            <div className="ml-2">
              <h3 className="text-md font-semibold">Need help?</h3>
              <p className="text-sm">
                Dont know how to use?{" "}
                <a href="#" className="text-red-500 underline">
                  Click here
                </a>{" "}
                to see the guide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      {filterData.length > 0 ? (
        <div className="flex-1 flex flex-col">
          {/* Main content */}
          <header className="bg-gray-800 text-white p-4 md:hidden">
            <button title="Set Open button" onClick={() => setIsOpen(!isOpen)}>
              <FiMenu className="w-6 h-6" />
            </button>
          </header>
          <main className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(paginatedData || []).map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}` || TestImage} // AZAK
                      alt={item.title || "Image"}
                      className="w-full h-48 object-cover"
                      
                      width={400}
                      height={400}
                    />
                    <span className="absolute top-3 left-3 bg-yellow-500 text-white text-sm px-2 py-1 rounded">
                      Best Value
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-500">Prelevels</p>
                    {item.validity ? (
                      <p className="text-gray-500 mb-2">
                        Valid till {item.validity} days
                      </p>
                    ) : (
                      <div className="h-8"></div>
                    )}
                    <div className="text-red-500 text-3xl font-bold">
                      Rs. {item.price}
                    </div>
                    <div className="flex items-center mb-2">
                      {item.discount ? (
                        <>
                          <div className="text-gray-500 line-through text-xl">
                            {item.discount}
                          </div>
                          <span>% off</span>
                        </>
                      ) : (
                        <div className="h-7"></div>
                      )}
                    </div>
                    <button onClick={ ()=> handleAddTOCart(item.id )} className="mt-4 w-full bg-neutral border-red-500 border text-red-500 py-2 rounded-3xl">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`${
                  currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
                } bg-red-500 text-white px-4 py-2 rounded-full`}
              >
                &#60;&#60;Back
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className={`${
                  currentPage === totalPages - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } bg-red-500 text-white px-4 py-2 rounded-full`}
              >
                Next &gt;&gt;
              </button>
            </div>
          </main>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-1 text-gray-600 font-bold text-lg p-8">
          <span>This category does not contain any data</span>
        </div>
      )}
    </div>
  );
}
