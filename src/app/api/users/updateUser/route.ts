import cloudinary from "@/config/cloudinary";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { tmpdir } from "os";
import path from "path";

export async function PUT(req: NextRequest) {
    try {
        const formData = await req.formData();
        const userId = formData.get("id") as string;
        const userName = formData.get("userName") as string;
        const email = formData.get("email") as string;
        const imageFile = formData.get("avatar") as File | null;

        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID is required" });
        }

        let avatarUrl = "";
        if (imageFile) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const tempFilePath = path.join(tmpdir(), imageFile.name);
            await writeFile(tempFilePath, buffer);

            const uploadImage = await cloudinary.uploader.upload(tempFilePath, {
                folder: "user_avatars"
            });

            avatarUrl = uploadImage.secure_url;
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: {
                userName,
                email,
                ...(avatarUrl && { avatar: avatarUrl })
            }
        });

        return NextResponse.json({ success: true, message: "User Updated", user: updatedUser });

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An uuknown error occured";
        return NextResponse.json({ success: false, message: errMessage });
    }
};


