'use client'
import Belowfooter from "@/components/main/belowfooter";
import Footer from "@/components/main/footer";
import Navbar from "@/components/main/navbar";
import Banner from "@/components/questionbank/banner";
import Sidebar from "@/components/ui/sidebar";
import bundle from "@/assets/Banner.png";
import SeasonSale from "@/components/ui/timeline";
import { useEffect, useState } from "react";

export default function QuestionBankPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bundle/all/`, { // Use environment variable for the backend URL
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
      <Navbar />
      <Banner src={bundle} alt="Bundle Image" text="Bundle" />
      <Sidebar data={posts} type="Bundle"/>
      <SeasonSale />
      <Footer />
      <Belowfooter />
    </div>
  );
}