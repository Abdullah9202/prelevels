import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import testing from '@/assets/Ellipse 7.png'

export default function TestimonialsSection() {
    return (
        <section className=" py-12 lg:px-14">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Heading */}
                <h2 className="text-3xl font-semibold text-gray-800  text-start mb-5">
                   Our Students are our biggest fans
                </h2>
                <p className="text-sm text-gray-500">We don’t like to brag, but we don’t mind letting our students do it for us. Here are few nice <br/>
                things folks have said about our service over the years.</p>
                
                {/* Testimonial Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-5">
                    {/* Box 1 */}
                    <div className="bg-[#D9D9D9] p-6 rounded-lg shadow-lg border-2 border-white">
                        <FaQuoteLeft className="text-red-500 text-3xl mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800  mb-2">
                            Excellent Service
                        </h3>
                        <p className="text-gray-400  mb-4">
                            The team provided outstanding service, exceeding all expectations.
                        </p>
                        <hr className="border-gray-300 dark:border-slate-600 mb-4" />
                        <div className="flex items-center">
                            <Image 
                                src={testing}
                                alt="Profile" 
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                                <p className="text-gray-800  font-medium">John Doe</p>
                                <p className="text-gray-500 text-sm">CEO, Company X</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Box 2 */}
                    <div className="bg-[#D9D9D9] p-6 rounded-lg shadow-lg border-2 border-white">
                        <FaQuoteLeft className="text-red-500 text-3xl mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800  mb-2">
                            Amazing Experience
                        </h3>
                        <p className="text-gray-400  mb-4">
                            The collaboration was seamless, and the results were phenomenal.
                        </p>
                        <hr className="border-gray-300 dark:border-slate-600 mb-4" />
                        <div className="flex items-center">
                            <Image 
                                src={testing}
                                alt="Profile" 
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                                <p className="text-gray-800  font-medium">Jane Smith</p>
                                <p className="text-gray-500  text-sm">CTO, Company Y</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
