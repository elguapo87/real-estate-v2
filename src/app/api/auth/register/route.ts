import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import path from "path";
import { tmpdir } from "os";
import { writeFile } from "fs/promises";
import cloudinary from "@/config/cloudinary";
import generateToken from "@/utils/generateToken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const userName = formData.get("userName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const imageFile = formData.get("avatar") as File | null;

        if (!userName || !email || !password) {
            return NextResponse.json({ success: false, message: "Missing Details" });
        }

        // Check if user already exists
        const isUserExists = await prisma.user.findUnique({ where: { email } });
        if (isUserExists) {
            return NextResponse.json({ success: false, message: "User is already registered" });
        }

        // Validate password length
        if (password.length < 8) {
            return NextResponse.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload image if provided
        let avatarUrl = "";
        if (imageFile) {
            // Convert image to a temporary file
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const tempFilePath = path.join(tmpdir(), imageFile.name);
            await writeFile(tempFilePath, buffer);

            // Upload to Cloudinary
            const uploadImage = await cloudinary.uploader.upload(tempFilePath, {
                folder: "user_avatars"
            });

            avatarUrl = uploadImage.secure_url;
        }

        // Create user in database
        const user = await prisma.user.create({
            data: {
                userName,
                email,
                password: hashedPassword,
                avatar: avatarUrl || null
            }
        });

        const token = generateToken(user.id);

        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60,
            path: "/"
        });

        return NextResponse.json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user.id,
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
                token
            }
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal server error" });
    }
};