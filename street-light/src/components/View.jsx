import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Graph from './Graph';
import ImagesTable from './ImagesTable';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const View = () => {
    const [view, setView] = useState("chart");
    const deviceGid = useSelector((state) => state.graph.deviceGid)
    const channel = useSelector((state) => state.graph.channel)
    const [lon, setLon] = useState();
    const [lat, setLat] = useState();

    useEffect(() => {
        if(deviceGid){
            fetch('http://ventia.atpldhaka.com/api/callLocationPropertiesApi', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    deviceGid: deviceGid
                })
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        setLon(data.latitudeLongitude?.longitude)
                        setLat(data.latitudeLongitude?.latitude)
                    })
                }
            })
            .catch(error => {
                // Handle network or other error
            });
            }
    }, [deviceGid])
    
    return (
        <div className='flex relative'>
            <div className="w-56 flex-none fixed left-0 h-full overflow-y-auto overflow-x-hidden">
                <Sidebar/>
            </div>
            <div className='m-4 flex-1 ml-56 pt-12 overflow-y-auto'>
                <div className="flex bg-indigo-950 text-white text-lg relative font-semibold rounded justify-center items-center">
                    <div onClick={() => setView("chart")} className={`flex-1 text-center rounded leading-10 cursor-pointer z-10 ${view === 'chart' ? 'bg-teal-400' : ''}`}>Graph</div>
                    <div onClick={() => setView("location")} className={`flex-1 text-center rounded leading-10 cursor-pointer z-10 ${view === 'location' ? 'bg-teal-400' : ''}`}>Location</div>
                    <div onClick={() => setView("image")} className={`flex-1 text-center rounded leading-10 cursor-pointer z-10 ${view === 'image' ? 'bg-teal-400' : ''}`}>Images</div>
                    <div onClick={() => setView("document")} className={`flex-1 text-center rounded leading-10 cursor-pointer z-10 ${view === 'document' ? 'bg-teal-400' : ''}`}>Documents</div>
                </div>
                <div>
                {
                    view === "chart" ? 
                    <Graph /> : view === "location" ?
                    <>
                        <div className="bg-indigo-950 w-full py-1 mt-4 rounded text-white text-center font-medium">
                            <p>Device : {deviceGid}</p>
                            <p>Channel: {channel}</p>
                        </div>
                        <iframe src={`https://maps.google.com/maps?q=${lat}, ${lon}&z=15&output=embed`} className='w-full h-[400px] mt-8'></iframe>
                    </>
                    : view === "image" ? <ImagesTable name={'images'} get_url={'getImageData'} up_url={'image-upload'} type={'name'}/> : 
                    <ImagesTable name={'documents'} get_url={'getFileData'} up_url={'file'} type={'filename'}/>
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
