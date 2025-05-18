import React from 'react'

const Loading = () => {
  return (
    <div className='absolute top-[calc(50%-100px)] left-1/2 right-1/2'>
        <div className='flex flex-col items-center gap-2'>
            <div className='w-20 h-20 border-[8px] border-gray-300 border-t-[8px] border-t-blue-400 rounded-full animate-spin'></div>
            <p className='text-3xl font-semibold text-blue-500'>Loading...</p>
        </div>
    </div>
  )
}

export default Loading
