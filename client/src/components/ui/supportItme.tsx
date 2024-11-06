import React from "react";
import Image from "next/image";

interface SupportItemProps {
  imageSrc: string;
  text: string;
}

const SupportItem: React.FC<SupportItemProps> = ({ imageSrc, text }) => {
  return (
    <div className="flex gap-2.5 self-stretch my-auto">
      <Image
        loading="lazy"
        src={imageSrc}
        alt=""
        className="object-contain shrink-0 w-6 aspect-[1.26]"
        height={20}
        width={20}
      />
      <span className="basis-auto">{text}</span>
    </div>
  );
};

export default SupportItem;
