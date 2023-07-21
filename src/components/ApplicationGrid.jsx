import React from 'react'
import application_name_icon from './application_name_icon.svg'
import application_options_icon from './application_options_icon.svg'
import calendar_icon from './calendar.svg'
import copy_icon from './copy_icon.svg'
import databases_icon from './databases_icon.svg'
import endpoints_icon from './endpoints_icon.svg'
import key_icon from './key_icon.svg'
export default function ApplicationGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      <BoxWrapper></BoxWrapper>
      <BoxWrapper></BoxWrapper>
      <BoxWrapper></BoxWrapper>
      <BoxWrapper></BoxWrapper>
      <BoxWrapper></BoxWrapper>
      <BoxWrapper></BoxWrapper>
      <BoxWrapper></BoxWrapper>
      <BoxWrapper></BoxWrapper>
      <BoxWrapper></BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="flex-col items-start px-3 py-4 bg-white h-60 p-[0.75rem 1rem] rounded-md shadow-md">
      <div className="flex justify-between items-center h-1/6 border-b-2 mb-3 pb-4">
        <div className='text-black font-bold text-xl'>Sammy Alz App</div>
        <div>
          <img src={application_name_icon}
            alt='application name icon' />
        </div>
      </div>
      <div className="flex flex-col items-start h-4/6 space-y-4">
        <div className='flex gap-2 mt-3 items-center'>
          <div>
            <img src={databases_icon} alt='databases icon' />
          </div>
          <span className='text-base font-normal'>Database: </span>
          <span className='text-base font-bold'>4</span>
        </div>
        <div className='flex gap-2 items-center'>
          <div>
            <img src={endpoints_icon} alt='endpoint icon' />
          </div>
          <span className='text-base font-normal'>Endpoints: </span>
          <span className='text-base font-bold'>16</span>
        </div>
        <div className='flex gap-2 items-center'>
          <div>
            <img src={key_icon} alt='key icon' />
          </div>
          <span className='text-base font-normal'>API Key: </span>
          <span className='text-base font-bold'>1234</span>
          <div>
            <img src={copy_icon} alt='copy icon' />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center h-1/6">
        <div className='flex justify-between items-start gap-1'>
          <div>
            <img src={calendar_icon}
              alt='calendar icon' />
          </div>
          <div className='text-black font-normal text-sm'>
            12/07/2023
          </div>
        </div>
        <div className='bg-gray-200'>
          <img src={application_options_icon}
            alt='application options icon' />
        </div>
      </div>
    </div>
  )
}