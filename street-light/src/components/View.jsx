import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Graph from './Graph';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

// const View = ( { google }) => {
const View = () => {
    // const [activeLocationView, setActiveLocationView] = useState(false);
    const [view, setView] = useState("chart");
    // const location = { lat: -35.06626405, lng: 148.0949818 };

    return (
        <div className='flex'>
            <div className="w-56 flex-none fixed left-0 h-full overflow-y-auto overflow-x-hidden">
                <Sidebar/>
            </div>
            <div className='m-4 flex-1 ml-56 pt-12 overflow-y-auto'>
                <div className="flex bg-indigo-950 text-white text-lg relative font-semibold rounded justify-center items-center">
                    <div className="absolute text-center border h-8"></div>
                    <div onClick={() => setView("chart")} className={`flex-1 text-center rounded leading-10 cursor-pointer ${view === 'chart' ? 'bg-teal-400' : ''}`}>Graph</div>
                    <div onClick={() => setView("location")} className={`flex-1 text-center rounded leading-10 cursor-pointer ${view === 'location' ? 'bg-teal-400' : ''}`}>Location</div>
                </div>
            {
                view === "chart" ? 
                // <LocationView /> : 
 
                <Graph /> :
                // <Map google={google} zoom={14} initialCenter={location} style={{ height: 500, width: 500 }}>
                //     <Marker position={location} />
                // </Map>
                <></>
            }
            </div>
        </div>
    );
}

// export default GoogleApiWrapper({
//     apiKey: process.env.GOOGLE_MAPS_API_KEYS // Replace with your own API key
//   })(View);
export default View;
