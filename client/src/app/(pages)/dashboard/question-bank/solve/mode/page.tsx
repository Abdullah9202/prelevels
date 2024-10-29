import Sidebar from "@/components/dashboard/sidebar"
import ModeComponent from "@/components/dashboard/questionbank/solve/mode/modecomponent";

export default function Mode() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <Sidebar />
            <ModeComponent />
        </div>
    );
}