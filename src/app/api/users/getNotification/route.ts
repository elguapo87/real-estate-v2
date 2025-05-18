import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middlewares/userAuth";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await userAuth();
    const userId = user.id;

    try {
        const number = await prisma.chat.count({
            where: {
                users: {
                    some: { id: userId }
                },
                NOT: {
                    seenBy: {
                        some: { id: userId }
                    }
                }
            }
        });

        return NextResponse.json({ success: true, number });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to get notification!" });
    }
};