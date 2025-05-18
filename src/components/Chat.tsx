"use client"

import Image from 'next/image';
import { useState } from 'react'


const Chat = () => {

    const [text, setText] = useState("");
    const [chats, setChats] = useState([]);
    const chat = true;

    return (
        <div className='h-full flex flex-col pt-5'>
            {/* MESSAGES */}
            <div className='flex-[1] max-h-[50vh] flex flex-col gap-2 md:gap-5 overflow-y-scroll pb-3'>
                <h1 className='font-light text-xl md:text-2xl'>Messages</h1>

                {/* MESSAGE */}
                
                {chats && chats.map((c) => (
                    <div  key={c.id} className={`bg-white p-3 md:p-5 rounded-[10px] flex items-center justify-between cursor-pointer ${!c.hasSeenLastMessage ? "!bg-red-100 border border-red-300" : ""}`}>
                        <div className='flex items-center gap-3'>
                            <Image 
                                src={"/noAvatar.png"}  
                                alt=''
                                width={40}
                                height={40}
                                className='rounded-full aspect-square object-cover w-8 h-8  md:w-10 md:h-10'
                            />
                            <span className='max-md:hidden font-bold'>Receiver User Name}</span>
                        </div>
                        <p>Last Message</p>
                        <button className='text-red-500 text-xl leading-0 font-bold pb-3.5 pt-2.5 px-2 border border-red-200 rounded-full hover:scale-105 hover:bg-red-100 duration-300 cursor-pointer'>x</button>
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
                                src={"/noAvatar.png"}
                                alt=''
                                width={30}
                                height={30}
                                className='w-7.5 h-7.5 rounded-full object-cover'
                            />
                            <span>Receiver username</span>
                        </div>
                        <span className='cursor-pointer'>X</span>
                    </div>

                    {/* CENTER */}
                    <div className='h-[350px] overflow-y-scroll p-5 flex flex-col gap-5'>
                        {/* CHAT MESSAGE */}
                        {chats?.map((msg) => {

                            return (
                                <div key={msg.id} className={`w-1/2 ${msg === "own" ? "self-end text-right" : ""}`}>
                                    <div className='bg-[#f7dca285] p-2 rounded-md'>
                                        <p className='text-gray-800'>{msg}</p>
                                        <span className='text-[10px] md:text-xs bg-[#f7c14b39] p-0.5 rounded-[5px]'>{format(msg.createdAt)}</span>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    {/* BOTTOM */}
                    <form className='border-t border-[#f7c14b85] h-10 md:h-15 flex items-center justify-between'>
                        <textarea onChange={(e) => setText(e.target.value)} value={text} className='flex-[3] border-none outline-none p-5 leading-[1] md:leading-tight resize-none h-full'></textarea>
                        <button type='submit' className='flex-[1] bg-[#f7c14b85] max-h-10 md:max-h-15 h-full border-none cursor-pointer'>Send</button>
                    </form>
                </div>
            }

        </div>
    )
}

export default Chat


