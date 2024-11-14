import TopicView from "@/components/dashboard/questionbank/topical/topicView/page"
import Sidebar from "@/components/dashboard/sidebar"

const TopicViewPage = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <Sidebar />
            <TopicView/>
        </div>
    )
}


export default TopicViewPage