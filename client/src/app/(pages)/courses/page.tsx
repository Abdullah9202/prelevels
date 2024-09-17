"use client";
import SeasonSale from "@/components/ui/timeline";
import Navbar from "@/components/main/navbar";
import Banner from "@/components/questionbank/banner";
import Sidebar from "@/components/ui/sidebar";
import Footer from "@/components/main/footer";
import Belowfooter from "@/components/main/belowfooter";
import Courses from "@/assets/Courses.png"
import { useEffect, useState } from "react";

export default function CoursesPage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPost = async () => {
            try{
                const res = await fetch("http://127.0.0.1:8000/api/course/",{ method: 'GET' });
                const data = await res.json();
                if(res.ok) {
                    setPosts(data);
                    console.log('Posts fetched:', data);
                } else{
                    console.log('No data found');
                }
            }catch(error){
                console.error('Error fetching posts:', error);
            }
        }
        fetchPost();
    }
    , []);

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