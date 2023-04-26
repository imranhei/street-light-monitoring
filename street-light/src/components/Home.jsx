import React from 'react'
import TotalLights from './TotalLights'
import LightGraph from './LightGraph'
import AlarmDash from './AlarmDash'
import GraphChart from './GraphChart'

export default function Home() {
  return (
    <div className='min-h-screen pt-12 bg-teal-100'>
        
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
          <div className="flex sm:flex-nowrap flex-wrap w-full lg:w-1/2">
            <TotalLights />
            <AlarmDash />
          </div>
          <LightGraph />
        </div>
        <GraphChart />
    </div>
  )
}
