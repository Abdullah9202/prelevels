import Belowfooter from "@/components/main/belowfooter";
import Footer from "@/components/main/footer";
import Navbar from "@/components/main/navbar";
import Banner from "@/components/questionbank/banner";
import Sidebar from "@/components/ui/sidebar";
import bundle from "@/assets/bundles.png"
import SeasonSale from "@/components/ui/timeline";

export default function QuestionBankPage() {
    return (
        <div>
            <SeasonSale/>
            <div className="bg-[#F4F4F4] min-h-screen">
                <Navbar/>
                <Banner src={bundle} alt="Bundle Image"/>
                <Sidebar />
                <div className="py-48 hidden sm:block">
                    <Footer/>
                </div>
                <div className="hidden sm:block">
                    <Belowfooter/>
                </div>
                
            </div>
        </div>
    );
}