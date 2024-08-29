import Hero from "@/components/contactpage/herosection"
import Navbar from "@/components/main/navbar"
import SeasonSale from "@/components/ui/timeline"


export default function Contact(){
    return(
    <div>
        <div>
            <SeasonSale/>
        </div>
        <div className="bg-[#F4F4F4] min-h-screen">
            <Navbar/>
            <Hero/>
        </div>
        
        
    </div>
    )
}
    
