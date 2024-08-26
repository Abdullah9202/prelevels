import Image from "next/image";
import Ellipse3 from "@/assets/Ellipse 3.png"
import Ellipse4 from "@/assets/Ellipse 4.png"
import Ellipse5 from "@/assets/Ellipse 5.png"
import Ellipse6 from "@/assets/Ellipse 6.png"
import Ellipse7 from "@/assets/Ellipse 7.png"

export default function Avatar() {
    const avatars = [
        Ellipse3,
        Ellipse4,
        Ellipse5,
        Ellipse6,
        Ellipse7,
    ];

    return (
        <div className="flex items-center">
            {avatars.map((src, index) => (
                <div
                    className={`avatar ${index !== 0 ? '-ml-4' : ''}`} // Apply negative margin to overlap
                    key={index}
                >
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                            src={src}
                            alt={`Avatar ${index + 1}`}
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                    </div>
                </div>
            ))}
            <div className="-ml-4 avatar placeholder"> {/* Same overlap for the placeholder */}
                <div className="bg-red-500 text-neutral-content w-10 h-10 rounded-full flex items-center justify-center">
                    <span>+10</span>
                </div>
            </div>
            <p className="px-6 font-semibold">10+ creative team
                <span className="text-red-500 font-bold"> View prices</span>
            </p>
        </div>
    );
}
