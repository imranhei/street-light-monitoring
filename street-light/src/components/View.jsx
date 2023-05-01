import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ListView from './ListView';
import LocationView from './LocationView';
import GroupView from './GroupView'

const View = () => {
    const [activeLocationView, setActiveLocationView] = useState(false);
    const test = (x) => {
        console.log(x);
    }

    return (
        <div className='flex'>
            <div className="w-56">
                <Sidebar changeBar={(x) => setActiveLocationView(x)}/>
            </div>
            <div className='m-4 flex-1'>
            {
                activeLocationView ?
                <LocationView /> : <GroupView />
            }
            </div>
            
            {/* <div className='flex justify-around text-center mt-16 text-sm md:text-base py-1 w-full bg-indigo-950 h-fit mx-4 text-white'>
                <h1 className=''>Pole ID</h1>
                <h1 className=''>Zip Code</h1>
                <h1 className=''>Suburb</h1>
                <h1 className=''>Street</h1>
                <h1 className=''>Light Status</h1>
                <h1 className=''>Select</h1> 
            </div> */}
            
        </div>
    );
}

export default View;
