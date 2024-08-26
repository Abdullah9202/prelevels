import Image from "next/image";
import HeroImage from "@/assets/heroImage.png";
import SearchBar from "../ui/searchbar";
import Avatar from "../ui/avatar";

export default function Hero() {
    return (
        <div className="flex relative z-20 items-center overflow-hidden">
            <div className="container mx-auto px-14 flex flex-col sm:flex-row items-center justify-between py-10">
                <div className="sm:w-2/3 lg:w-3/5 flex flex-col relative z-20 sm:px-6">
                <h1 className="font-bebas-neue font-semibold uppercase text-2xl sm:text-4xl text-[#454A52] leading-tight">
                    Welcome to <br />
                    Prelevels. Prepare <br />
                    with confidence.
                </h1>
                    <p className="text-sm sm:text-base text-[#B4B4B4] py-3">
                        Dimension of reality that makes change possible and <br/> understandable. An indefinite and homogeneous environment <br/> in which natural events and human existence take place.
                    </p>
                    <div className="flex mt-6 font-bold">
                        <p>Excel every exam with our high yield
                            <span className="text-red-500 font-bold"> MCQ&apos;s</span>
                        </p>
                    </div>
                    <div className="flex ">
                        <SearchBar/>
                        
                    </div>
                    <div className="flex mt-6">
                        <Avatar/>
                    </div>
                </div>
                <div className=" hidden sm:block sm:w-1/2 lg:w-3/5  relative">
                    <Image
                        src={HeroImage}
                        alt="Hero image"
                        className="w-full h-auto"
                        height={500}
                        width={500}
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
