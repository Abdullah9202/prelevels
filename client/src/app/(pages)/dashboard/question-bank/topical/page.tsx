import Sidebar from "@/components/dashboard/sidebar"

import TopicalPage from "@/components/dashboard/questionbank/topical/page"


export default function Solve() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <Sidebar />
            <TopicalPage  />
        </div>
    )

}