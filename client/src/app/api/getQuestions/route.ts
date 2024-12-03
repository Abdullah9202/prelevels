import { getToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const data = await req.json();
  const accessToken = await getToken();
  try {
    const res = await fetch(
      `http://localhost:8000/api/questionbank/${data?.question_id}/all-questions/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const res_data = await res.json();

    if (res.ok) {
      return new NextResponse(
        JSON.stringify({
          message: "Success",
          questions_data: res_data,
          status: 200,
        })
      );
    } else {
      throw new Error("Error geting the QuestionsBank Question");
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Failed", error: error, status: 401 })
    );
  }
}
