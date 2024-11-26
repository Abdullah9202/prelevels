import { getToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const accessToken = await getToken()
    try{
        const res = await fetch('http://127.0.0.1:8000/api/cart/', {
            method: "GET",
            headers: {'Content_Type': 'application/json', Authorization: `Bearer ${accessToken}`}
        })
    
        const data = await res.json()
        if(res.ok){
            return new NextResponse(JSON.stringify({message:'success',status:200,cart_data:data}))
        }else{
            throw new Error("Failed to get the cart data ")
        }

    }catch(error){
        return new NextResponse(JSON.stringify({message:"Failed to get the cart data", status:401}))
    }
    
}