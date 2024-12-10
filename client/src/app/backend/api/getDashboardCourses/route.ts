import { getToken } from "@/lib/auth";
import { error } from "console";
import {  NextResponse } from "next/server";


export async function GET() {
  const accessToken = await getToken();
  console.log(accessToken);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course/my-courses/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = res.json();
    if (res.ok) {
      return new NextResponse(
        JSON.stringify({ message: "success", course_data: data, status: 200 })
      );
    } else {
      throw new Error("Failed to fetch courses");
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed", error: error, status: 401 })
    );
  }
}
