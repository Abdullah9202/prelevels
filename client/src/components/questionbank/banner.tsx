import Image, { StaticImageData } from "next/image";

interface BannerProps {
  src: StaticImageData;
  alt: string;
}

const Banner = ({ src, alt }: BannerProps) => {
  return (
    <div className="flex justify-center items-center py-5 px-0 sm:px-6 md:px-0 lg:px-0 mx-auto w-full max-w-screen-lg lg:max-w-screen-2xl">
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        width={700} // The image's natural aspect ratio width
        height={400} // The image's natural aspect ratio height
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 700px" 
        // Adjust sizes for small, medium, and large screens for mouse devices
      />
    </div>
  );
};

export default Banner;
