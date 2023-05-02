import React, { useEffect, useState } from 'react'

export default function TotalLights() {
  const [lights, setLights] = useState(0)

  //  Number of light data collection
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('https://mocki.io/v1/d5a5af2f-13ad-4f9b-b6c4-e8695b14da71');
  //     const jsonData = await response.json();
  //     setLights(jsonData);
  //   };
  //   fetchData()
  // },[])

  useEffect(() => {
    let startValue = 0;
    let endValue = 1000;
    let duration = Math.floor(3000/endValue);
    const interval = setInterval(() => {
      startValue += 1;
      setLights(startValue);
      if(startValue === endValue){
        clearInterval(interval)
      }
    }, duration);
  }, []);

  return (
    <div className='w-full sm:w-1/2 bg-pink-400 p-4 rounded-sm shadow-lg flex flex-col gap-5 items-center justify-center m-2 h-64'>
      <h1 className='text-white font-bold text-2xl text-center'>Total Number of Lights: {lights}</h1>
      <svg className='text-white' xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7M9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9v1Z"/></svg>
    </div>
  )
}
