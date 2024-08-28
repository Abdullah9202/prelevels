import Image from "next/image";
import testImage1 from "@/assets/Rectangle 17.png"; // Replace with actual image paths
import testImage2 from "@/assets/Rectangle 17.png";
import testImage3 from "@/assets/Rectangle 17.png";

export default function PricingSection() {
  return (
    <section className="bg-[#D9D9D9] py-12 lg:px-14 md:mr-20 md:ml-20 mt-9 rounded-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Fair & Simple Pricing for All
          </h2>
          <p className="text-gray-600 mt-2">
            We don’t like to brag, but we don’t mind letting our students do it for us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <Image
                src={testImage1}
                alt="Complete Physiology Test"
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-3 left-3 bg-yellow-500 text-white text-sm px-2 py-1 rounded">
                Best Value
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Complete Physiology Test
              </h3>
              <p className="text-gray-500">Prelevels</p>
              <p className="text-gray-500 mb-2">Valid Till 25/2024</p>
              <div className="text-red-500 text-3xl font-bold">Rs. 100</div>
              <div className="text-gray-500 line-through text-xl">Rs. 500</div>
              <button className="mt-4 w-full bg-neutral border-red-500 border text-red-500 py-2 rounded-3xl ">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <Image
                src={testImage2}
                alt="Complete Cardiology Test"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Complete Cardiology Test
              </h3>
              <p className="text-gray-500">Prelevels</p>
              <p className="text-gray-500 mb-2">Valid Till 25/2024</p>
              <div className="text-red-500 text-3xl font-bold">Rs. 250</div>
              <div className="text-gray-500 line-through text-xl">Rs. 700</div>
              <button className="mt-4 w-full bg-neutral border-red-500 border text-red-500 py-2 rounded-3xl">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <Image
                src={testImage3}
                alt="Complete Pathology Test"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Complete Pathology Test
              </h3>
              <p className="text-gray-500">Prelevels</p>
              <p className="text-gray-500 mb-2">Valid Till 25/2024</p>
              <div className="text-red-500 text-3xl font-bold">Rs. 300</div>
              <div className="text-gray-500 line-through text-xl">Rs. 500</div>
              <button className="mt-4 w-full bg-neutral border-red-500 border text-red-500 py-2 rounded-3xl">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="mt-8 flex justify-center">
          <button className="bg-red-500 text-white py-3 px-6 rounded-3xl hover:bg-red-600 ">
            View All Packages
          </button>
        </div>
      </div>
    </section>
  );
}
