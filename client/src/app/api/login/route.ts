"use server";

import { NextRequest, NextResponse } from "next/server";
import {
  getRefreshToken,
  getToken,
  setReFreshToken,
  setToken,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  const authToken = await getToken();
  const refreshToken = await getRefreshToken();
  console.log("=================");
  console.log(authToken, refreshToken);

  const req_data = await req.json();
  const res = await fetch("http://127.0.0.1:8000/api/auth/my-token/pair", { // AZAK
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone_number: req_data.phone_number,
      password: req_data.password,
    }),
  });
  const token_res = await res.json();
  const { access, refresh } = token_res;
  if (res.ok) {
    await setToken(access);
    await setReFreshToken(refresh);
  } else {
    console.error("Failed to fetch tokens");
  }

  // Fetch user data from the backend
  const resUserData = await fetch(
    "http://127.0.0.1:8000/api/customuser/login/", // AZAK
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_number: req_data.phone_number,
        password: req_data.password,
      }),
    }
  );

  let user_data;
  try {
    user_data = await resUserData.json();
  } catch (error) {
    console.error("Failed to parse user data response:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Failed to parse user data response",
        status: 500,
      }),
      { status: 500 }
    );
  }

  if (resUserData.ok) {
    console.log(user_data);
    return new NextResponse(
      JSON.stringify({ message: "success", status: 200, user_data }),
      { status: 200 }
    );
  } else {
    console.error("Failed to fetch user data");
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch user data", status: 500 }),
      { status: 500 }
    );
  }
}
