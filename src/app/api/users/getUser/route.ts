import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }

        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret) as { id: number };

        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" });
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
                token
            }
        });

    } catch (error) {
        console.error("Error in getUser route:", error);
        return NextResponse.json({ success: false, message: "Invalid Token", error });
    }
};