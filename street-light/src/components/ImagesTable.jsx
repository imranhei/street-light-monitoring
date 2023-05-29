import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const ImagesTable = () => {

    const [data, setData] = useState();
    const [modal, setModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errors, setErrors] = useState([])
    const [ids, setIds] = useState([])
    const [picture, setPicture] = useState()
    const [onClose, setOnClose] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteData, setDeleteData] = useState([]);
    const modalRef = useRef(null);
    let serial = 1;

    const channel = useSelector((state) => state.graph.channel)
    const deviceGid = useSelector((state) => state.graph.deviceGid)
    const user_id = useSelector(state => state.login.value.id);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
    console.log("Hello")
  }, [deviceGid])

  // eslint-disable-next-line
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOnClose(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    
  }, [handleClickOutside]);

  const fetchData = async () => {
    try {
        const response = await fetch('http://ventia.atpldhaka.com/api/getImageData');
        const jsonData = await response.json();
        const filterData = jsonData.filter(item => Number(item.deviceGid) === Number(deviceGid));
        setData(filterData)
    } catch (error) {
      console.log('Error fetching data:', error);
    }};

  const handleView = pic => {
    setPicture(pic)
    setOnClose(true);
  };

  const handleDelete = () => {
    fetch(`http://ventia.atpldhaka.com/api/images/${deleteData[0]}/${deleteData[1]}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          toast(data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        fetchData();
        setIsLoading(false)
      } else {
        console.error('Error deleting alarm');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles([...selectedFiles, ...files]);
    };
    const handleTime = (time) => {
      const uploadedTimestamp = new Date(time)
      const seconds = Math.floor((Date.now() - uploadedTimestamp) / 1000);
      const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
      ];

      for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count > 0) {
          return `${count} ${interval.label}${count === 1 ? '' : 's'} ago`;
        }
      }

      return 'Just now';
    }

    const handleUpload = () => {
        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
            formData.append(`imageFile[${index}]`, file);
        });
        formData.append('id', user_id);
        formData.append('deviceGid', deviceGid);
        formData.append('channelNum', channel);
        fetch('http://ventia.atpldhaka.com/api/image-upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if(response.ok){
            response.json().then(data => {
                toast(data.success, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            })
            setSelectedFiles([])
            setModal(false)
            fetchData();
        }
        else{response.json().then(data => {
            setIds(Object.keys(data.errors))
            setErrors(data.errors)
        })}
        })
      .catch(error => {
        console.log(error)
      });
    }

  return (
    <div>
      <h1 className='text-center font-extrabold text-3xl py-6'>Images</h1>
      <button onClick={() => setModal(true)} className='absolute right-4 top-32 bg-teal-400 px-6 py-1 rounded border text-white font-medium hover:bg-transparent hover:border-teal-400 hover:text-teal-400'>Upload</button>
      <div className='overflow-x-auto'>
        <div className="flex justify-between border mb-2 bg-indigo-950 text-white font-semibold text-center min-w-[752px]">
          <div className="w-12 p-1 py-2">Serial</div>
          <div className="w-60 p-1 py-2">Image</div>
          <div className="w-48 p-1 py-2">Uploaded by</div>
          <div className="w-36 p-1 py-2">Time</div>
          <div className="w-32 p-1 py-2">Action</div>
        </div>
        {data && data.map((item, index) => {
          return (
            JSON.parse(item.name).map((it, i) => {
              const currentSerial = serial;
              serial++;
              return(
                <div key={it} className="flex justify-between border mb-1 text-center bg-white shadow items-center min-w-[752px] py-0.5">
                    <div className="w-12 p-1">{currentSerial}</div>
                    <div className='flex items-center'>
                      <div className='h-12 w-12'><img className='h-full w-full object-cover' src={`http://${JSON.parse(item.image_path)[i].split('/').slice(4).join('/')}`} alt="preview" /></div>
                      <div className="w-52 p-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">{it.split('-').slice(1).join('-')}</div>
                    </div>
                    <div className="w-48 p-1 text-left">{item.user_name}</div>
                    <div className="w-36 p-1">{handleTime(item.created_at)}</div>
                    <div className="w-32 p-1">
                        <button
                            className=" hover:text-teal-500 text-teal-400 px-2"
                            onClick={() => handleView(JSON.parse(item.image_path)[i])}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"/></svg>
                        </button>
                        <button
                            className="text-red-400 hover:text-red-500 px-2"
                            onClick={() => {setIsLoading(true); setDeleteData([item.id, i])}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg>
                        </button>
                    </div>
                </div>
            )})
          
        )})}  
      </div>

      {modal && (
        <>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-20">
            <div className="p-4 bg-white rounded w-96 border">
                <div className="flex flex-col gap-4">
                    <h1 className="text-center font-bold text-lg">Upload File</h1>
                    <div className="w-full h-32 flex items-center justify-center bg-blue-50 rounded-md border-2 border-teal-200 border-dashed">
                        <input type="file" hidden id="upload" multiple accept=".jpg,.png,.jpeg,.," onChange={handleFileChange}/>
                        <label htmlFor="upload">
                            <svg className="m-auto" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
                                <path fill="rgb(38,166,154)" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5l5 5h-3z"/>
                            </svg>
                            <p className="mt-2">Click To Upload</p>
                        </label>
                    </div>
                </div>
                {selectedFiles.length < 1 && <div className="mt-3 flex justify-center">
                    <button onClick={() => setModal(false)} className="bg-red-500 hover:bg-transparent border-red-500 hover:text-red-500 text-white font-medium py-1 px-6 rounded border">Cancel</button>
                </div>}
                {selectedFiles.length > 0 &&
                <><div>
                    <h3 className="my-2">Uploaded Images</h3>
                    <div className="max-h-32 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                        <div key={index}>
                            <div className="flex px-2 py-1 justify-between border shadow my-1 rounded items-center">
                                <p className="w-72 overflow-hidden text-ellipsis whitespace-nowrap">{file.name}</p>
                                <p className="font-semibold text-red-400 cursor-pointer" onClick={() => {setSelectedFiles(selectedFiles.filter((_, i) => i !== index)); setIds([])}}>X</p>
                            </div>
                            {ids.map(id => (
                                id.split('.').pop() === `${index}` && <p key={Math.random()} className='text-xs text-red-400'>* {errors[id]}</p>
                            ))}
                        </div>
                    ))}
                    </div>
                </div>
                <div className='text-center'>
                    <div className='flex justify-center mt-3 gap-5'>
                        <button onClick={handleUpload} className='bg-teal-400 px-6 py-1 rounded border text-white font-medium hover:bg-transparent border-teal-400 hover:text-teal-400'>Upload</button>
                        <button onClick={() => setModal(false)} className="bg-red-500 hover:bg-transparent border-red-500 hover:text-red-500 text-white font-medium py-1 px-6 rounded border">Cancel</button>
                    </div>
                </div></>}
            </div>
        </div>
        </>
      )}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 text-center">
        <div className="bg-white rounded shadow p-10">
          <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
          <p className="mb-4">Are you sure you want to delete?</p>
          <div className="flex justify-center">
            <button className="mr-2 px-5 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-200" onClick={() => setIsLoading(false)}>
              Cancel
            </button>
            <button className={`px-4 py-1 ${isLoading ? 'bg-red-400' : 'bg-red-600'} text-white rounded hover:bg-red-500`} onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      )}
      {onClose && (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-10">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white rounded-lg shadow-lg" ref={modalRef}>
          <button className="absolute top-2 right-2 text-white hover:text-red-500" onClick={() => setOnClose(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img className="max-w-full max-h-screen" src={`http://${picture.split('/').slice(4).join('/')}`} alt="Preview" />
        </div>
      </div>)}
      <ToastContainer />
    </div>
  );
};

export default ImagesTable;