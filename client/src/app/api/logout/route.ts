"use server"

import { deleteTokens } from "@/lib/auth";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const res = await fetch('http://127.0.0.1:8000/api/customuser/logout/', {
        method : 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include'
      });
    if(res.ok){
        console.log("User has Been logged out")
        await deleteTokens()
    }else{
        throw new Error("Error logging out the error")
    }
    return new NextResponse(JSON.stringify({message: "success", status: 200}))
}