"use server"

// import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

import { getRefreshToken, getToken, setReFreshToken, setToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const authToken = await getToken()
    const refreshToken = await getRefreshToken() 
    
    console.log(authToken, refreshToken)

    const req_data = await req.json()
    const res = await fetch('http://127.0.0.1:8000/api/auth/my-token/pair', {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ phone_number: req_data.phone_number , password: req_data.password })
    })
    const token_res = await res.json()
    const {access, refresh} = token_res
    if(res.ok) {
        setToken(access)
        setReFreshToken(refresh)
    }else{
        console.error("user name is not define ")
    }
    

    return new NextResponse(JSON.stringify({message: "success", status: 200}))
}