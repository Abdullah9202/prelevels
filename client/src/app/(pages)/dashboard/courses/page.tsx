import Sidebar from "@/components/dashboard/sidebar"
import CoursePage from "@/components/dashboard/courses/coursespage"

export default function Page() {
    return(
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <Sidebar />
            <CoursePage/>
        </div>
    )
}

