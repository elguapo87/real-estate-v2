import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const postId = parseInt(searchParams.get("postId") || "", 10);

        if (isNaN(postId)) {
            return NextResponse.json({ success: false, message: "Invalid post ID" });
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                images: true,
                postDetail: true,
                user: {
                    select: { id: true, email: true, userName: true, avatar: true }
                }
            }
        });

        if (!post) {
            return NextResponse.json({ success: false, message: "Post not found" });
        }

        return NextResponse.json({ success: true, post });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occured";
        return NextResponse.json({ success: false, message: errMessage });
    }
}





