import Sidebar from "@/components/dashboard/sidebar"

import SolveQuestion from "@/components/dashboard/questionbank/solve/page"


export default function Solve() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <Sidebar />
            <SolveQuestion  />
        </div>
    )

}