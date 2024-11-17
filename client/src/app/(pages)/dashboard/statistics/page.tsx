import Sidebar from "@/components/dashboard/sidebar";
import Statistics from "@/components/dashboard/statistics";

const StatisticPage = () => {
    return(
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <Sidebar/>
            <Statistics/>
        </div>
    )
}

export default StatisticPage