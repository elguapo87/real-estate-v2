"use client"

import { AuthContext } from "@/context/AuthContext";
import { ChatContext } from "@/context/ChatContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

type PostDetailType = {
  desc?: string;
  utilities?: string;
  pet?: string;
  income?: string;
  size?: number;
  school?: number;
  bus?: number;
  restaurant?: number;
};

type ImageType = {
  id: number;
  url: string;
};

type UserPostDataType = {
  avatar?: string
  email?: string;
  id?: number;
  userName?: string
};

type ListDataTypes = {
  id: number;
  title: string;
  images: ImageType[]
  bedroom: number;
  bathroom: number;
  price: number;
  property: string;
  address: string;
  latitude: number;
  longitude: number;
  city: string;
  postDetail: PostDetailType[];
  user: UserPostDataType;
};

interface CardProps {
  item: ListDataTypes;
  type?: string;
}

const Card = ({ item, type = "default" } : CardProps) => {

  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("Card must be within AuthContextProvider");
  const { userData, savedPostIds, handleSavePost, handleDeletePost } = authContext;

  const chatContext = useContext(ChatContext);
  if (!chatContext) throw new Error("Card must be within ChatContextProvider");
  const { addChat } = chatContext;

  const isPostSaved = savedPostIds.includes(item.id);
  
  const router = useRouter();

  const handleSaveClick = () => {
    if (!userData) {
      toast.error("You need to login to save the place");
      return;
    }

    handleSavePost(item.id);
  };


  const handleChatClick = () => {
    if (!userData) {
      toast.error("You need to login to contact agent");
      return;
    }

    addChat(item.user.id ?? 0, router);
  };

  return (
    <div className="flex max-md:flex-col gap-5">
      <Link href={`/${item.id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="md:flex-2 h-50 relative">
        <Image src={item.images?.[0]?.url} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-full h-full object-cover rounded-[10px]" />
      </Link>

      <div className="md:flex-3 flex flex-col justify-between gap-2.5">
        <Link href={`/${item.id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <h2 className="text-base max-md:text-center md:text-[20px] md:ml-6 font-semibold text-[#444] hover:text-[#000] scale-110 ease-in duration-400">
            {item.title}
          </h2>
        </Link>

        <p className="text-sm flex items-center gap-1.25 text-[#888]">
          <Image src="/pin.png" alt="" width={16} height={16} />
          <span>{item.address}, {item.city}</span>
        </p>

        <div className="flex items-center gap-5">
          <span className="font-light text-gray-600 capitalize">{item.property}</span>
          <p className="text-base md:text-[20px] font-light p-1.25 rounded-[5px] bg-[rgba(254,205,81,0.438)] w-max">€{item.price}</p>
        </div>

        {/* BOTTOM */}
        <div className="flex justify-between gap-2.5">
          <div className="flex gap-5 text-sm">
            <div className="flex items-center gap-1.25 bg-[whitesmoke] p-1.25 rounded-[5px]">
              <Image src="/bed.png" alt="" width={16} height={16} />
              <span>{item.bedroom}</span>
            </div>

            <div className="flex items-center gap-1.25 bg-[whitesmoke] p-1.25 rounded-[5px]">
              <Image src="/bath.png" alt="" width={16} height={16} />
              <span>{item.bathroom}</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div onClick={handleSaveClick} className="border border-[#999] px-1.25 py-0.5 rounded-[5px] cursor-pointer flex items-center justify-center hover:bg-[lightGray]">
              {
                isPostSaved
                    ?
                <Image src="/checked.png" alt="" width={16} height={16} />
                    :
                <Image className="save" src="/save.png" alt="" width={16} height={16} />
              }
            </div>

            {
              item.user.id !== userData?.id
              &&
              <div onClick={handleChatClick} className={`border border-[#999] px-1.25 py-0.5 rounded-[5px] cursor-pointer flex items-center justify-center hover:bg-[lightGray] ${type === "profile" && "hidden"}`}>
                <Image className="chat" src="/chat.png" alt="" width={16} height={16} />
              </div>
            }

            {
              item.user.id === userData?.id
              &&
              <button onClick={() => router.push(`/updatePost/${item.id}`)} className="bg-blue-500 text-white px-3 py-0.5 text-sm rounded hover:bg-blue-700 duration-300 cursor-pointer">Edit</button>
            }

            {
              item.user.id === userData?.id
                   &&
              <div className={type === "default" ? "block" : "hidden"}>
                <Image onClick={() => handleDeletePost(item.id)} src="/bin.png" alt="Trash" width={28} height={28} className="w-7 h-7 hover:opacity-85 cursor-pointer" />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card



        