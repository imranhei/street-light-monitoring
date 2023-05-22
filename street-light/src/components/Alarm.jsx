// import React, { useState } from 'react'
// import AlarmModal from './AlarmModal'

// export default function Alarm() {
//   const [alarms, setAlarms] = useState([{
//     message: "Faulty Light: There is a light in pole ID: p-012, which is fused. Need to repair as soon as possible.",
//     group: "g-1",
//     time: "20/05/2023 16:23:45",
//     status: "In Progress",
//     },
//     {
//     message: "Faulty Light",
//     group: "g-2",
//     time: "24/05/2023 18:13:45",
//     status: "Solved",
//     }
//   ])
//   const [modalMsg, setModalMsg] = useState();
//   const [openModal, setOpenModal] = useState(false)

//   const handleStatusChange = (index, status) => {
//     setAlarms(alarms.map((row, idx )=> {
//       if (idx === index) {
//         return { ...row, status };
//       }
//       return row;
//     }));
//   };
//   const handleView = msg => {
//     setModalMsg(msg);
//     setOpenModal(!openModal)
//   }
//   const handleDelete = time => {
//     console.log(time)
//   }
  
//   return (
//     <>
//       <div className='mt-12 mx-4 md:w-auto w-[768px] text-sm'>
//         <h1 className='text-center font-extrabold text-3xl py-8'>ALARMS</h1>
//         <div className="flex py-1 text-center text-white bg-indigo-950  text-sm md:text-base">
//           <h1 className="w-1/3">Message</h1>
//           <h1 className="w-1/6">Group ID</h1>
//           <h1 className="w-1/6">Time</h1>
//           <h1 className="w-1/6">Status</h1>
//           <h1 className="w-1/6">Delete</h1>
//         </div>
//         <div className="border-x break-word">
//           {
//             alarms.map((a, index) => (
              
//               <div key={a.time} className="border-b flex py-1 text-center">
//                 <div className="flex gap-1 w-1/3 px-1">
//                   <button onClick={() => handleView(a.message)} className='bg-gray-100 hover:bg-gray-200 border rounded-sm px-2 h-fit'>View</button>
//                   <h1 className="text-left px-1">{a.message.slice(0, 50)} ...</h1>
//                 </div>
                
//                 <h1 className="w-1/6 px-1">{a.group}</h1>
//                 <h1 className="w-1/6 px-1">{a.time}</h1>
//                 <div className="flex w-1/6 justify-center px-1">
//                   <select className="outline-none" value={a.status} onChange={e => handleStatusChange(index, e.target.value)}>
//                     <option value="Pending">Pending</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Solved">Solved</option>
//                   </select>
//                 </div>
//                 <svg onClick={() => handleDelete(a.time)} className='m-auto hover:text-red-500' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg>
//               </div>
//             ))
//           }
//         </div>
//       </div>
//       {openModal && <div className="absolute top-0 left-0 w-full min-h-screen flex justify-center items-center bg-black bg-opacity-75">
//           <AlarmModal msg={modalMsg} close={() => setOpenModal(!openModal)}/>
//       </div>}
//     </>
//   )
// }


import React, { useEffect, useState } from 'react';

const Alarm = () => {
  const [editData, setEditData] = useState(null)
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('http://ventia.atpldhaka.com/api/alarms');
      const jsonData = await response.json();
      setData(jsonData.data.reverse())
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleEdit = async (id) => {
    const item = data.find((item) => item.id === id);

    setEditData(item);
  };

  const handleSaveComment = (editedData) => {
    fetch(`http://ventia.atpldhaka.com/api/alarms/${editData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comments: editData.comments,
        status: editData.status
      })
    })
      .then(response => {
        if(response.ok){
          fetchData();
        }
      })
      .catch(error => {
        console.error('Error:', error);
    });
    setEditData(null);
  };

  const handleCancelEdit = () => {
    setEditData(null);
  };

  const handleDelete = (id) => {
    console.log(id)
    fetch(`http://ventia.atpldhaka.com/api/alarms/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        fetchData();
      } else {
        console.error('Error deleting alarm');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="mt-12 m-4">
      <h1 className='text-center font-extrabold text-3xl py-8'>ALARMS</h1>
      <div className="flex border mb-2 bg-indigo-950 text-white font-semibold text-center">
        <div className="w-12 p-2">Serial</div>
        <div className="w-1/6 p-2">Message</div>
        <div className="w-1/6 p-2">Comment</div>
        <div className="w-1/6 p-2">Area Info</div>
        <div className="w-1/6 p-2">Time</div>
        <div className="w-1/6 p-2">Status</div>
        <div className="w-1/6 p-2">Action</div>
      </div>
      {data && data.map((item, index) => (
        <div key={item.id} className="flex border mb-1 text-center bg-white shadow">
          <div className="w-12 p-2">{index+1}</div>
          <div className="w-1/6 p-2 text-left">{item.message}</div>
          <div className="w-1/6 p-2 text-left">{item.comments}</div>
          <div className="w-1/6 p-2">{item.area_info}</div>
          <div className="w-1/6 p-2">{item.timestamps}</div>
          <div className="w-1/6 p-2">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</div>
          <div className="w-1/6 p-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 mr-2 rounded"
              onClick={() => handleEdit(item.id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))} 

      {editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 w-2/3 rounded">
            <h2 className="text-xl font-bold mb-2">Edit Data</h2>
            <p>Message: {editData.message}</p>
            <div className="mb-2">
              <label className="block">Comment:</label>
              <textarea
                className="border rounded w-full h-20 p-2 max-h-80 outline-none"
                value={editData.comments}
                onChange={(e) => setEditData({ ...editData, comments: e.target.value })}
              ></textarea>
            </div>
            <div className="px-1 flex">
              <p>Status: </p>
              <select className="outline-none border ml-2 rounded" defaultValue={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Solved">Solved</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 mr-2 rounded"
                    onClick={() => handleSaveComment(editData)}
                  >
                    Save
              </button>
              <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
                    onClick={handleCancelEdit}
              >
                    Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alarm;
