import React, { useState }from 'react';

const Profile = () => {
    const data = [
        {
            Pole_ID: "p-012",
            state: "ACT",
            Zip_Code: 3121,
            Suburb: "Richmond",
            Street: "123 Main Street",
            Light_Status: "ON",
            group: ["g-01", "g-02"],
            On_Time: "18:00",
            Off_Time: "05:00",
        },
        {
            Pole_ID: "p-013",
            state: "ACT",
            Zip_Code: 3121,
            Suburb: "Richmond",
            Street: "123 Main Street",
            Light_Status: "Faulty ON",
            group: ["g-02"],
            On_Time: "18:00",
            Off_Time: "05:00",
        },
        {
            Pole_ID: "p-014",
            state: "ACT",
            Zip_Code: 3121,
            Suburb: "Richmond",
            Street: "123 Main Street",
            Light_Status: "Unknown",
            group: ["g-04", "g-05"],
            On_Time: "18:00",
            Off_Time: "05:00",
        }
    ]
    // const [selectedPoleId, setSelectedPoleId] = useState([]);
    // const [user, setUser] = useState();
    // eslint-disable-next-line
    const [info, setInfo] = useState();

    const handleDelete = async () => {
    
    }
      
    return (
        <div className='mt-16 m-4 overflow-x-auto'>
            <div className='flex text-center justify-around mt-12 py-1 w-full bg-indigo-950 text-white min-w-[1248px]'>
                <h1 className='w-24'>Pole ID</h1>
                <h1 className='w-32'>State</h1>
                <h1 className='w-24'>Zip Code</h1>
                <h1 className='w-48'>Suburb</h1>
                <h1 className='w-64'>Street</h1>
                <h1 className='w-20'>Light Status</h1>
                <h1 className='w-28'>Group</h1>
                <h1 className='w-20'>On Time</h1>
                <h1 className='w-20'>OFF Time</h1>
                <h1 className='w-32'>Update</h1>
            </div>
            <div className='border-x'>
            {
                data.map((d, index) => (
                    <div key={d.Pole_ID} className='flex justify-around text-center border-b py-1 items-center'>
                        <input className='w-24 text-center' type='text' defaultValue={d.Pole_ID}/>
                        <input className='w-32 text-center' type='text' defaultValue={d.state}/>
                        <input className='w-24 text-center' type='text' defaultValue={d.Zip_Code}/>
                        <input className='w-48 text-center' type='text' defaultValue={d.Suburb}/>
                        <input className='w-64 text-center' type='text' defaultValue={d.Street}/>
                        <input className='w-20 text-center' type='text' defaultValue={d.Light_Status}/>
                        <input className='w-28 text-center' type='text' defaultValue={d.group}/>
                        <input className='w-20 text-center' type='text' defaultValue={d.On_Time}/>
                        <input className='w-20 text-center' type='text' defaultValue={d.Off_Time}/>
                        <div className='w-32 flex items-center'>
                            <button className='bg-blue-500 hover:bg-blue-600 rounded-sm px-2 mr-2 text-white'>Edit</button>
                            <button><svg onClick={() => handleDelete()} className='bg-red-400 hover:bg-red-500 rounded-sm py-1 text-white' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg></button>
                        </div>
                    </div>
                ))
            } 
            </div>
        </div>
    );
}

export default Profile;
