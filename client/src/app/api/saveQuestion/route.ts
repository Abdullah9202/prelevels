import { getToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const accessToken = await getToken();
    const data = await req.json();
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/questionbank/${data?.question_bank_id}/question/${data?.question_id}/save/`, // AZAK
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ question_bank_id: data?.question_bank_id, question_id: data?.question_id })
            }
        );
        if (res.ok) {
            return new NextResponse(JSON.stringify({ message: 'success', status: 200 }), { status: 200 });
        } else {
            const errorData = await res.json();
            return new NextResponse(JSON.stringify({ message: 'error', error: errorData, status: res.status }), { status: res.status });
        }
    } catch (e) {
        return new NextResponse(JSON.stringify({ message: 'error', error: e, status: 500 }), { status: 500 });
    }
}