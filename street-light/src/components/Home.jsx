import React from 'react'
import TotalLights from './TotalLights'
import LightGraph from './LightGraph'
import AlarmDash from './AlarmDash'
import PowerConsumption from './PowerConsumption'
import GraphChart from './GraphChart'

export default function Home() {
  return (
    <div className='min-h-screen pt-12 bg-teal-100'>
        
        <div className="flex">
          <TotalLights />
          <LightGraph />
          <AlarmDash />
        </div>
        {/* <PowerConsumption /> */}
        <GraphChart />
    </div>
  )
}
