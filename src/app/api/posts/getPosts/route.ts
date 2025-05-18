import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                images: true,
                postDetail: true,
                user: {
                    select: {
                        avatar: true,
                        email: true,
                        id: true,
                        userName: true
                    }
                }
            }
        });

        return NextResponse.json({ success: true, posts });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occured";
        return NextResponse.json({ success: false, message: errMessage });
    }
};