 //**********     Final Code     ************
/*import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
// import zoomPlugin from 'chartjs-plugin-zoom';


const Graph = () => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  
  // Create a new web worker
  // let w;
  // if(typeof Worker !== "undefined"){
  //   if(typeof w == "undefined"){
  //     w = new Worker("worker.js");
  //   }
  //   w.onmessage = function (event) {
  //     console.log(event.data);
  //   }
  // } else{
  //   alert("Your browser dosen't support web worker");
  // }
  const [data, setData] = useState([]);
  useEffect(() => {

    fetch('http://ventia.atpldhaka.com/api/getChartUsageApi', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          deviceGid: 146684,
          channel: 1,
          start: '2023-05-17T12:40:00.000Z',
          end: '2023-05-17T13:40:00.000Z',
          scale: '1MIN',
          energyUnit: 'KilowattHours',
      })
      })
      .then(response => {
          response.json().then(data => {
              setData(data)
          })
      })
      .catch(error => {
      // Handle network or other error
    });

    // const chartData = JSON.parse(localStorage.getItem('chartData'));
    const chartData = data;

    if (chartContainer && chartContainer.current) {

      const newChartInstance = new Chart(chartContainer.current, {
        type: 'bar',
        data: {
          labels: chartData?.labels || [], //local storage
          datasets: [
            {
              data: chartData?.data || [], //local storage
              backgroundColor: 'rgb(22, 250, 208)',
              borderWidth: 0,
              pointRadius: 0,
              tension: .2,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 0,
          },
          scales: {
            //   x: {
            //     min: 0,
            //     max: 20,
            //     scroll: {
            //       enabled: true,
            //       mode: 'x',
            //       reverse: true
            //     }
            //   },
          },
          plugins: {
            legend: {
              display: false, // hide legend labels
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'x',
              },
            },
          },
        // plugins: [zoomPlugin],
      }
      });

      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateChart = (value) => {
    if (chartInstance) {
      const now = new Date().toLocaleTimeString('en-US', { hour12: false });
      chartInstance.data.labels.push(now);
      chartInstance.data.datasets[0].data.push(value);

      if (chartInstance.data.labels.length > 60) {
        chartInstance.data.labels.shift();
        chartInstance.data.datasets[0].data.shift();
      }

      chartInstance.update({
        preservation: true,
      });
      
      // Save chart data to local storage
      const chartData = {
        labels: chartInstance.data.labels,
        data: chartInstance.data.datasets[0].data,
      };
      localStorage.setItem('chartData', JSON.stringify(chartData));
    }
  };

  useEffect(() => {
    const chartData = JSON.parse(localStorage.getItem('chartData'));
    if (chartData) {
      const value = chartData.data[chartData.data.length - 1];
      updateChart(value);
    }

    const interval = setInterval(() => {
      const value = Math.floor(Math.random() * 100);
      updateChart(value);
    }, 10000);

    return () => clearInterval(interval);
    // eslint-disable-next-line 
  }, [chartInstance]);

  return (
    <div className='mt-16'>
      <canvas ref={chartContainer} height={500}/>
    </div>
  );
};

export default Graph;
*/


import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
const moment = require('moment');
require('moment-timezone');

