import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/lib/auth";


export async function POST(req: NextRequest) {
    const req_data = await req.json()
    const accessToken = await getToken()
    console.log(req_data)
    try{
        const res = await fetch(`http://127.0.0.1:8000/api/cart/add/`, { // AZAK
            method: "POST",
            headers : {"Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
            body: JSON.stringify({ product_id: req_data?.product_id, product_model: req_data?.product_model, quantity:req_data?.quantity })
        })
        
        if (res.ok){
            return new NextResponse(JSON.stringify({message: "success", status: 200}))
            }else{
                throw new Error("Cart Response Is not correct")
            }
    }catch(error){
        console.error("Error fetching courses:", error);
        return new NextResponse(JSON.stringify({message:'failed', status: 401}))
    }

    }
    
