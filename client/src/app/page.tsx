
import Timeline from "@/components/ui/timeline";
import Navbar from "@/components/main/navbar";
import Image from "next/image";

export default function Home() {
  return (
    
    <div>
      <Timeline/>
      <div className="bg-[#F4F4F4]">
        <Navbar/>
      </div>
      
    </div>
  );
}
