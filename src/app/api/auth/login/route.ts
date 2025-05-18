import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import generateToken from "@/utils/generateToken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" });
        }

        // Check for matching passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user.id);

        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60,
            path: "/"
        });

        return NextResponse.json({
            success: true,
            message: "You are logged in",
            user: {
                id: user.id,
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
                token
            }
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal Server Error" });
    }
};