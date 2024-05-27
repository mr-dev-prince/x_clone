import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb"


export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
    try {

        const userId = params?.userId

        if (!userId || typeof userId !== "string") {
            return NextResponse.json({ success: false, status: 404, message: "UserId not found...", data: null })
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        })

        return NextResponse.json({ success: true, status: 200, message: "Account fetched...", ...existingUser, followersCount })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, status: 400, message: "Something went wrong", error })
    }
}