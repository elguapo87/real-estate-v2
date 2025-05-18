"use client"

import Image from "next/image";
import { useEffect, useState } from "react"

type ImageType = {
    id: number;
    postId: number;
    url: string;
};

const Slider = ({ images }: { images: ImageType[] }) => {

    const [imageIndex, setImageIndex] = useState<number | null>(null);

    const changeSlide = (direction: string) => {
        if (direction === "left") {
            if (imageIndex === 0) {
                setImageIndex(images.length - 1);

            } else {
                setImageIndex((imageIndex ?? 0) - 1);
            }

        } else {
            if (imageIndex === images.length - 1) {
                setImageIndex(0);

            } else {
                setImageIndex((imageIndex ?? 0) + 1)
            }
        }
    };

    useEffect(() => {
        if (imageIndex !== null) {

            document.body.style.overflow = "hidden";

        } else {
            document.body.style.overflow = "unset";
        }
    }, [imageIndex]);

    return (
        <div className="w-full md:h-[350px] flex max-md:flex-col gap-3 md:gap-5">
            {
                imageIndex !== null
                &&
                <div className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-between z-10">
                    {/* LEFT ARROW */}
                    <div className="absolute top-1/2 left-0 flex items-center justify-center -translate-y-5 p-3 border-[0.1px] border-white rounded-xl hover:opacity-60 ease-in duration-200 cursor-pointer z-20">
                        <Image onClick={() => changeSlide("left")} src="/arrow.png" alt="" width={50} height={50} className="w-6.25 h-6.25 md:w-12.5 md:h-12.5" />
                    </div>

                    {/* IMAGE CONTAINER */}
                    <div className="w-full h-full relative">
                        <Image src={images[imageIndex].url} alt="" fill className="w-full h-full object-contain" />
                    </div>

                    {/* RIGHT ARROW */}
                    <div className="absolute top-1/2 right-0 flex items-center justify-center -translate-y-5 p-3 border-[0.1px] border-white rounded-xl hover:opacity-60 ease-in duration-200 cursor-pointer z-20">
                        <Image onClick={() => changeSlide("right")} src="/arrow.png" alt="" width={50} height={50} className="w-6.25 h-6.25 md:w-12.5 md:h-12.5 rotate-180" />
                    </div>

                    {/* CLOSE BUTTON */}
                    <div onClick={() => setImageIndex(null)} className="absolute top-3 right-3 md:top-7 md:right-7 text-white text-2xl md:text-4xl font-extrabold border-[0.1px] border-white py-1 px-3 md:py-3 md:px-5 rounded-full aspect-square hover:opacity-70 ease-in duration-200 cursor-pointer">X</div>
                </div>
            }

            {/* BIG IMAGE */}
            <div className="flex-[3] max-sm:min-h-[200px] max-sm:max-h-[250px] relative">
                <Image onClick={() => setImageIndex(0)} src={images[0].url} alt="" fill className="w-full h-full object-cover rounded-[10px] cursor-pointer" />
            </div>

            {/* SMALL IMAGES */}
            <div className="flex-[1] flex md:flex-col max-md:items-center justify-between cursor-pointer">
                {images.slice(1).map((image, index) => (
                    <Image onClick={() => setImageIndex(index + 1)} src={image.url} alt="" width={200} height={100} key={index} className="max-md:w-[100px] h-[100px] rounded-md" />
                ))}
            </div>
        </div>
    )
}

export default Slider


