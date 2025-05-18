import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middlewares/userAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const postId = formData.get("postId") as string;
        if (!postId) {
            return NextResponse.json({ success: false, message: "Post ID is required" });
        }

        const user = await userAuth();
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }

        const savedPost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId: user.id,
                    postId: parseInt(postId)
                }
            }
        });

        if (savedPost) {
            await prisma.savedPost.delete({
                where: { id: savedPost.id }
            });

            return NextResponse.json({ success: true, message: "Post Removed" });

        } else {
            await prisma.savedPost.create({
                data: {
                    userId: user.id,
                    postId: parseInt(postId)
                }
            });

            return NextResponse.json({ success: true, message: "Post Saved" });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to save post" });
    }
}
