import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middlewares/userAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await userAuth();
    const userId = user.id;

    const body = await req.json();
    const receiverId = Number(body.receiverId);

    try {
        const existingChat = await prisma.chat.findFirst({
            where: {
                users: {
                    some: {
                        id: userId
                    }
                },
                AND: {
                    users: {
                        some: {
                            id: receiverId
                        }
                    }
                }
            }
        });

        if (existingChat) {
            return NextResponse.json({ success: false, chat: existingChat, message: "You already have a conversation with this agent, check your profile page." })
        }

        const newChat = await prisma.chat.create({
            data: {
                users: {
                    connect: [{ id: userId }, { id: receiverId }]
                }
            },
            include: {
                users: {
                    select: {
                        id: true,
                        userName: true,
                        avatar: true
                    }
                }
            }
        });

        return NextResponse.json({ success: true, newChat });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to add chat!" });
    }
};