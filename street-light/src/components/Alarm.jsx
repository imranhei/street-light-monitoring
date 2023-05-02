import React, { useState } from 'react'
import AlarmModal from './AlarmModal'

export default function Alarm() {
  const [alarms, setAlarms] = useState([{
    message: "Faulty Light: There is a light in pole ID: p-012, which is fused. Need to repair as soon as possible.",
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
  const [modalMsg, setModalMsg] = useState();
  const [openModal, setOpenModal] = useState(false)

  const handleStatusChange = (index, status) => {
    setAlarms(alarms.map((row, idx )=> {
      if (idx === index) {
        return { ...row, status };
      }
      return row;
    }));
  };
  const handleView = msg => {
    setModalMsg(msg);
    setOpenModal(!openModal)
  }
  const handleDelete = time => {
    console.log(time)
  }
  
  return (
    <>
      <div className='mt-12 mx-4 md:w-auto w-[768px] text-sm'>
        <h1 className='text-center font-extrabold text-3xl py-8'>ALARMS</h1>
        <div className="flex py-1 text-center text-white bg-indigo-950  text-sm md:text-base">
          <h1 className="w-1/3">Message</h1>
          <h1 className="w-1/6">Group ID</h1>
          <h1 className="w-1/6">Time</h1>
          <h1 className="w-1/6">Status</h1>
          <h1 className="w-1/6">Delete</h1>
        </div>
        <div className="border-x break-word">
          {
            alarms.map((a, index) => (
              
              <div key={a.time} className="border-b flex py-1 text-center">
                <div className="flex gap-1 w-1/3 px-1">
                  <button onClick={() => handleView(a.message)} className='bg-gray-100 hover:bg-gray-200 border rounded-sm px-2 h-fit'>View</button>
                  <h1 className="text-left px-1">{a.message.slice(0, 50)} ...</h1>
                </div>
                
                <h1 className="w-1/6 px-1">{a.group}</h1>
                <h1 className="w-1/6 px-1">{a.time}</h1>
                <div className="flex w-1/6 justify-center px-1">
                  <select className="outline-none" value={a.status} onChange={e => handleStatusChange(index, e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Solved">Solved</option>
                  </select>
                </div>
                <svg onClick={() => handleDelete(a.time)} className='m-auto hover:text-red-500' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg>
              </div>
            ))
          }
        </div>
      </div>
      {openModal && <div className="absolute top-0 left-0 w-full min-h-screen flex justify-center items-center bg-black bg-opacity-75">
          <AlarmModal msg={modalMsg} close={() => setOpenModal(!openModal)}/>
      </div>}
    </>
  )
}
