"use client"

import Card from '@/components/Card'

import Loading from '@/components/Loading'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const ProfilePage = () => {

  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
  const userData = true;


  return userData ? (
    <div className='flex max-md:flex-col h-full md:mt-8'>
      {/* DETAILS */}
      <div className='flex-[3] pb-12.5'>
        <div className='md:pr-12.5 flex flex-col gap-8 md:gap-12.5'>

          {/* TITLE */}
          <h1 className='text-center font-light text-xl md:text-2xl'>User Information</h1>

          {/* INFO */}
          <form className='max-md:self-center flex flex-col gap-5 md:gap-10 bg-[rgba(254,205,81,0.438)] py-5 px-10 rounded-md w-max shadow-xl'>
            {
              isEdit
                ?
                <>
                  <div className='relative flex items-end gap-5 md:gap-10'>
                    <button onClick={(e) => { e.preventDefault(); setIsEdit(false); }} className='absolute top-0 right-0 translate-x-7 -translate-y-3 text-2xl cursor-pointer'>x</button>
                    <p className='md:text-xl'>Select Image:</p>
                    <label htmlFor="image">
                      <input type="file" id='image' hidden />
                      <Image
                        src={"/upload_area.svg"}
                        alt=''
                        width={60}
                        height={60}
                        className='w-10 h-10 md:w-15 md:h-15 rounded-full object-cover aspect-square'
                      />
                    </label>
                  </div>
                  <input className='md:text-xl font-bold outline-none p-3' type="text" />
                  <input className='md:text-xl font-bold outline-none p-3' type="email" />

                  <button type='submit' className='px-3 py-1 text-sm font-extrabold text-white md:px-4 md:py-2 bg-[#389755] border-none cursor-pointer rounded hover:scale-101 duration-300'>Save</button>
                </>
                :
                <>
                  <span className='flex items-end gap-5 md:gap-10'>
                    <p className='md:text-xl'>Avatar:</p>
                    <Image
                      src={"/noAvatar.png"}
                      alt=''
                      width={60}
                      height={60}
                      className='w-10 h-10 md:w-15 md:h-15 rounded-full object-cover aspect-square'
                    />
                  </span>
                  <span className='flex items-center justify-between gap-5 md:text-xl'>Username: <b>John Doe</b></span>
                  <span className='flex items-center gap-5 md:text-xl'>Email: <b>john@gmail.com</b></span>
                  <button onClick={(e) => { e.preventDefault(); setIsEdit(true); }} className='px-3 py-1 text-sm font-bold md:px-4 md:py-2 bg-[#fece51] border-none cursor-pointer rounded hover:scale-101 duration-300'>Update Profile</button>
                </>
            }

          </form>

          {/* TITLE */}
          <div className='flex items-start justify-between'>
            <h1 className='font-light text-xl md:text-2xl'>My List</h1>
            <button onClick={() => router.push("/add")} className='px-3 py-1 text-sm text-white md:px-6 md:py-3 bg-[#389755] border-none cursor-pointer rounded hover:scale-101 duration-300'>Create New Post</button>
          </div>

     
            <Card />
         

          <h1 className='font-light text-xl md:text-2xl'>Saved List</h1>

       
            <Card />
            
        
        </div>
      </div>

      {/* CHAT CONTAINER - RIGHT SIDE */}
      <div className='flex-[2] bg-[#fcf5f3] h-full pb-3'>
        <div className='px-5 h-full'>
          Chat
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default ProfilePage

