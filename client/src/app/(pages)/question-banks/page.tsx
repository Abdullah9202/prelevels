"use client";
import Belowfooter from "@/components/main/belowfooter";
import Footer from "@/components/main/footer";
import Navbar from "@/components/main/navbar";
import Banner from "@/components/questionbank/banner";
import Sidebar from "@/components/ui/sidebar";
import BannerImage from "@/assets/Banner.png";
import { useEffect, useState } from "react";
import SeasonSale from "@/components/ui/timeline";
import domainUrl from "@/environment/dynamicEnvironment";

export default function QuestionBankPage() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${domainUrl}/questionbank/all/`, { // AZAK
          method: "GET",
        });
        const data = await res.json();
        if (res.ok) {
          setPosts(data);
          console.log("Posts fetched:", data);
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPost();
  }, []);

  return (
    <div>
      <SeasonSale />
      
      <div className="bg-[#F4F4F4] min-h-screen">
        <Navbar />
        <Banner src={BannerImage} alt="banner Image" text="Question bank" />
        <Sidebar data={posts} type="QuestionBank" />
        <div className="py-15 hidden sm:block">
          <Footer />
        </div>
        <div className="hidden sm:block">
          <Belowfooter />
        </div>
      </div>
    </div>
  );
}
