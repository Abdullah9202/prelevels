import Belowfooter from "@/components/main/belowfooter";
import Footer from "@/components/main/footer";
import Navbar from "@/components/main/navbar";
import Banner from "@/components/questionbank/banner";
import Sidebar from "@/components/ui/sidebar";

import SeasonSale from "@/components/ui/timeline";

export default function QuestionBankPage() {
    return (
        <div>
            <SeasonSale/>
            <div className="bg-[#F4F4F4] min-h-screen">
                <Navbar/>
                <Banner/>
                <Sidebar/>
                <Footer/>
                <Belowfooter/>
            </div>
        </div>
    );
}