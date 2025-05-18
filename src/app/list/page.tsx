"use client"

import Loading from '@/components/Loading'
import Slider from '@/components/Slider'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useParams } from 'next/navigation'

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const SinglePage = () => {

  const post = true;

  const { id } = useParams();
  const postId = parseInt(id as string, 10);


  return post ? (
    <div className='flex max-md:flex-col h-full md:mt-10'>
      <div className='flex-[3] max-md:mb-5'>
        <div className='md:pr-12.5'>

          <Slider />

          {/* INFO */}
          <div className='mt-8 md:mt-12.5'>
            {/* TOP */}
            <div className='flex justify-between max-md:flex-col-reverse max-md:gap-5'>
              <div className='flex flex-col gap-5'>
                <h1 className='font-normal'>title</h1>

                <div className='flex gap-1.25 items-center text-[#888] text-sm'>
                  <Image src="/pin.png" alt='' width={16} height={16} />
                  <span>address, city</span>
                </div>

                <div className='p-1.25 bg-[rgba(254,205,81,0.438)] rounded-[5px] w-max text-xl font-light'>€50000</div>
              </div>

              {/* USER */}
              <div className='flex flex-col items-center justify-between gap-3 px-10 py-6 rounded-[10px] bg-[rgba(254,205,81,0.209)] font-semibold'>
                <Image src={"/noAvatar.png"} alt='' width={50} height={50} className='rounded-full aspect-square object-cover' />
                <div className='flex items-center gap-2'>
                  <p className='font-light'>Agent:</p>
                  <span>User Name</span>

                </div>

                <div className='flex items-center gap-2'>
                  <p className='font-light'></p>
                  <span>agent@gmail.com</span>
                </div>

              </div>
            </div>

            {/* BOTTOM */}
            <div className='mt-5 md:mt-12.5 text-[#555] leading-[20px]'>
              description
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES - RIGHT SIDE */}
      <div className='flex-[2] bg-[#fcf5f3] h-full'>
        <div className='px-5 flex flex-col gap-5'>
          <p className='font-bold text-lg mt-5 mb-2.5 max-md:text-center'>General</p>

          {/* LIST VERTICAL */}
          <div className='flex flex-col gap-5 px-2.5 py-5 bg-white rounded-[10px]'>
            {/* FEATURE */}
            <div className='flex items-center gap-2.5'>
              <Image src="/utility.png" alt='' width={24} height={24} className='bg-[rgba(254,205,81,0.209)]' />
              {/* FEATURE TEXT */}
              <div>
                <span className='font-bold'>Utilities</span>
                <p className='text-sm'>utilities</p>
              </div>
            </div>

            {/* FEATURE */}
            <div className='flex items-center gap-2.5'>
              <Image src="/pet.png" alt='' width={24} height={24} className='bg-[rgba(254,205,81,0.209)]' />
              {/* FEATURE TEXT */}
              <div>
                <span className='font-bold'>Pet Policy</span>
                <p className='text-sm'>Pets: </p>
              </div>
            </div>

            {/* FEATURE */}
            <div className='flex items-center gap-2.5'>
              <Image src="/fee.png" alt='' width={24} height={24} className='bg-[rgba(254,205,81,0.209)]' />
              {/* FEATURE TEXT */}
              <div>
                <span className='font-bold'>Fees</span>
                <p className='text-sm'>income</p>
              </div>
            </div>
          </div>

          <p className='font-bold text-lg mb-2.5 max-md:text-center'>Sizes</p>
          {/* SIZES */}
          <div className='flex max-md:flex-col max-md:gap-5 max-md:bg-white max-md:py-3 justify-between'>
            {/* SIZE */}
            <div className='flex items-center gap-2.5 bg-white p-2.5 rounded-[5px]'>
              <Image src="/size.png" alt='' width={24} height={24} />
              <span className='font-bold'>sizes</span>
            </div>

            {/* SIZE */}
            <div className='flex items-center gap-2.5 bg-white p-2.5 rounded-[5px]'>
              <Image src="/bed.png" alt='' width={24} height={24} />
              <span className='font-bold'>bedrooms</span>
            </div>

            {/* SIZE */}
            <div className='flex items-center gap-2.5 bg-white p-2.5 rounded-[5px]'>
              <Image src="/bath.png" alt='' width={24} height={24} />
              <span className='font-bold'>bathroom</span>
            </div>
          </div>

          <p className='font-bold text-lg mb-2.5 max-md:text-center'>Nerby Places</p>
          {/* LIST HORIZONTAL */}
          <div className='flex max-md:flex-col max-md:gap-5 justify-between px-2.5 py-5 bg-white rounded-[10px]'>
            {/* FEATURE */}
            <div className='flex items-center gap-2.5'>
              <Image src="/school.png" alt='' width={24} height={24} />
              <div>
                <span className='font-bold'>School</span>
                <p className='text-sm'>school</p>
              </div>
            </div>

            {/* FEATURE */}
            <div className='flex items-center gap-2.5'>
              <Image src="/bus.png" alt='' width={24} height={24} />
              <div>
                <span className='font-bold'>Bus Stop</span>
                <p className='text-sm'>bus</p>
              </div>
            </div>

            {/* FEATURE */}
            <div className='flex items-center gap-2.5'>
              <Image src="/restaurant.png" alt='' width={24} height={24} />
              <div>
                <span className='font-bold'>Restaurant</span>
                <p className='text-sm'>restaurant</p>
              </div>
            </div>
          </div>

          <p className="font-bold text-lg md:mb-2.5 max-md:text-center">Location</p>
          {/* MAP CONTAINER */}
          <div className='w-full z-[1]'>
            <Map />
          </div>

          {/* BUTTONS */}
          <div className='flex items-center justify-between mb-3'>
         
              <button className='p-2 max-md:text-xs md:p-5 flex items-center gap-1.25 bg-white border border-[#fece51] rounded-[5px] hover:bg-yellow-100 duration-200 cursor-pointer'>
                <Image src="/chat.png" alt='' width={16} height={16} />
                Send a Message
              </button>
        

            <button className={`p-2 max-md:text-xs md:p-5 flex items-center gap-1.25  border border-[#76f36a] rounded-[5px] hover:bg-green-100 duration-200 cursor-pointer`}>
              <Image src="/save.png" alt='' width={16} height={16} />
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default SinglePage


