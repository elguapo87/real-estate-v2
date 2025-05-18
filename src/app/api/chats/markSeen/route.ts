import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middlewares/userAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await userAuth();
    const userId = user.id;

    const id = req.nextUrl.searchParams.get("id");
    const chatId = Number(id);

    if (!chatId) return NextResponse.json({ success: false, message: "Chat ID required" });

    try {
        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
            include: {
                messages: {
                    orderBy: { createdAt: "desc" },
                    take: 1
                },
                users: true
            }
        });

        const lastMessage = chat?.messages[0];

        const receiver = chat?.users.find((user) => user.id !== userId);

        if (lastMessage && lastMessage.userId !== userId) {
            await prisma.chat.update({
                where: { id: chatId },
                data: {
                    seenBy: {
                        disconnect: { id: receiver?.id }
                    }
                }
            });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to mark chat as seen" });
    }
};