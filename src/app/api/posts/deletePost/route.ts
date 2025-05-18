import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middlewares/userAuth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const user = await userAuth();
    const userId = user.id
    if (!user) {
        return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const formData = await req.formData();
    const postId = formData.get("postId") as string;
    if (!postId) {
        return NextResponse.json({ success: false, message: "Post ID is required" });
    }

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: Number(postId),
                userId
            }
        });

        if (!post) return NextResponse.json({ success: false, message: "Post not found" });

        await prisma.post.delete({
            where: {
                id: Number(postId),
                userId
            }
        });

        return NextResponse.json({ success: true, message: "Post removed" });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occured";
        return NextResponse.json({ success: false, message: errMessage });
    }
};