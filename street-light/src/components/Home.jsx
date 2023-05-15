import React, { useState, useEffect } from 'react'
import TotalLights from './TotalLights'
import LightGraph from './LightGraph'
import AlarmDash from './AlarmDash'
import GraphChart from './GraphChart'
import Sites from '../images/sites.jpg'

export default function Home() {
  const [lights, setLights] = useState(0)

  useEffect(() => {
    let startValue = 0;
    let endValue = 29;
    let duration = Math.floor(1000/endValue);
    const interval = setInterval(() => {
      startValue += 1;
      setLights(startValue);
      if(startValue === endValue){
        clearInterval(interval)
      }
    }, duration);
  }, []);

  return (
    <div className='min-h-screen pt-12 bg-teal-100'>
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="flex sm:flex-nowrap flex-wrap w-full lg:w-1/2">
            {/* <TotalLights /> */}
            {/* <AlarmDash /> */}
            <div className='flex-1 m-2 h-64 relative flex justify-center items-center rounded overflow-hidden shadow-md'>
              <img src={Sites} alt="sites picture" className="h-full w-full object-cover absolute" />
              <div className='bg-black absolute h-full w-full opacity-70'></div>
              <h1 className='text-white z-10 font-bold text-3xl'>TOTAL SITES: {lights}</h1>
            </div>
          </div>
          <LightGraph />
        </div>
        <GraphChart />
    </div>
  )
}
