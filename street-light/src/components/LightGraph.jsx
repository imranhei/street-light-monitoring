import React from 'react'

export default function LightGraph() {
    const on = 6800;
    const off = 1500;
    const fOn = 70;
    const fOff = 80;
    const unknown = 20;


  return (
    <div className='lg:w-1/2 w-full bg-green-200 p-4 rounded-sm shadow-lg flex flex-col gap-2 items-center justify-center m-2 h-56'>
        <div className="flex gap-2">
            <div>

            </div>
            <div className="">
                <div className="flex gap-1 items-center py-1">
                    <div className="bg-green-400 h-4 w-4"></div>
                    <h1 className='cursor-pointer hover:text-rose-400'>ON ({on})</h1>
                </div>
                <div className="flex gap-1 items-center py-1">
                    <div className="bg-red-500 h-4 w-4"></div>
                    <h1 className='cursor-pointer hover:text-rose-400'>OFF ({off})</h1>
                </div>
                <div className="flex gap-1 items-center py-1">
                    <div className="bg-teal-400 h-4 w-4"></div>
                    <h1 className='cursor-pointer hover:text-rose-400'>Faulty ON ({fOn})</h1>
                </div>
                <div className="flex gap-1 items-center py-1">
                    <div className="bg-orange-400 h-4 w-4"></div>
                    <h1 className='cursor-pointer hover:text-rose-400'>Faulty OFF ({fOff})</h1>
                </div>
                <div className="flex gap-1 items-center py-1">
                    <div className="bg-black h-4 w-4"></div>
                    <h1 className='cursor-pointer hover:text-rose-400'>Unknown ({unknown})</h1>
                </div>
            </div>
        </div>
        <h1 className='font-bold'>Light Status</h1>
    </div>
  )
}
