"use client"

import { AuthContext } from '@/context/AuthContext';
import { ChatContext } from '@/context/ChatContext';
import { useNotificationStore } from '@/lib/notificationStore';
import axios from 'axios';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { format } from 'timeago.js';

const Chat = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("Chat must be within AuthContextProvider");
    const { userData } = authContext;

    const chatContext = useContext(ChatContext);
    if (!chatContext) throw new Error("Chat must be within ChatContextProvider");
    const { chats, getChats, getChat, chat, setChat, deleteChat } = chatContext;

    const { decrease } = useNotificationStore();

    const [text, setText] = useState("");

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("text", text);
        
        if (text.trim() === "" ) return;

        try {
            const { data } = await axios.post(`/api/messages/addMessage?id=${chat?.id}`, formData);
            if (data.success) {
                if (chat) {
                    setChat({ ...chat, messages: [...chat.messages, data.message] })
                }
                setText("");
                await getChats();

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "An unknown error occured";
            toast.error(errMessage);
        }
    };

    useEffect(() => {  
        getChats();
    }, [getChats]);

    return (
        <div className='h-full flex flex-col pt-5'>
            {/* MESSAGES */}
            <div className='flex-[1] max-h-[50vh] flex flex-col gap-2 md:gap-5 overflow-y-scroll pb-3'>
                <h1 className='font-light text-xl md:text-2xl'>Messages</h1>

                {/* MESSAGE */}
                
                {chats && chats.map((c) => (
                    <div onClick={() => { getChat(c.id); if (!c.hasSeenLastMessage) { decrease(); }}} key={c.id} className={`bg-white p-3 md:p-5 rounded-[10px] flex items-center justify-between cursor-pointer ${!c.hasSeenLastMessage ? "!bg-red-100 border border-red-300" : ""}`}>
                        <div className='flex items-center gap-3'>
                            <Image 
                                src={c.receiver?.avatar || "/noAvatar.png"}  
                                alt=''
                                width={40}
                                height={40}
                                className='rounded-full aspect-square object-cover w-8 h-8  md:w-10 md:h-10'
                            />
                            <span className='max-md:hidden font-bold'>{c.receiver?.userName}</span>
                        </div>
                        <p>{c.lastMessage ? c.lastMessage.slice(0, 15) + "..." : null}</p>
                        <button onClick={(e) => { e.stopPropagation(); deleteChat(c.id) }} className='text-red-500 text-xl leading-0 font-bold pb-3.5 pt-2.5 px-2 border border-red-200 rounded-full hover:scale-105 hover:bg-red-100 duration-300 cursor-pointer'>x</button>
                    </div>
                ))}
            </div>

            {/* CHAT BOX */}
            {
                chat
                 &&
                <div className='flex-[1] bg-white flex flex-col h-full justify-between'>
                    {/* TOP */}
                    <div className='bg-[#f7c14b85] p-5 font-bold flex items-center justify-between'>
                        {/* USER */}
                        <div className='flex items-center gap-3'>
                            <Image 
                                src={chat.receiver.avatar || "/noAvatar.png"}
                                alt=''
                                width={30}
                                height={30}
                                className='w-7.5 h-7.5 rounded-full object-cover'
                            />
                            <span>{chat.receiver.userName}</span>
                        </div>
                        <span onClick={() => setChat(null)} className='cursor-pointer'>X</span>
                    </div>

                    {/* CENTER */}
                    <div className='h-[350px] overflow-y-scroll p-5 flex flex-col gap-5'>
                        {/* CHAT MESSAGE */}
                        {chat.messages.map((msg) => {
                            const isOwn = msg.userId === userData?.id;

                            return (
                                <div key={msg.id} className={`w-1/2 ${isOwn ? "self-end text-right" : ""}`}>
                                    <div className='bg-[#f7dca285] p-2 rounded-md'>
                                        <p className='text-gray-800'>{msg.text}</p>
                                        <span className='text-[10px] md:text-xs bg-[#f7c14b39] p-0.5 rounded-[5px]'>{format(msg.createdAt)}</span>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    {/* BOTTOM */}
                    <form onSubmit={handleSendMessage} className='border-t border-[#f7c14b85] h-10 md:h-15 flex items-center justify-between'>
                        <textarea onChange={(e) => setText(e.target.value)} value={text} className='flex-[3] border-none outline-none p-5 leading-[1] md:leading-tight resize-none h-full'></textarea>
                        <button type='submit' className='flex-[1] bg-[#f7c14b85] max-h-10 md:max-h-15 h-full border-none cursor-pointer'>Send</button>
                    </form>
                </div>
            }

        </div>
    )
}

export default Chat


