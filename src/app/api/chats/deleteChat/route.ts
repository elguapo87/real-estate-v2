import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middlewares/userAuth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const user = await userAuth();
    const userId = user.id;

    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "Missing chat ID" });
    
    const chatId = Number(id);
    if (isNaN(chatId)) return NextResponse.json({ success: false, message: "Chat ID required" });

    try {
        const chat = await prisma.chat.findFirst({
            where: {
                id: chatId,
                users: {
                    some: { id: userId }
                }
            }
        });

        if (!chat) return NextResponse.json({ success: false, message: "Chat not found" });

        await prisma.chat.delete({
            where: {id: chatId}
        });

        return NextResponse.json({ success: true, message: "Chat removed" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failded to delete chat" });
    }
};