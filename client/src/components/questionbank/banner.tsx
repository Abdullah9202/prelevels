import Image, { StaticImageData } from "next/image";

interface BannerProps {
  src: StaticImageData;
  alt: string;
}
const Banner = ({ src, alt }: BannerProps) => {
    return (
      <div className="flex justify-center items-center py-5">
        <Image src={src} alt={alt} />
      </div>
    );
  };
  
  export default Banner;