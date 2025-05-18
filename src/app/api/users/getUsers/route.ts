import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                userName: true,
                email: true,
                avatar: true,
                createdAt: true,
                posts: true
            },
        });
        return NextResponse.json({ success: true, users });

    } catch (error) {
        console.error(error);
        return NextResponse.json({success: false, message: "Internal Server Error"});
    }
};