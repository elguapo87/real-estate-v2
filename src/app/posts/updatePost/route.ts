import cloudinary from "@/config/cloudinary";
import { prisma } from "@/lib/prisma";
import { userAuth } from "@/middlewares/userAuth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const formData = await req.formData();

        const user = await userAuth();
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }

        const postId = formData.get("postId") as string;
        if (!postId) {
            return NextResponse.json({ success: false, message: "Post ID is required" });
        }

        const title = formData.get("title") as string;
        const price = parseInt(formData.get("price") as string, 10);
        const address = formData.get("address") as string;
        const city = formData.get("city") as string;
        const bedroom = parseInt(formData.get("bedroom") as string, 10);
        const bathroom = parseInt(formData.get("bathroom") as string, 10);

        const latitudeRaw = formData.get("latitude") as string;
        const longitudeRaw = formData.get("longitude") as string;

        const latitude = latitudeRaw ? parseFloat(latitudeRaw) : 0;
        const longitude = longitudeRaw ? parseFloat(longitudeRaw) : 0;
       
        const type = formData.get("type") as "buy" | "rent";
        const property = formData.get("property") as "apartment" | "house" | "condo" | "land";

        const desc = formData.get("desc") as string || "";
        const utilities = formData.get("utilities") as string | null;
        const pet = formData.get("pet") as string | null;
        const income = formData.get("income") as string | null;
        const size = formData.get("size") ? parseInt(formData.get("size") as string, 10) : null;
        const school = formData.get("school") ? parseInt(formData.get("school") as string, 10) : null;
        const bus = formData.get("bus") ? parseInt(formData.get("bus") as string, 10) : null;
        const restaurant = formData.get("restaurant") ? parseInt(formData.get("restaurant") as string, 10) : null;

        const imageFiles = formData.getAll("images") as File[];
        if (imageFiles.length > 4) {
            return NextResponse.json({ success: false, message: "You can upload up to 4 images" });
        }

        const imageUrls: string[] = [];

        if (imageFiles.length > 0) {
            await prisma.image.deleteMany({where: {postId: parseInt(postId)}});

            for (const imageFile of imageFiles) {
                const arrayBuffer = await imageFile.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
    
                const uploadImages = cloudinary.uploader.upload(`data:image/png;base64,${buffer.toString("base64")}`, {
                    folder: "post_images",
                });
    
                imageUrls.push((await uploadImages).secure_url)
            }

            await prisma.image.createMany({
                data: imageUrls.map((url) => ({
                    url,
                    postId: parseInt(postId)
                }))
            });
        }

        const updatePost = await prisma.post.update({
            where: {id: parseInt(postId)},
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
        })

        await prisma.postDetail.update({
            where: {postId: updatePost.id},
            data: {
                desc,
                utilities,
                pet,
                income,
                size: isNaN(size!) ? null : size,
                school: isNaN(school!) ? null : school,
                bus: isNaN(bus!) ? null : bus,
                restaurant: isNaN(restaurant!) ? null : restaurant,
            }
        });

        return NextResponse.json({
            success: true,
            message: "Post Updated",
            post: updatePost
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal server error" });
    }
};