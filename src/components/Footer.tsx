import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex items-center justify-center mt-10 py-8 md:py-10 text-sm bg-red-50'>
        <div className='flex items-center gap-2'>
            <Image src="/logo.png" alt='Logo' width={28} height={28} />
            &copy;PGEstate | All Rights Reserved 2025
        </div>
    </div>
  )
}

export default Footer
