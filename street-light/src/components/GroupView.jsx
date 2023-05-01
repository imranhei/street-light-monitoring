import React from 'react';

const GroupView = () => {
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
    const gmail = ['imran@gmail.com', 'jamil@gmail.com']

    return (
        <div>
            <div className="overflow-x-scroll md:overflow-x-auto">
                <div className='flex text-center mt-12 justify-around text-sm md:text-base py-1 w-full bg-indigo-950 h-fit text-white'>
                    <h1 className='flex-1'>Pole ID</h1>
                    <h1 className='flex-1'>Zip Code</h1>
                    <h1 className='flex-1'>Suburb</h1>
                    <h1 className='flex-1'>Street</h1>
                    <h1 className='flex-1'>Light Status</h1>
                </div>
                <div className='border-x'>
                {
                    data.map(d => (
                        <div key={d.Pole_ID} className='flex justify-around text-center border-b py-1 items-center'>
                            <h1 className='flex-1'>{d.Pole_ID}</h1>
                            <h1 className='flex-1'>{d.Zip_Code}</h1>
                            <h1 className='flex-1'>{d.Suburb}</h1>
                            <h1 className='flex-1'>{d.Street}</h1>
                            <h1 className='flex-1'>{d.Light_Status}</h1>
                        </div>
                    ))
                }    
                </div>
            </div>
            <div className="border rounded-sm mt-4 flex flex-wrap flex-col md:flex-row justify-between">
                <div className="p-2">
                    <h1>Group Information</h1>
                    <h1>Group: g-1</h1>
                    <h1>Contact: +61 4xx xxx xxx</h1>
                    {
                        gmail.map(g => (
                            <div key={g}>
                                📧 {g}
                            </div>
                        ))
                    }
                    <button className='bg-blue-500 rounded-sm hover:bg-blue-600 text-white px-4 mt-2'>Ad or Remove</button>
                </div>
                <div className='p-2 flex flex-col gap-2'>
                    <h1>Message</h1>
                    <textarea className='outline-none border h-20 max-h-32 md:w-96 flex-1 p-1' type="text" placeholder='Write message'/>
                    <button className='bg-blue-500 rounded-sm hover:bg-blue-600 text-white w-32'>Send</button>
                </div>

            </div>
        </div>
    );
}

export default GroupView;
