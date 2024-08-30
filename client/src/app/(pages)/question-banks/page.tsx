import Navbar from "@/components/main/navbar";
import Banner from "@/components/questionbank/banner";

import SeasonSale from "@/components/ui/timeline";

export default function QuestionBankPage() {
    return (
        <div>
            <SeasonSale/>
            <div className="bg-[#F4F4F4] min-h-screen">
                <Navbar/>
                <Banner/>
              
            </div>
        </div>
    );
}