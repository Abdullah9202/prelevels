import { getToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(req:NextRequest) {
    const accessToken = await getToken()
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questionbank/my-questionbanks/`,{
            method:"GET",
            headers: {'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        })
        const data = await res.json()
        if(res.ok){
            return new NextResponse(JSON.stringify({message:'success', data: data, status:200}))
        }
    }catch(e){
        return new NextResponse(JSON.stringify({message:'failed',error:e, status:200}))
    }
}