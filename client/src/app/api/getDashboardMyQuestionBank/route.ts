import { getToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const accessToken = await getToken()
    try{
        const res = await fetch('http://localhost:8000/api/questionbank/my-questionbanks/', { // AZAk
            method: 'GET',
            headers: {'Content-Type': 'application/json', 
                Authorization: `Bearer ${accessToken}`
            }
        })
        const data = await res.json()
        if (res.ok){
            return new NextResponse(JSON.stringify({message:'success', user_data:data, status: 200}))
        }else{
            throw new Error("Error getting the code of the user dashbaord data in api")
        }

    }catch(error){
        return new NextResponse(JSON.stringify({message:'failed',status:401}))
    }
}