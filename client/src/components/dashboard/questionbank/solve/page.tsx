"use client"
import { useUser } from "@clerk/nextjs";
import MDCAT from '@/assets/MDCATBanner.png'
import Image from "next/image";


export default function SolveQuestion() {
    const {user} = useUser();
    return (
        <div className="flex-1 md:p-6 p-4 lg:py-7 py-4 bg-gray-100 md:mr-0 mx-auto">
            <h1 className="md:text-3xl text-xs w-full md:w-auto font-semibold mb-4 md:mb-0 md:pb-9">
            Welcome Back, {user?.firstName} 👋
            </h1>
            <div>
                <Image src={MDCAT} alt="MDCAT" className="w-full " />
                <div className=" flex justify-center items-center mt-3 space-x-6">
                    <button className="bg-red-500 rounded-3xl px-6 py-2"> Yearly</button>
                    <button className="bg-red-500 rounded-3xl px-6 py-2">Topical</button>
                </div>
            </div>
        </div>
    )
}