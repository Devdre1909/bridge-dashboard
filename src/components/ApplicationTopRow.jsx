import React from 'react'
import DarkButton from './Buttons'

export default function TopRow() {
  return (
    <div className='bg-[#F2F2F3] h-16 flex justify-between items-center border-gray-200 pt-3 pb-3'>
      <div className='text-black font-bold text-xl ml-5'>My Applications</div>
      <DarkButton variable={'Add Application'}/>
    </div>
  )
}
