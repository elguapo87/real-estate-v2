"use client"

import Image from 'next/image'
import Link from 'next/link'
import MobileMenu from './MobileMenu'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/api/auth'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { useNotificationStore } from '@/lib/notificationStore'


const Navbar = () => {

    const context = useContext(AuthContext);
    if (!context) throw new Error("Navbar must be within AuthContextProvider");
    const { userData, setUserData, setIsOpen } = context;

    const { number, fetch } = useNotificationStore();

    const router = useRouter();

    const userLogout = async () => {
        try {
            await logout();
            setUserData(null);
            router.push("/");
            window.location.reload();
            
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    useEffect(() => {
        if (userData) {
            fetch();
        }
    }, [userData, fetch]);

    return (
        <nav className='flex items-center justify-between h-25'>
            {/* NAV LEFT */}
            <div className='flex-3 flex items-center gap-12.5'>
                <Link href="/" className='flex items-center gap-2 hover:scale-105 ease-in duration-400' onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <Image src="/logo.png" alt='Logo' width={28} height={28} />
                    <span className='text-xl font-medium'>PGEstate</span>
                </Link>

                <div className='hidden md:flex items-center gap-5 lg:gap-12.5'>
                    <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className='hover:scale-105 ease-in duration-400'>Home</Link>
                    <Link href="/list" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className='hover:scale-105 ease-in duration-400'>List</Link>
                    <Link href="/about" className='hover:scale-105 ease-in duration-400'>About Us</Link>
                    <Link href="/agents" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className='hover:scale-105 ease-in duration-400'>Agents</Link>
                </div>
                
            </div>

            {/* NAV RIGHT */}
            <div className='flex-2 flex max-md:gap-6 items-center justify-end md:bg-[#fcf5f3] h-full rounded'>
                {
                    userData 
                     ?
                    <div className='flex items-center gap-2 font-bold md:mr-2'>
                        <Image 
                            src={userData.avatar || "/noAvatar.png"}
                            alt='' 
                            width={40} 
                            height={40} 
                            className='w-7 h-7 md:w-10 md:h-10 rounded-full object-cover aspect-square'
                        />
                        <span className='max-md:hidden'>{userData.userName}</span>
                        
                        <Link onClick={() => setIsOpen(false)} href="/profile" className='relative px-3 py-1 md:px-6 md:py-2 bg-[#fece51] border-none max-md:text-xs cursor-pointer rounded group'>
                            <div className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4.5 h-4.5 md:w-6.5 md:h-6.5 flex items-center max-md:text-xs justify-center'>{number}</div>
                            <span>Profile</span>
                        </Link>
                        <div onClick={(e) => { e.preventDefault(); userLogout(); }} className='hidden ml-4 bg-red-400 px-3 py-1 md:flex items-center gap-1 rounded cursor-pointer'>
                            <Image src="/logout_icon.png" alt='' width={16} height={16} />
                            Logout
                        </div>

                    
                    </div>
                     :
                    <div className=''>
                        <button onClick={() => { router.push("/login"); setIsOpen(false); }} className='font-[600] px-3 py-1.5 md:px-6 md:py-3 max-md:text-xs bg-[#fece51] text-black mr-2 rounded hover:scale-105 ease-in duration-400 cursor-pointer'>Sign In</button>
                    </div>
                }

                <MobileMenu />
            </div>
        </nav>
    )
}

export default Navbar


