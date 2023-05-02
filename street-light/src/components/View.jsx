import React, { useState } from 'react';
import Sidebar from './Sidebar';
import LocationView from './LocationView';
import GroupView from './GroupView'

const View = () => {
    const [activeLocationView, setActiveLocationView] = useState(false);

    return (
        <div className='flex'>
            <div className="w-56 flex-none">
                <Sidebar changeBar={(x) => setActiveLocationView(x)}/>
            </div>
            <div className='m-4 flex-1'>
            {
                activeLocationView ?
                <LocationView /> : <GroupView />
            }
            </div>
        </div>
    );
}

export default View;
