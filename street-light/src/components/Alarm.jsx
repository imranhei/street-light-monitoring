import React, { useState } from 'react'

export default function Alarm() {
  const [alarms, setAlarms] = useState([{
    message: "Faulty Light",
    group: "g-1",
    time: "20/05/2023 16:23:45",
    status: "In Progress",
    },
    {
    message: "Faulty Light",
    group: "g-2",
    time: "24/05/2023 18:13:45",
    status: "Solved",
    }
  ])
  const [open, setOpen] = useState(false)

  const handleStatusChange = (index, status) => {
    setAlarms(alarms.map((row, idx )=> {
      if (idx === index) {
        return { ...row, status };
      }
      return row;
    }));
  };

  return (
    <div className='mt-12  mx-4 md:w-auto w-[768px]'>
      <h1 className='text-center font-extrabold text-3xl py-8'>ALARMS</h1>
      <div className="flex py-1 text-center text-white bg-indigo-950  text-sm md:text-base">
        <h1 className="w-1/3">Message</h1>
        <h1 className="w-1/6">Group ID</h1>
        <h1 className="w-1/6">Time</h1>
        <h1 className="w-1/6">Status</h1>
        <h1 className="w-1/6">Delete</h1>
      </div>
      <div className="border-x text-sm md:text-base break-word">
        {
          alarms.map((a, index) => (
            
            <div key={a.time} className="border-b flex py-1 text-center">
              <h1 className="w-1/3 text-left px-1">{a.message}</h1>
              <h1 className="w-1/6 px-1">{a.group}</h1>
              <h1 className="w-1/6 px-1">{a.time}</h1>
              <div className="flex w-1/6 justify-center px-1">
                <select className="outline-none" value={a.status} onChange={e => handleStatusChange(index, e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Solved">Solved</option>
                </select>
              </div>
              <svg className='m-auto hover:text-red-500' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg>
            </div>
          ))
        }
      </div>
    </div>
  )
}
