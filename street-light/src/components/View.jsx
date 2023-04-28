import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ListView from './ListView';

const View = () => {
    const status_op = [
        "ON", "OFF", "Faulty ON", "Faulty OFF", "Unknown"
    ]
    const [status, setStatus] = useState('')
    const [openOption, setOpenOption] = useState(false)
    const [openStatus, setOpenStatus] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const handleGroupModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <div className='flex relative'>
            <div className="w-72">
                <Sidebar />
            </div>
            <div className='w-full p-4'>
                <ListView />    
                <button onClick={handleGroupModal} className='bg-blue-500 float-right mt-4 text-white px-4 rounded-sm py-1 hover:bg-blue-600'>Add To a Group</button>
            </div>
            {
                openModal ? 
                <>
                    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 z-30 flex justify-center items-center text:sm">
                        <div className="flex flex-col justify-center itens center rounded-sm p-10 bg-white">
                            <h1>Group Name</h1>
                            <div className="flex justify-between gap-2 items-center">
                                <input type="text" placeholder='Select a group name' className='outline-none border rounded-sm px-2'/>
                                <button className='bg-blue-500 float-right text-white px-7 rounded-sm hover:bg-blue-600'>ADD</button>
                            </div>
                            <h1 className='text-center py-2'>Or</h1>
                            <div className="flex justify-between items-center">
                                <input type="text" placeholder='Select a group name' className='outline-none border rounded-sm px-2'/>
                                <button className='bg-blue-500 float-right text-white px-4 rounded-sm hover:bg-blue-600 outline-none'>CREATE</button>
                            </div>
                            <button onClick={() => setOpenModal(!openModal)} className="bg-red-400 text-white w-20 rounded-sm mt-4 hover:bg-black m-auto">Close</button>
                        </div>
                    </div>
                </> :
                <></>
            }
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
