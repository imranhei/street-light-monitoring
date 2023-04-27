import React from 'react'

export default function AlarmDash() {
const alarms = [
    "13/04/2023 16:23:45",
    "15/04/2023 11:53:51",
    "18/04/2023 19:36:23"
]

  return (
    <div className='w-full sm:w-1/2 bg-teal-400 p-4 rounded-sm shadow-lg flex flex-col gap-2 items-center justify-center m-2 h-64 text-white'>
      <h1 className='text-white font-bold text-2xl text-center'>Alarm</h1>
      {
        alarms.map((alarm) => (
            <h1 key={alarm}>{alarm}</h1>
        ))
      }
    </div>
  )
}
