import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middlewares/userAuth";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await userAuth();
    if (!user) {
        return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    try {
        const userSavedPosts = await prisma.savedPost.findMany({
            where: { userId: user.id },
            include: {
                post: {
                    include: {
                        images: true,
                        postDetail: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                                userName: true,
                                avatar: true
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json({ success: true, userSavedPosts });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to get saved posts" });
    }
};