import cloudinary from "@/config/cloudinary";
import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middlewares/userAuth";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        
        // Get user ID from authentication
        const user = await userAuth();
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }
        
        // Extracting post details
        const title = formData.get("title") as string;
        const price = parseInt(formData.get("price") as string, 10);
        const address = formData.get("address") as string;
        const city = formData.get("city") as string;
        const bedroom = parseInt(formData.get("bedroom") as string, 10);
        const bathroom = parseInt(formData.get("bathroom") as string, 10);
        const latitude = parseFloat(formData.get("latitude") as string);
        const longitude = parseFloat(formData.get("longitude") as string);
        const type = formData.get("type") as "buy" | "rent";
        const property = formData.get("property") as "apartment" | "house" | "condo" | "land";

        // Extract post details
        const desc = formData.get("desc") as string;
        const utilities = formData.get("utilities") as string | null;
        const pet = formData.get("pet") as string | null;
        const income = formData.get("income") as string | null;
        const size = formData.get("size") ? parseInt(formData.get("size") as string, 10) : null;
        const school = formData.get("school") ? parseInt(formData.get("school") as string, 10) : null;
        const bus = formData.get("bus") ? parseInt(formData.get("bus") as string, 10) : null;
        const restaurant = formData.get("restaurant") ? parseInt(formData.get("restaurant") as string, 10) : null;


        if (!title || !price || !address || !city || !bedroom || !bathroom || !type || !property) {
            return NextResponse.json({ success: false, message: "Missing required fields"});
        }

        // Multiple images upload
        const imagesFiles = formData.getAll("images") as File[];
        if (imagesFiles.length  > 4) {
            return NextResponse.json({ success: false, message: "You can upload up to 4 images" });
        } 

        const imageUrls: string[] = [];

        for (const imageFile of imagesFiles) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Upload images to cloudinary
            const uploadImages = await cloudinary.uploader.upload(`data:image/png;base64,${buffer.toString("base64")}`, {
                folder: "post_images",
            });

            imageUrls.push(uploadImages.secure_url);
        }

        // Create the post in the database
        const newPost = await prisma.post.create({
            data: {
                title,
                price,
                address,
                city,
                bedroom,
                bathroom,
                latitude,
                longitude,
                type,
                property,
                userId: user.id
            }
        });

        // Save images to database
        await prisma.image.createMany({
            data: imageUrls.map((url) => ({
                url,
                postId: newPost.id
            })),
        });

        // Save post details
        await prisma.postDetail.create({
            data: {
                desc,
                utilities,
                pet,
                income,
                size,
                school,
                bus,
                restaurant,
                postId: newPost.id
            }
        });

        return NextResponse.json({
            success: true,
            message: "Post Added",
            post: newPost
        });
 
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal server error" });
    }
};