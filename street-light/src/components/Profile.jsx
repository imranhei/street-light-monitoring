import React, { useState }from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const data = [
        {
            Pole_ID: "p-012",
            state: "ACT",
            Zip_Code: 3121,
            Suburb: "Richmond",
            Street: "123 Main Street",
            Light_Status: "ON",
            group: ["g-01", "g-02"],
            On_Time: "18:00",
            Off_Time: "05:00",
        },
        {
            Pole_ID: "p-013",
            state: "ACT",
            Zip_Code: 3121,
            Suburb: "Richmond",
            Street: "123 Main Street",
            Light_Status: "Faulty ON",
            group: ["g-02"],
            On_Time: "18:00",
            Off_Time: "05:00",
        },
        {
            Pole_ID: "p-014",
            state: "ACT",
            Zip_Code: 3121,
            Suburb: "Richmond",
            Street: "123 Main Street",
            Light_Status: "Unknown",
            group: ["g-04", "g-05"],
            On_Time: "18:00",
            Off_Time: "05:00",
        }
    ]

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errors, setErrors] = useState([])
    const [ids, setIds] = useState([])
    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const handleSubmit = () => {

        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
            formData.append(`filename[${index}]`, file);
        });
        formData.append('id', 2);
        fetch('http://ventia.atpldhaka.com/api/file', {
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
        <>
            <div className='mt-16 m-4 overflow-x-auto'>
                <div className='flex text-center justify-around mt-12 py-1 w-full bg-indigo-950 text-white min-w-[1248px]'>
                    <h1 className='w-24'>Pole ID</h1>
                    <h1 className='w-32'>State</h1>
                    <h1 className='w-24'>Zip Code</h1>
                    <h1 className='w-48'>Suburb</h1>
                    <h1 className='w-64'>Street</h1>
                    <h1 className='w-20'>Light Status</h1>
                    <h1 className='w-28'>Group</h1>
                    <h1 className='w-20'>On Time</h1>
                    <h1 className='w-20'>OFF Time</h1>
                    <h1 className='w-32'>Update</h1>
                </div>
                <div className='border-x'>
                {
                    data.map((d, index) => (
                        <div key={d.Pole_ID} className='flex justify-around text-center border-b py-1 items-center'>
                            <input className='w-24 text-center' type='text' defaultValue={d.Pole_ID}/>
                            <input className='w-32 text-center' type='text' defaultValue={d.state}/>
                            <input className='w-24 text-center' type='text' defaultValue={d.Zip_Code}/>
                            <input className='w-48 text-center' type='text' defaultValue={d.Suburb}/>
                            <input className='w-64 text-center' type='text' defaultValue={d.Street}/>
                            <input className='w-20 text-center' type='text' defaultValue={d.Light_Status}/>
                            <input className='w-28 text-center' type='text' defaultValue={d.group}/>
                            <input className='w-20 text-center' type='text' defaultValue={d.On_Time}/>
                            <input className='w-20 text-center' type='text' defaultValue={d.Off_Time}/>
                            <div className='w-32 flex items-center'>
                                <button className='bg-blue-500 hover:bg-blue-600 rounded-sm px-4 mr-2 p-1 text-white'>Edit</button>
                                <button><svg className='text-red-400 hover:text-red-500 rounded-sm ' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg></button>
                            </div>
                        </div>
                    ))
                } 
                </div>
                <p className='text-4xl font-bold text-center my-6'>Documents</p>
            </div>
            <div className="p-4 bg-white rounded shadow w-96 border m-auto mb-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-center font-bold text-lg">Upload File</h1>
                    <div className="w-full h-32 flex items-center justify-center bg-blue-50 rounded-md border-2 border-teal-200 border-dashed">
                    <input type="file" hidden id="upload" multiple accept=".doc,.pdf,.docx,.zip," onChange={handleFileChange}/>
                    <label htmlFor="upload">
                        <svg className="m-auto" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
                            <path fill="rgb(38,166,154)" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5l5 5h-3z"/>
                        </svg>
                        <p className="mt-2">Click To Upload</p>
                    </label>
                    </div>
                </div>
                {selectedFiles.length > 0 &&
                <><div>
                    <h3 className="my-2">Uploaded Documents</h3>
                    <div className="max-h-32 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                        <div key={index}>
                            <div className="flex px-2 py-1 justify-between border shadow my-1 rounded items-center">
                                <div className="flex items-center w-72">
                                    <p className="font-medium bg-teal-400 px-1 py-0.5 rounded-sm text-white text-center mr-2 w-10">{file.name.split(".").pop()}</p>
                                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">{file.name}</p>
                                </div>
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
                    <button onClick={handleSubmit} className='mt-3 bg-teal-400 px-6 py-1 rounded border  text-white font-medium hover:bg-transparent hover:border-teal-400 hover:text-teal-400'>Submit</button>
                </div></>}
            </div>
            <ToastContainer />
        </>
    );
}

export default Profile;
