import FAQ from "@/components/contactpage/FAQ"
import Hero from "@/components/contactpage/herosection"
import Belowfooter from "@/components/main/belowfooter"
import Footer from "@/components/main/footer"
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
            <FAQ/>
            <Footer/>
            <Belowfooter/>
        </div>
        
        
    </div>
    )
}
    
