import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middlewares/userAuth";
import { NextResponse } from "next/server";
import { Chat, User, Message } from "@prisma/client";

type FullChat = Chat & {
    users: Pick<User, "id" | "userName" | "avatar">[];
    messages: Message[];
    seenBy: Pick<User, "id" | "userName" | "avatar">[];
};

export async function GET() {
    const user = await userAuth();
    const userId = user.id;

    try {
        const chats = await prisma.chat.findMany({
            where: {
                users: {
                    some: {
                        id: userId
                    }
                }
            },
            include: {
                users: {
                    select: {
                        id: true,
                        userName: true,
                        avatar: true
                    }
                },
                messages: {
                    orderBy: { createdAt: "desc" },
                    take: 1
                },
                seenBy: {
                    select: {
                        id: true,
                        userName: true,
                        avatar: true
                    }
                },

            }
        });

        const hasReceiverSeenLastMessage = (chat: FullChat, userId: number): boolean => {
            const lastMessage = chat.messages[0];
            if (!lastMessage) return true;

            if (lastMessage.userId === userId) return true;

            return chat.seenBy.some((u) => u.id === userId);
        };

        // Map receiver and return
        const formattedChats = chats.map((chat: FullChat) => {
            const receiver = chat.users.find(u => u.id !== userId);
            const lastMessage = chat.messages[0]?.text || null;
            const hasSeenLastMessage = hasReceiverSeenLastMessage(chat, userId);

            return {
                ...chat,
                receiver,
                lastMessage,
                hasSeenLastMessage,
            };
        });

        return NextResponse.json({ success: true, formattedChats });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to get chats!" });
    }
};
