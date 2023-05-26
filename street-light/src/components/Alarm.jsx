import React, { useEffect, useState } from 'react';

const Alarm = () => {
  const [editData, setEditData] = useState(null)
  const [data, setData] = useState();
  const [statusOption, setStatusOption] = useState(false)

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('http://ventia.atpldhaka.com/api/alarms');
      const jsonData = await response.json();
      setData(jsonData.data)
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleEdit = async (id) => {
    const item = data.find((item) => item.id === id);

    setEditData(item);
  };

  const handleSaveComment = (editData) => {
    setStatusOption(false)
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
    setStatusOption(false)
    setEditData(null);
  };

  const handleDelete = (id) => {
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
      <div className='overflow-x-scroll'>
        <div className="flex justify-between border mb-2 bg-indigo-950 text-white font-semibold text-center min-w-[1168px]">
          <div className="w-12 p-1 py-2">Serial</div>
          <div className="w-64 p-1 py-2">Message</div>
          <div className="w-64 p-1 py-2">Comment</div>
          <div className="w-60 p-1 py-2">Area Info</div>
          <div className="w-36 p-1 py-2">Time</div>
          <div className="w-24 p-1 py-2">Status</div>
          <div className="w-32 p-1 py-2">Action</div>
        </div>
        {data && data.map((item, index) => (
          <div key={item.id} className="flex justify-between border mb-1 text-center bg-white shadow items-center min-w-[1168px]">
            <div className="w-12 p-1">{index+1}</div>
            <div className="w-64 p-1 text-left">{item.message}</div>
            <div className="w-64 p-1 text-left">{item.comments}</div>
            <div className="w-60 p-1">{item.area_info}</div>
            <div className="w-36 p-1">{item.timestamps}</div>
            <div className="w-24 p-1">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</div>
            <div className="w-32 p-1">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mr-2 rounded"
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}  
      </div> 

      {editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 w-2/3 rounded">
            <h2 className="text-xl font-bold mb-2">Edit Data</h2>
            <p>Message: {editData.message}</p>
            <div className="mb-2">
              <label className="block mb-2">Comment:</label>
              <textarea
                className="border rounded w-full h-20 p-2 max-h-80 outline-none"
                value={editData.comments === null ? '' : editData.comments}
                onChange={(e) => setEditData({ ...editData, comments: e.target.value })}
              ></textarea>
            </div>
            <div className="px-1 flex items-center relative">
              <p>Status:</p>
              <div onClick={() => setStatusOption(!statusOption)}  className='flex ml-2 items-center border pl-2 rounded cursor-pointer shadow-sm'>
                <p className='w-20'>{editData.status.charAt(0).toUpperCase() + editData.status.slice(1)}</p>
                <svg className='rotate-180' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m7 14l5-5l5 5H7Z"/></svg>  
              </div>
              <ul className={`absolute left-14 top-7 bg-white border rounded-sm shadow cursor-pointer ${statusOption ? '' : 'hidden'}`}>
                <li onClick={() => setEditData({ ...editData, status: 'Pending'})} className={`hover:bg-blue-500 hover:text-white px-5`}>Pending</li>
                <li onClick={() => setEditData({ ...editData, status: 'In progress'})} className={`hover:bg-blue-500 hover:text-white px-5`}>In progress</li>
                <li onClick={() => setEditData({ ...editData, status: 'Solved'})} className={`hover:bg-blue-500 hover:text-white px-5`}>Solved</li>
              </ul>
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