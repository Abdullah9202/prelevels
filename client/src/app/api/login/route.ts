"use server"

// import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { error } from "console";

export async function POST(req: NextRequest) {
    const authToken = (await cookies()).get("auth-token")
    console.log(authToken)

    const req_data = await req.json()
    const res = await fetch('http://127.0.0.1:8000/api/auth/token/pair', {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username: req_data.name , password: req_data.password })
    })
    const token_res = await res.json()
    if(res.ok) {
        ;(await cookies()).set({
            name : 'auth-token',
            value :  token_res.access,
            httpOnly: true,
            sameSite: 'strict',
            maxAge : 3600,
            secure : process.env.NODE_ENV !== 'development'
        })
    }else{
        console.error("user name is not define ")
    }
    

    return new NextResponse(JSON.stringify({message: "success", status: 200}))
}