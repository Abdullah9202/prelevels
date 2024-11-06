import Maps from "@/assets/Maps.png";
import Image from "next/image";

const Map = () => {
  return (
    <div className="flex justify-center items-center lg:px-14">
      <Image src={Maps} alt="map" />
    </div>
  );
};

export default Map;
