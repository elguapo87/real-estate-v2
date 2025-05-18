import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middlewares/userAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await userAuth();
    const userId = user.id;

    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "Missing chat ID" });

    const chatId = Number(id);
    if (isNaN(chatId)) return NextResponse.json({ success: false, message: "Invalid chat ID" });

    const formData = await req.formData();
    const text = formData.get("text") as string;

    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
                users: {
                    some: {id: user.id}
                }
            }
        });

        if (!chat) return NextResponse.json({ success: false, message: "Chat not found" });

        const message = await prisma.message.create({
            data: {
                text,
                chatId,
                userId
            }
        });

        await prisma.chat.update({
            where: {
                id: chatId
            },
            data: {
                seenBy: {
                    connect: { id: user.id }
                },
                lastMessage: text
            }
        });

        return NextResponse.json({ success: true, message });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to add message!" });
    }
};