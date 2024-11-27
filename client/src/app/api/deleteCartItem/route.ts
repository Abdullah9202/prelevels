import { getToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const data = await req.json()
    const accessToken = await getToken()
    try{

        const res = await fetch(`http://localhost:8000/api/cart/${data?.id}/delete/`, {
            method: 'DELETE',
            headers: {'Content-Type' : 'Application/json',
                Authorization : `Bearer ${accessToken}`
            },
            body : JSON.stringify({cart_item_id: data?.id})
        })
        
        if(res.ok){
            return new NextResponse(JSON.stringify({message:'success', status:200}))
        }else{
            throw new Error("Failed to delete cart")
        }

    }catch(error){
        return new NextResponse(JSON.stringify({message:'Failed to delete data ', status: 401}))
    }

}