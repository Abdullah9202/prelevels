
import { FaAddressBook,FaPhone,FaEnvelope } from "react-icons/fa";

export default function Hero() {
  return (
    <div>
      <div className="container mx-auto p-4 md:px-14 py-14">
          <div className="flex flex-col md:flex-row gap-4">


            {/* Some Text */}
            <div className=" p-6  flex-1">
              <h2 className="text-2xl md:text-5xl font-bold mb-4">Get in touch</h2>
              <p className="text-gray-700 mb-4 max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              </p>
              <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                        <div className="bg-red-500 p-2 rounded-full">
                        <FaAddressBook size={20} className="text-white" />
                        </div>
                        <span className="text-sm ml-2 text-gray-500"> <span className="font-bold">Address</span> <br/> Karachi, Pakistan</span>
                    </div>
                    <div className="flex items-center">
                        <div className="bg-red-500 p-2 rounded-full ">
                        <FaPhone size={20} className="text-white" />
                        </div>
                        <span className="text-sm ml-2 text-gray-500"> <span className="font-bold">Phone Number</span> <br/> +123-456-789</span>
                    </div>
                    <div className="flex items-center">
                        <div className="bg-red-500 p-2 rounded-full">
                        <FaEnvelope size={20} className="text-white" />
                        </div>
                        <span className="text-sm ml-2 text-gray-500"> <span className="font-bold">Email</span> <br/> admin123@gmail.com</span>
                    </div>
                    </div>
              
            </div>

            {/* Contact Form */}
            <div className="bg-[#D9D9D9] p-6 rounded-lg shadow-lg max-w-md mx-auto border border-gray-300">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Send a message</h2>
                <form>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full py-2 px-3 border-b-2 border-gray-400 text-gray-700 leading-tight focus:outline-none focus:border-red-500 rounded-2xl"
                        id="name"
                        type="text"
                        placeholder="Your name"
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        className="w-full py-2 px-3 border-b-2 border-gray-400 text-gray-700 leading-tight focus:outline-none focus:border-red-500 rounded-2xl"
                        id="email"
                        type="email"
                        placeholder="Your email"
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        className="w-full py-2 px-3 border-b-2 border-gray-400 text-gray-700 leading-tight focus:outline-none focus:border-red-500 rounded-xl"
                        id="message"
                        placeholder="Your message"
                        rows="4"
                    ></textarea>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Null libero sed mi elementum mattis.
                    </p>
                    <div className="text-center">
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                    </div>
                </form>
                </div>

          </div>
        </div>
      
    </div>
  );
}