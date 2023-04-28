import React, { useState } from 'react';

const ListView = () => {
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

    const handleCheckboxChange = async (event, poleId) => {
        const isChecked = event.target.checked;
        if (isChecked) {
          setSelectedPoleIds([...selectedPoleIds, poleId]);
        } else {
          setSelectedPoleIds(selectedPoleIds.filter(id => id !== poleId));
        }
      }
      
    return (
        <div className='w-full border-x'>
            <div className='flex text-center mt-16 text-sm md:text-base py-1 w-full bg-indigo-950 h-fit text-white'>
                <h1 className='w-1/6'>Pole ID</h1>
                <h1 className='w-1/6'>Zip Code</h1>
                <h1 className='w-1/6'>Suburb</h1>
                <h1 className='w-1/6'>Street</h1>
                <h1 className='w-1/6'>Light Status</h1>
                <h1 className='w-1/6'>Select</h1>
            </div>
            <div>
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
            <h1>Selected Poles: {selectedPoleIds.toString()}</h1>
        </div>
    );
}

export default ListView;
