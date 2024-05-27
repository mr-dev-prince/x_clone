import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import prisma from "@/libs/prismadb"


export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();

        const { email, username, name, password } = reqBody


        if (!email || !username || !name || !password) {
            return NextResponse.json({ success: false, status: 405, message: "All fields necessary...", data: null })
        }

        const isExistingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (isExistingUser) {
            return NextResponse.json({ success: false, status: 405, message: "User already exists...", data: null })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                password: hashedPassword
            }
        })

        return NextResponse.json({ success: true, status: 200, message: "User Created Successfully...", data: user })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, status: 400, message: "Error while registering user...", data: error })
    }
}