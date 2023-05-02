import React, { useState } from 'react';

const LocationView = () => {
    const data = [
        {
            Pole_ID: "p-012",
            Zip_Code: 3121,
            Suburb: "Richmond",
            Street: "123 Main Street",
            Light_Status: "ON"
        },
        {
            Pole_ID: "p-013",
            Zip_Code: 3121,
            Suburb: "Richmond",
            Street: "123 Main Street",
            Light_Status: "Faulty ON"
        },
        {
            Pole_ID: "p-014",
            Zip_Code: 3121,
            Suburb: "Richmond",
            Street: "123 Main Street",
            Light_Status: "Unknown"
        },
    ]
    const [selectedPoleIds, setSelectedPoleIds] = useState([]);
    const [openModal, setOpenModal] = useState(false)

    const handleCheckboxChange = async (event, poleId) => {
        const isChecked = event.target.checked;
        if (isChecked) {
          setSelectedPoleIds([...selectedPoleIds, poleId]);
        } else {
          setSelectedPoleIds(selectedPoleIds.filter(id => id !== poleId));
        }
      }
      
    return (
        <div>
            <div className="overflow-x-auto min-w-[600px]">
                <div className='flex text-center mt-12 text-sm md:text-base py-1 w-full bg-indigo-950 h-fit text-white'>
                    <h1 className='w-1/6'>Pole ID</h1>
                    <h1 className='w-1/6'>Zip Code</h1>
                    <h1 className='w-1/6'>Suburb</h1>
                    <h1 className='w-1/6'>Street</h1>
                    <h1 className='w-1/6'>Light Status</h1>
                    <h1 className='w-1/6'>Select</h1>
                </div>
                <div className="border-x">
                {
                    data.map(d => (
                        <div key={d.Pole_ID} className='flex justify-around text-center border-b py-1 items-center'>
                            <h1 className='w-1/6'>{d.Pole_ID}</h1>
                            <h1 className='w-1/6'>{d.Zip_Code}</h1>
                            <h1 className='w-1/6'>{d.Suburb}</h1>
                            <h1 className='w-1/6'>{d.Street}</h1>
                            <h1 className='w-1/6'>{d.Light_Status}</h1>
                            <input className='w-1/6 h-4' type="checkbox" onChange={(event) => handleCheckboxChange(event, d.Pole_ID)}/>
                        </div>
                    ))
                }    
                </div>
            </div>
            <button onClick={() => setOpenModal(!openModal)} className='bg-blue-500 float-right mt-4 text-white px-4 rounded py-1 hover:bg-blue-600'>Add To a Group</button>
            <h1>Selected Poles: {selectedPoleIds.toString()}</h1>
            {
                openModal &&
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
            }
        </div>
    );
}

export default LocationView;