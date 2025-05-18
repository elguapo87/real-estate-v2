import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middlewares/userAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const user = await userAuth();
    const userId = user.id;

    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "Missing chat ID" });

    const chatId = Number(id);
    if (isNaN(chatId)) return NextResponse.json({ success: false, message: "Invalid chat ID" });

    try {
        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
            include: {
                users: {
                    select: {
                        id: true,
                        userName: true,
                        avatar: true
                    }
                },
                messages: {
                    orderBy: { createdAt: "asc" }
                },
                seenBy: {
                    select: {
                        id: true,
                        userName: true,
                        avatar: true
                    }
                }
            }
        });

        if (!chat || !chat.users.some(user => user.id === userId)) {
            return NextResponse.json({ success: false, message: "Chat not found or unauthorized" });
        }

        await prisma.chat.update({
            where: { id: chatId },
            data: {
                seenBy: {
                    connect: { id: userId }
                }
            }
        });

        const receiver = chat.users.find(u => u.id !== userId);

        return NextResponse.json({
            success: true,
            chat: {
                ...chat, 
                receiver
            }
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to get chat!" });
    }
};