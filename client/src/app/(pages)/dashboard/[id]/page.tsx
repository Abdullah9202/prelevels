import Sidebar from "@/components/dashboard/sidebar";
import DashboardPage from "@/components/dashboard/dashboardpage";

export default function Dashboard({ params }: { params: { id: string } }) {
    const { id } = params;

    return(
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar />
            <DashboardPage />
        </div>
    )
}