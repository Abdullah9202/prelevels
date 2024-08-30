import Image from "next/image";
import BannerImage from "@/assets/Banner.png"

const Banner = () => {
    return (
      <div className="flex justify-center items-center py-5">
        <Image src={BannerImage} alt="map" />
      </div>
    );
  };
  
  export default Banner;