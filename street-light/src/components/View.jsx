import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Graph from './Graph';
import ImagesTable from './ImagesTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

// const View = ( { google }) => {
const View = () => {
    // const [activeLocationView, setActiveLocationView] = useState(false);
    const [view, setView] = useState("chart");
    // const location = { lat: -35.06626405, lng: 148.0949818 };

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
        <div className='flex relative'>
            <div className="w-56 flex-none fixed left-0 h-full overflow-y-auto overflow-x-hidden">
                <Sidebar/>
            </div>
            <div className='m-4 flex-1 ml-56 pt-12 overflow-y-auto'>
                <div className="flex bg-indigo-950 text-white text-lg relative font-semibold rounded justify-center items-center">
                    {/* <div className="w-1/3 absolute text-center border-x h-8 bg-transparent"></div> */}
                    <div onClick={() => setView("chart")} className={`flex-1 text-center rounded leading-10 cursor-pointer z-10 ${view === 'chart' ? 'bg-teal-400' : ''}`}>Graph</div>
                    <div onClick={() => setView("location")} className={`flex-1 text-center rounded leading-10 cursor-pointer z-10 ${view === 'location' ? 'bg-teal-400' : ''}`}>Location</div>
                    <div onClick={() => setView("image")} className={`flex-1 text-center rounded leading-10 cursor-pointer z-10 ${view === 'image' ? 'bg-teal-400' : ''}`}>Images</div>
                    <div onClick={() => setView("document")} className={`flex-1 text-center rounded leading-10 cursor-pointer z-10 ${view === 'document' ? 'bg-teal-400' : ''}`}>Documents</div>
                </div>
                <div>
                {
                    view === "chart" ? 
                    // <LocationView /> : 
                    <Graph /> : view === "location" ? <></> : view === "image" ? <ImagesTable /> : 
                    <>
                        <p className='text-4xl font-bold text-center my-6'>Documents</p>
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
                    // <Map google={google} zoom={14} initialCenter={location} style={{ height: 500, width: 500 }}>
                    //     <Marker position={location} />
                    // </Map>
                    
                }
                </div>
            </div>
        </div>
    );
}

// export default GoogleApiWrapper({
//     apiKey: process.env.GOOGLE_MAPS_API_KEYS // Replace with your own API key
//   })(View);
export default View;
