import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb"


export const GET = async (req:NextRequest)=>{


    try {

        const users = await prisma.user.findMany({
            orderBy:{
                createdAt:"desc"
            }
        })

        return NextResponse.json({success:true, status:200, message:"All users fetched...", users})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false, status:400, message:"Error while getting all users", error})
    }
}