const ChartComponent = () => {
  // Sample data for the chart
  const [data, setData] = useState()
  const [time, setTime] = useState()
  const [selectedTimeScale, setSelectedTimeScale] = useState("Hour");

  const [d, setD] = useState({
      labels: time,
      datasets: [
        {
          label: 'Data 1',
          data: data,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ]
  })

  useEffect(() => {

    const timeArray = [];
    let currentTime = moment().tz('Australia/Queensland').format('YYYY-MM-DDTHH:mm');
    let startTime = moment(currentTime).subtract(29, 'minutes').format('YYYY-MM-DDTHH:mm');
    const hourMinute = moment(currentTime); // Create a moment object from currentTime

    for (let i = 0; i < 30; i++) {
      timeArray.unshift(hourMinute.format('HH:mm')); // Format the time as 'HH:mm' and add it to the beginning of the array
      hourMinute.subtract(1, 'minute'); // Subtract 1 minute from hourMinute for the next iteration
    }

    setTime(timeArray);
    setD(prevState => ({
      ...prevState, labels: timeArray
    }))
    const test = "2023-05-17T08:58Z"
    fetch('http://ventia.atpldhaka.com/api/getChartUsageApi', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          deviceGid: 146684,
          channel: 16,
          start: '2023-05-19T00:00:00.000Z',
          end: '2023-05-20T00:00:00.000Z',
          scale: '1H',
          energyUnit: 'KilowattHours',
      })
      })
      .then(response => {
        response.json().then(da => {
          setD(prevState => ({...prevState, datasets: [
              {
                ...prevState.datasets[0], // Copy previous dataset object
                data: da.usageList, // Update data property with new value (newData)
              },
            ],
          }));
        })
      })
      .catch(error => {
      // Handle network or other error
    });

    console.log("Never call second time")
  }, [])

  const updateValue = () => {
    
    let currentTime = moment().tz('Australia/Queensland').format('YYYY-MM-DDTHH:mm');
    let startTime = moment(currentTime).subtract(29, 'minutes').format('YYYY-MM-DDTHH:mm');
    console.log("Test: ", currentTime, startTime)
    fetch('http://ventia.atpldhaka.com/api/getChartUsageApi', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          deviceGid: 146684,
          channel: 1,
          start: `${startTime}Z`,
          end: `${currentTime}Z`,
          scale: '1MIN',
          energyUnit: 'KilowattHours',
      })
      })
      .then(response => {
        response.json().then(da => {
          setD(prevState => ({...prevState, datasets: [
              {
                ...prevState.datasets[0], // Copy previous dataset object
                data: da.usageList, // Update data property with new value (newData)
              },
            ],
          }));
        })
      })
      .catch(error => {
      // Handle network or other error
    });
  }

  useEffect(() => {
    console.log("Hello");
    const interval = setInterval(() => {
      let currentTime = moment().tz('Australia/Queensland').format('YYYY-MM-DDTHH:mm');
      const hourMinute = moment(currentTime)
      const temp = time;
      temp.shift();
      temp.push(hourMinute.format('HH:mm'))
      setTime(temp);
      setD(prevState => ({
        ...prevState, labels: temp
      }))
      
      updateValue();
    }, 60000);

    return () => clearInterval(interval);
    // eslint-disable-next-line 
  }, [time]);

  // Chart configuration options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleTimeSelect = option => {
    setSelectedTimeScale(option)
    if(option === "Minute"){

    }
  }

  return (
    <>
      <div className='mt-12 h-96'>
        <Bar data={d} options={options}/>
        {/* <Line data={d} options={options} /> */}
      </div>
      <button onClick={() => console.log(time)} className='bg-blue-500 px-4 py-1 rounded'>click</button>
      <div className="bg-teal-400 rounded w-fit flex items-center justify-around m-auto overflow-hidden">
        {/* <p onClick={() => handleTimeSelect("Minute")} className='px-8 py-2 font-semibold hover:bg-teal-500'>Minute</p>
        <div className='h-6 border-l'></div> */}
        <p onClick={() => handleTimeSelect("Hour")} className={`px-8 py-2 font-semibold hover:bg-teal-500 ${selectedTimeScale === 'Hour' ? 'bg-teal-500' : ''}`}>Hour</p>
        <div className='h-6 border-l'></div>
        <p onClick={() => handleTimeSelect("Day")} className={`px-8 py-2 font-semibold hover:bg-teal-500 ${selectedTimeScale === 'Day'? 'bg-teal-500' : ''}`}>Day</p>
        <div className='h-6 border-l'></div>
        <p onClick={() => handleTimeSelect("Week")} className={`px-8 py-2 font-semibold hover:bg-teal-500 ${selectedTimeScale === 'Week'? 'bg-teal-500' : ''}`}>Week</p>
        <div className='h-6 border-l'></div>
        <p onClick={() => handleTimeSelect("Month")} className={`px-8 py-2 font-semibold hover:bg-teal-500 ${selectedTimeScale === 'Month'? 'bg-teal-500' : ''}`}>Month</p>
        <div className='h-6 border-l'></div>
        <p onClick={() => handleTimeSelect("Year")} className={`px-8 py-2 font-semibold hover:bg-teal-500 ${selectedTimeScale === 'Year'? 'bg-teal-500' : ''}`}>Year</p>
      </div>
    </>
  );
};

export default ChartComponent;

 