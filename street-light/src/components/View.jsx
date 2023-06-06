import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Graph from './Graph';
import ImagesTable from './ImagesTable';
import 'react-toastify/dist/ReactToastify.css';

// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

// const View = ( { google }) => {
const View = () => {
    // const [activeLocationView, setActiveLocationView] = useState(false);
    const [view, setView] = useState("chart");
    // const location = { lat: -35.06626405, lng: 148.0949818 };
    
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
                    <Graph /> : view === "location" ? <></> : view === "image" ? <ImagesTable name={'images'} get_url={'getImageData'} up_url={'image-upload'} type={'name'}/> : 
                    <ImagesTable name={'documents'} get_url={'getFileData'} up_url={'file'} type={'filename'}/>
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
