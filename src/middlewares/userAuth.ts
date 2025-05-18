import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const userAuth = async () => {
    try { 
        const token = (await cookies()).get("token")?.value;

        if (!token) {
            throw new Error("Not Authorized, No Token Provided");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true, userName: true, password: true, avatar: true, createdAt: true }
        });

        if (!user) {
            throw new Error("User Not Found");
        }

        return user;

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Not Authorized");
    }
};



