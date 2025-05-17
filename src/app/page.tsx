
import SearchBar from '@/components/SearchBar'
import Image from 'next/image'
import React from 'react'

const HomePage = () => {
  return (
    <div className="flex max-md:text-center h-full md:mt-5">
      {/* TEXT CONTAINER */}
      <div className="flex-3">
        <div className="h-full flex flex-col justify-center gap-5 md:gap-12.5 md:pr-25">
          <h1 className="text-[30px] md:text-[64px] border border-gray-200 p-5 shadow-lg">Find Real Estate & Get Your Dream Place
            Discover the perfect property that fits your lifestyle, whether you&apos;re buying, renting, or investing.</h1>
          <p>
            We combine powerful features like real-time chat, verified listings, and personalized recommendations to ensure you don&apos;t just browse homes - you find the right one.

            At PGEstate, we believe your next chapter begins with a great space. Let&apos;s find it together.
          </p>

          <SearchBar />

          {/* BOXES */}
          <div className='flex max-md:flex-col max-md:gap-3 items-center justify-between'>
            <div className='bg-red-50 p-5 border border-gray-300 flex flex-col items-center shadow-lg max-md:w-max'>
              <h1 className='text-[36px]'>16+</h1>
              <h2>Years of Expiriance</h2>
            </div>
            <div className='bg-red-50 p-5 border border-gray-300 flex flex-col items-center shadow-lg max-md:w-max'>
              <h1 className='text-[36px]'>200</h1>
              <h2>Awards Gained</h2>
            </div>
            <div className='bg-red-50 p-5 border border-gray-300 flex flex-col items-center shadow-lg max-md:w-max'>
              <h1 className='text-[36px]'>1200+</h1>
              <h2 className=''>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE CONTAINER */}
      <div className='max-md:hidden relative w-full flex-2 flex items-center bg-[#fcf5f3]'>
        <Image src="/bg.png" alt='' width={1150} height={700} className='absolute right-0 w-[115%] -translate-x-[10%]' />
      </div>
    </div>
  )
}

export default HomePage
