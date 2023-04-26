import React from 'react'

export default function TotalLights() {
  return (
    <div className='w-full sm:w-7/12 bg-pink-400 p-4 rounded-sm shadow-lg flex flex-col gap-5 items-center justify-center m-2 h-56'>
      <h1 className='text-white font-bold text-2xl text-center'>Total Number of Lights: 1000</h1>
      <svg className='text-white' xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7M9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9v1Z"/></svg>
    </div>
  )
}
