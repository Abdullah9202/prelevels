import Image from "next/image";
import { FaHeadphones, FaFlask } from "react-icons/fa";
import Ellipses from "@/assets/Ellipse 4.png";

export default function ServicesSection() {
  return (
    <section className="py-12 lg:px-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative">
          {/* Satisfaction Box */}
          <div className="flex flex-col items-center justify-center space-y-4 relative z-20 ">
            <div className="bg-[#D9D9D9] p-10 rounded-lg shadow-lg flex-col items-center justify-center text-center w-48 h-70 hidden lg:flex border-2 border-white">
              <div className="relative w-24 h-24 mb-4">
                <svg className="absolute inset-0 w-full h-full text-red-500" viewBox="0 0 36 36">
                  <path
                    className="text-gray-300 dark:text-slate-600"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                  />
                  <path
                    className="stroke-current"
                    strokeLinecap="round"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 1 0 0 31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center ">
                  <span className="text-lg font-bold text-gray-800">100%</span>
                </div>
              </div>
              <p className="text-lg font-semibold text-gray-800">Satisfaction</p>
            </div>

            {/* Test Box */}
            <div className="bg-[#D9D9D9] p-10 rounded-lg shadow-lg w-48 h-40 relative hidden lg:block ml-6 -mt-10 z-10 border-2 border-white">
              <div className="absolute top-5 left-5">
                <span className="text-lg font-bold text-gray-800">
                  <span className="font-bold text-2xl">1000+</span> <br /> Tests
                </span>
              </div>
              <div className="absolute bottom-4 right-10">
                <FaFlask size={50} className="text-red-500" />
              </div>
            </div>
          </div>

          {/* Support Box */}
          <div className="bg-[#D9D9D9] p-5 lg:w-64 w-full rounded-lg shadow-lg relative z-10 lg:-ml-20 lg:mr-5 mt-10 border-2 border-white">
            <h3 className="text-xl font-semibold text-red-500 mb-4">24/7 Support</h3>
            <ul className="space-y-4">
              {[
                { name: "Matt Haris", role: "Studio H" },
                { name: "Kaldin Schielder", role: "ML Fed" },
                { name: "Jackson Sphion", role: "IT & CS" },
                { name: "Tamer Lee", role: "Support" },
              ].map((person, index) => (
                <li key={index} className="flex items-center">
                  <Image
                    src={Ellipses}
                    alt={person.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{person.name}</p>
                    <p className="text-gray-500 text-sm">{person.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to Action Box */}
          <div className="  text-start lg:-ml-32 ">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Let us handle the best.
            </h3>
            <p className="text-gray-600  mb-6">
              We don’t like to brag, but we don’t mind letting our students do it for us. Here are a few nice things folks have said about our service over the years.
            </p>
            <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
              Explore More
            </button>
          </div>
        </div>

        {/* Headphone Icon for Support */}
        <div className="flex justify-center  lg:-mt-8">
          <FaHeadphones className="text-red-500 text-5xl p-2 bg-white dark:bg-slate-700 rounded-full shadow-lg" />
        </div>
      </div>
    </section>
  );
}
