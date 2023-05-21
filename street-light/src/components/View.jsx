import React, { useState } from 'react';
import Sidebar from './Sidebar';
import LocationView from './LocationView';
// import GroupView from './GroupView'
import Graph from './Graph';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

// const View = ( { google }) => {
const View = () => {
    const [activeLocationView, setActiveLocationView] = useState(false);
    // const location = { lat: -35.06626405, lng: 148.0949818 };

    return (
        <div className='flex'>
            <div className="w-56 flex-none fixed left-0 h-full overflow-y-auto">
                <Sidebar changeBar={(x) => setActiveLocationView(x)}/>
            </div>
            <div className='m-4 flex-1 ml-56'>
            {
                activeLocationView ?
                <LocationView /> : 
                //<GroupView />
                <Graph />
            }
            {/* <Map google={google} zoom={14} initialCenter={location} style={{ height: 500, width: 500 }}>
                <Marker position={location} />
            </Map> */}
            </div>
        </div>
    );
}

// export default GoogleApiWrapper({
//     apiKey: process.env.GOOGLE_MAPS_API_KEYS // Replace with your own API key
//   })(View);
export default View;
