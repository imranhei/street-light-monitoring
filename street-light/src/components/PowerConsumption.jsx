import React from 'react'

export default function PowerConsumption() {
    const powers = [
        { day: 'Sun', value: 486 },
        { day: 'Mon', value: 356 },
        { day: 'Tue', value: 244 },
        { day: 'Wed', value: 384 },
        { day: 'Thu', value: 263 },
        { day: 'Fri', value: 327 },
        { day: 'Sat', value: 187 }
    ];

  return (
    <div className='bg-white p-4 rounded-sm shadow-lg flex flex-col gap-2 items-center justify-center m-2 h-96 relative'>
      <div className="flex font-bold absolute top-10">
        <h1 className='mr-10 cursor-pointer hover:text-rose-400'>&lt;</h1>
        <h1 className="">April 16 - April 22</h1>
        <h1 className='ml-10 cursor-pointer hover:text-rose-400'>&gt;</h1>
      </div>
      <div className="flex items-center justify-center w-full">
        <h1 className='absolute -rotate-90 left-0'>Power Consumption (kWh)</h1>
        <div className="flex flex-col gap-5 w-4/5 ml-10 text-stone-400 pt-2">
            <div className='flex items-center'><h1 className='w-16'>400</h1><div className='border-b-2 border-dotted w-full'></div></div>
            <div className='flex items-center'><h1 className='w-16'>300</h1><div className='border-b-2 border-dotted w-full'></div></div>
            <div className='flex items-center'><h1 className='w-16'>200</h1><div className='border-b-2 border-dotted w-full'></div></div>
            <div className='flex items-center'><h1 className='w-16'>100</h1><div className='border-b-2 border-dotted w-full'></div></div>
            <div className='flex items-center'><h1 className='w-16'>0</h1><div className='border-b-2 border-dotted w-full'></div></div>
        </div>
        <div className="flex absolute bottom-16 justify-between w-4/5 pl-24 text-stone-400 items-end">
            {
                powers.map((power) => (
                    <div className='flex flex-col items-center' key={power.day}>
                        <h1 className='text-pink-400'>{power.value}</h1>
                        <div className={`rounded-full h-[${Math.floor(power.value / 2)}px] w-2 bg-rose-400 mb-3`}></div>
                        <h1>{power.day}</h1>
                    </div>
                ))
            }
            <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  )
}
