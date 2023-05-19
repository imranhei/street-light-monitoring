import React, { useState }from 'react';
// import axios from 'axios';

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
    const [info, setInfo] = useState();

    const handleDelete = async () => {
    
    }
    const handleData = () => {
        // const fetchData = async () => {
            
        }
        // const fetchData = async () => {
        //     try {
        //       const authtoken = 'eyJraWQiOiJ6Yjhpb1wvSEJnaUFBOWJZb0p6U0NQcVZCTGp3ZkZVam8zM1BGK2NlZGxIdz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0M2U5ZGY0MC0zZmM0LTQ3YzYtODI1My0wNDgxYjM1NDgzMTciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfZ2hsT1hWTGkxIiwiY29nbml0bzp1c2VybmFtZSI6IjQzZTlkZjQwLTNmYzQtNDdjNi04MjUzLTA0ODFiMzU0ODMxNyIsImF1ZCI6IjRxdGU0N2pic3RvZDhhcG5maWMwYnVubXJxIiwiZXZlbnRfaWQiOiI2NDgyNTMzOC04YWY3LTQ0OTgtYTYzMi1iZGFjZGJhYjUzMWEiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY4NDM4OTcyMywibmFtZSI6ImRlcnJpY2tsZW5laGFuIiwiZXhwIjoxNjg0MzkzMzIzLCJpYXQiOjE2ODQzODk3MjMsImVtYWlsIjoiZGVycmljay5sZW5laGFuQHZlbnRpYS5jb20ifQ.S_fAfM7Cfrv61tBYBNtmvvUu1i1zAvyQS23aY9XBZVadfD1kRehz-Aith18OvLS4qhKPm171pwwy-A4FH6rXZnyf8bvTWWAZCs4evEHZB-9M9H7-J92JiZN69IgUwWhKggxEJyhhgRtGp3ArTdipv8UekRnFEflsg51sJToTqx7mk8kbJn0p0ikJO_nSRs3vzqzJ6rVLGK-ru7vCJdeSbCagHXPR-RLr_wW-eJpiWW7TLmkTjE-TvAxXfscXUcGYVT5lvGrVoYXJJKN09xEOG0JVt7f0eR7-AZv_CVi6s8PpVUwICTGoYF8dRsOdRd8cNLsHJLEAGmfEMDY3mUIKDw';
        //       const response = await fetch('https://api.emporiaenergy.com/customers?email=derrick.lenehan@ventia.com', {
        //         method: 'GET',
        //         headers: {
        //           'Content-Type': 'application/json',
        //           'Authtoken': authtoken,
        //         }
        //       });
      
        //       if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //       }
      
        //       const responseData = await response.json();
        //       console.log(responseData)
        //     } catch (error) {
        //       console.error('Error while fetching data:', error);
        //     }
        //   };
      
        //   fetchData();
    // }

      
    return (
        <div className='mt-16 m-4 overflow-x-auto text-2xl'>
            {info && <p>{JSON.stringify(info)}</p>}
            <button className='px-4 py-1 bg-blue-500 rounded text-white mt-2' onClick={handleData}>Show data</button>

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
                        <div className='w-32'>
                            <button className='bg-blue-500 hover:bg-blue-600 rounded-sm py-1 text-white'>Edit</button>
                            <button><svg onClick={() => handleDelete()} className='bg-red-400 hover:bg-red-500 rounded-sm py-1 text-white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg></button>
                        </div>
                    </div>
                ))
            } 
            </div>
        </div>
    );
}

export async function getStaticProps() {
    // Fetch data from an API or any data source
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
  
    // Return the data as props
    return {
      props: {
        data,
      },
    };
  }


export default Profile;
