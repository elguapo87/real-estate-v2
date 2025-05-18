"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ChatsDataType {
    id: number;
    createdAt: Date;
    lastMessage: MessageType[] | null;
    receiver: {
        id: number;
        userName: string;
        avatar: string; 
    };
    users: {
        id: number;
        userName: string;
        avatar: string; 
    },
    seenBy: {
        id: number;
        userName: string;
        avatar: string;
    },
    messages: MessageType[];
    hasSeenLastMessage: boolean;
}

interface MessageType {
    id: number;
    text: string;
    userId: number;
    createdAt: string;
}

interface ChatDataType {
    receiver: {
        id: number;
        userName: string;
        avatar: string;
    };
    createdAt: Date;
    id: number;
    messages: MessageType[];
    users: {
        id: number;
        userName: string;
        avatar: string; 
    },
    seenBy: {
        id: number;
        userName: string;
        avatar: string;
    };
}

interface ChatContextType {
    addChat: (receiverId: number, router: AppRouterInstance) => Promise<void>;
    chats: ChatsDataType[] | null;
    setChats: Dispatch<SetStateAction<ChatsDataType[] | null>>;
    getChats: () => Promise<void>;
    chat: ChatDataType | null;
    setChat: Dispatch<SetStateAction<ChatDataType | null>>;
    getChat: (chatId: number) => Promise<void>;
    deleteChat: (chatId: number) => Promise<void>;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatContextProvider = ({children} : {children: React.ReactNode}) => {

    const router = useRouter();

    const [chats, setChats] = useState<ChatsDataType[] | null>(null);
    const [chat, setChat] = useState<ChatDataType | null>(null);

    const addChat = async (receiverId: number) => {
        try {
            const { data } = await axios.post("/api/chats/addChat", { receiverId });
            if (data.success) {
                setChats(prev => prev ? [...prev, data.newChat] : [data.newChat]);
                router.push("/profile");
                await getChats();
                setChat(null);

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "An unknown error occured";
            toast.error(errMessage);
        }
    };

    const getChats = async () => {
        try {
            const { data } = await axios.get("/api/chats/getChats");
            if (data.success) {
                setChats(data.formattedChats);
                
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "An unknown error occured";
            toast.error(errMessage);
        }
    };


    const getChat = async (chatId: number) => {
        try {
            const { data } = await axios.get(`/api/chats/getChat?id=${chatId}`);
            if (data.success) {
                setChat(data.chat);
                
            } else {
                toast.error(data.message);
            }

            await axios.post(`/api/chats/markSeen?id=${chatId}`);
            await getChats();

        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "An unknown error occured";
            toast.error(errMessage);
        }
    };
    

    const deleteChat = async (chatId: number) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this chat?");

        if (!isConfirmed) return;

        try {
            const { data } = await axios.delete(`/api/chats/deleteChat?id=${chatId}`);
            if (data.success) {
                toast.success(data.message);
                setChat(null);
                await getChats();

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "An unknown error occured";
            toast.error(errMessage);
        }
    }

    const value = {
        addChat,
        chats, setChats,
        getChats,
        chat, setChat,
        getChat,
        deleteChat
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
};

export default ChatContextProvider;