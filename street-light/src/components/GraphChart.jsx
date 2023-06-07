import React, { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, PointElement} from 'chart.js'
import { Bar } from 'react-chartjs-2';
const moment = require('moment');
require('moment-timezone');

ChartJS.register(
    BarElement,
    CategoryScale, 
    LinearScale,
    Tooltip,
    PointElement,
    LineElement
)

const GraphChart = () => {

  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});
  const [start, setStart] = useState(16)
  const [end, setEnd] = useState(22)
  const [deviceGid, setDeviceGid] = useState();
  const [devices, setDevices] = useState();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    if(!deviceGid){
      const fetchData = async () => {
        try {
          const response = await fetch('http://ventia.atpldhaka.com/api/fetchDevicesApi');
          const jsonData = await response.json();
  
          setDevices(jsonData.map(item => item.deviceGid));
          setDeviceGid(jsonData[0].deviceGid)
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      };
      fetchData();
    }

    const currentTime = moment().tz('Australia/Queensland').subtract(10, "hour").format('YYYY-MM-DDTHH:mm');
    const startTime = moment(currentTime).subtract(13, 'days').format('YYYY-MM-DDTHH:mm');

    const graphTime = moment().tz('Australia/Queensland');
    setDate(graphTime.format('MMMM D'))
    setEndDate(graphTime.subtract(6, 'days').format('MMMM D'))
    const timeArray = [graphTime.format('ddd')];

    for (let i = 0; i < 6; i++) {
      timeArray.unshift(graphTime.subtract(1, 'days').format('ddd'));
    }

    if(deviceGid){
      fetch('http://ventia.atpldhaka.com/api/getChartUsageApi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deviceGid: deviceGid,
        channel: '1,2,3',
        start: `${startTime}Z`,
        end: `${currentTime}Z`,
        scale: `1D`,
        energyUnit: 'KilowattHours',
      })
    })
    .then(response => {
      response.json().then(data => {
        setChartData({
        labels: timeArray,
        datasets: [
          {
            type: 'line',
            label: 'Trend Line',
            data: data.usageList.slice(0, 7),
            borderColor: 'violet',
            borderWidth: 1.5,
            borderDash: [5, 5],
            fill: false,
          },
          {
            label: 'Power Usage',
            data: data.usageList.slice(-7),
            backgroundColor: 'tomato',
            barPercentage: 0.1,
            borderRadius: 5
          }
        ],
      },
      );
      setChartOptions({
          responsive: true,
          maintainAspectRatio: false,
      });
      })
    })
    .catch(error => {
    });
    }

  }, [deviceGid])

  return (
    <div className="p-4 bg-white rounded-sm shadow-lg m-2 sm:h-96 h-80 flex justify-center pt-12 relative">
      <div className="w-full flex gap-10 top-4 justify-center absolute">
        <h1 className="">{endDate} - {date}</h1>
        <div className="flex gap-2">
          <h1>Device</h1>
          <div> 
            <div className="flex border">
              <p className="w-16">{deviceGid}</p>
              <svg onClick={() => setOpen(!open)} className="hover:text-white bg-teal-400 text-black cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024"><path fill="currentColor" d="M831.872 340.864L512 652.672L192.128 340.864a30.592 30.592 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.592 30.592 0 0 0-42.752 0z"/></svg>
            </div>
            <ul>
              {open && devices && devices.map((device) => (
                <li onClick={() => {setDeviceGid(device); setOpen(false)}} className="bg-indigo-950 text-white px-2 text-center hover:bg-teal-400 cursor-pointer py-px" key={device}>{device}</li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
      <div className="lg:w-2/3 w-full flex justify-center">
        <Bar options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

export default GraphChart;
