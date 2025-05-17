"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

const MobileMenu = () => {

    const [isOpen, setIsOpen] = useState(false);
    const userData = false;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";

        } else {
            document.body.style.overflow = "scroll";
        }
    }, [isOpen]);

    return (
        <div className="md:hidden">
            <div className="flex flex-col gap-[4.5px] cursor-pointer" onClick={() => setIsOpen(prev => !prev)}>
                <div className={`h-1 w-6 bg-black rounded-sm ${isOpen ? "rotate-45" : ""} origin-left ease-in-out duration-500`} />
                <div className={`h-1 w-6 bg-black rounded-sm ${isOpen ? "opacity-0" : ""} ease-in-out duration-500`} />
                <div className={`h-1 w-6 bg-black rounded-sm ${isOpen ? "-rotate-45" : ""} origin-left ease-in-out duration-500`} />
            </div>

            {
                isOpen
                &&
                <div className="absolute w-full left-0 top-25 h-[calc(100vh-100px)] bg-black text-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
                    {
                        userData
                          &&
                    <div className='absolute top-3 right-3 ml-4 bg-white px-2 py-0.5 text-sm text-black flex items-center gap-1 rounded cursor-pointer'>
                        <Image src="/logout_icon.png" alt='' width={16} height={16} />
                        Logout
                    </div>
                    }
                    <Link onClick={() => setIsOpen(false)} href="/">Home</Link>
                    <Link onClick={() => setIsOpen(false)} href="/list">List</Link>
                    <Link onClick={() => setIsOpen(false)} href="/about">About Us</Link>
                    <Link onClick={() => setIsOpen(false)} href="/agents">Agents</Link>
                </div>
            }
        </div>
    )
}

export default MobileMenu
