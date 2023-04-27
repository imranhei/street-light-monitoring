import React, { useState } from 'react';
import Sidebar from './Sidebar';

const View = () => {
    const status_op = [
        "ON", "OFF", "Faulty ON", "Faulty OFF", "Unknown"
    ]
    const [status, setStatus] = useState('')
    const [openOption, setOpenOption] = useState(false)
    const [openStatus, setOpenStatus] = useState(false)

    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex text-center mt-16 text-sm md:text-base py-1 w-full'>
                <h1 className='w-1/6'>Pole ID</h1>
                <h1 className='w-1/6'>Zip Code</h1>
                <h1 className='w-1/6'>Suburb</h1>
                <h1 className='w-1/6'>Street</h1>
                <h1 className='w-1/6'>Light Status</h1>
                <h1 className='w-1/6'>Select</h1>
            </div>
            
        </div>
    );
}

export default View;
