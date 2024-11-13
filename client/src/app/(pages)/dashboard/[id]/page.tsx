import Sidebar from "@/components/dashboard/sidebar";
import DashboardPage from "@/components/dashboard/dashboardpage";



export default function Dashboard() {
  // const { id } = params;
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar />
      <DashboardPage />
    </div>
  );
}
