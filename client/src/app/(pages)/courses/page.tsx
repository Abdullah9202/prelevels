import SeasonSale from "@/components/ui/timeline";
import Navbar from "@/components/main/navbar";
import Banner from "@/components/questionbank/banner";
import Sidebar from "@/components/ui/sidebar";
import Footer from "@/components/main/footer";
import Belowfooter from "@/components/main/belowfooter";
import Courses from "@/assets/Courses.png"

export default function CoursesPage() {
    return(
        <div>
        <SeasonSale />
        <div className="bg-[#F4F4F4] min-h-screen">
          <Navbar />
          <Banner src={Courses} alt="Bundle Image" />
          <Sidebar />
          <div className="py-48 hidden sm:block">
            <Footer />
          </div>
          <div className="hidden sm:block">
            <Belowfooter />
          </div>
        </div>
      </div>
    )
}