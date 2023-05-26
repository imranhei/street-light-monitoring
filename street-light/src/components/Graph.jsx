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

//import packages
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
// import { SelectedGraphData } from "../redux/graphData";
const moment = require('moment');
require('moment-timezone');

const ResumeModal = ({ onResume }) => {
  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <h2>Resume Modal</h2>
      <p>This is the resume modal content.</p>
      <button onClick={onResume}>Resume</button>
    </div>
  );
};

const Graph = () => {
    const channel = useSelector((state) => state.graph.channel)
    const deviceGid = useSelector((state) => state.graph.deviceGid)
    
    //define states
    const [timeScale, setTimeScale] = useState("minute");
    // eslint-disable-next-line
    const [unit, setUnit] = useState("KilowattHours");
    // eslint-disable-next-line
    const [showResumeModal, setShowResumeModal] = useState(false);
    const [dataset, setDataset] = useState({
      labels: [],
      datasets: [
        {
          label: 'Power',
          data: [],
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ]
    });
    // eslint-disable-next-line
    const [option, setOption] = useState({
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
    });

    //useEffect
    useEffect(() => {
        //initial data collecting and setstate
        updateHelper(deviceGid, channel, timeScale, unit)
        //Time interval
        
        const interval = setInterval(() => {
            updateHelper(deviceGid, channel, timeScale, unit)
        }, 60000)

        // const startInactivityTimer = () => {
        //   inactivityTimeout.current = setTimeout(() => {
        //     clearInterval(interval);
        //     setShowResumeModal(true);
        //   }, 1 * 60 * 1000); // 5 minutes of inactivity
        // };
    
        // // Reset the inactivity timer whenever there is user activity
        // const handleUserActivity = () => {
        //   console.log("mouse move");
          // clearInterval(intervalTest)
          // clearTimeout(inactivityTimeout.current);
          // startInactivityTimer();
        // };
    
        // // Add event listeners to track user activity
        // document.addEventListener('mousemove', handleUserActivity);
        // document.addEventListener('keydown', handleUserActivity);
    
        // // Start the inactivity timer initially
        // startInactivityTimer();

        return () => //clearInterval(interval);
        {
          clearInterval(interval);
          // document.removeEventListener('mousemove', handleUserActivity);
          // document.removeEventListener('keydown', handleUserActivity);
          // clearTimeout(inactivityTimeout.current);
        }

        // eslint-disable-next-line
    }, [deviceGid, channel, timeScale, unit])

    //helper function
    const updateHelper = (deviceGid_f, channel_f, timeScale_f, unit_f) => {
        
        if(timeScale_f === "hour"){
            updateData(deviceGid_f, channel_f, timeScale_f, unit_f, 'H', 47, 'h A')
        }
        else if(timeScale_f === "minute"){
            updateData(deviceGid_f, channel_f, timeScale_f, unit_f, 'MIN', 59, 'HH:mm')
        }
        else if(timeScale_f === "day"){
            updateData(deviceGid_f, channel_f, timeScale_f, unit_f, 'D', 29, 'MM-DD')
        }
        else if(timeScale_f === "week"){
            updateData(deviceGid_f, channel_f, timeScale_f, unit_f, 'W', 19, 'MM-DD')
        }
        else if(timeScale_f === "month"){
            updateData(deviceGid_f, channel_f, timeScale_f, unit_f, 'MON', 11, 'YYYY-MM')
        }
        else if(timeScale_f === "year"){
            updateData(deviceGid_f, channel_f, timeScale_f, unit_f, 'Y', 1, 'YYYY')
        }
    }

    //main function
    const updateData = (deviceGid_f, channel_f, timeScale_f, unit_f, scale, count, form) => {
        const currentTime = moment().tz('Australia/Queensland').subtract(10, "hour").format('YYYY-MM-DDTHH:mm');
        const startTime = moment(currentTime).subtract(count, timeScale_f).format('YYYY-MM-DDTHH:mm');
        const timeArray = [];

        for (let i = 0; i <= count; i++) {
            const timestamp = moment(startTime).add(i, timeScale_f).format(form);
            timeArray.push(timestamp);
        }

        fetch('http://ventia.atpldhaka.com/api/getChartUsageApi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deviceGid: deviceGid_f,
                channel: channel_f,
                start: `${startTime}Z`,
                end: `${currentTime}Z`,
                scale: `1${scale}`,
                energyUnit: unit_f,
            })
        })
        .then(response => {
            response.json().then(data => {
                setDataset(prevState => ({
                  ...prevState,
                  labels: timeArray,
                  datasets: [
                    {
                      ...prevState.datasets[0],
                      data: data.usageList,
                    },
                  ],
                }));
            })
        })
        .catch(error => {
        // Handle network or other error
        });
    }

    const handleResume = () => {
      // setShowResumeModal(false);
      // // Restart the interval
      
      // updateHelper(deviceGid, channel, timeScale, unit);
      // const interval = setInterval(() => {
      //   console.log("run from interval 2")
      //   updateHelper(deviceGid, channel, timeScale, unit);
      // }, 60000);
  
      // // Start the inactivity timer
      // const startInactivityTimer = () => {
      //   inactivityTimeout.current = setTimeout(() => {
      //     setShowResumeModal(true);
      //     clearInterval(interval);
      //   }, 1 * 60 * 1000); // 5 minutes of inactivity
      // };
  
      // // Reset the inactivity timer whenever there is user activity
      // const handleUserActivity = () => {
      //   clearTimeout(inactivityTimeout.current);
      //   startInactivityTimer();
      // };
  
      // // Add event listeners to track user activity
      // document.addEventListener('mousemove', handleUserActivity);
      // document.addEventListener('keydown', handleUserActivity);
  
      // // Start the inactivity timer initially
      // startInactivityTimer();
    };
  

    //html code
    return (
        <>
            <div className="bg-indigo-950 text-white mt-4 rounded flex py-2">
              <p className='flex-1 text-center border-r'>Unit<br/>{unit}</p>
              <p className='flex-1 text-center'>{dataset.labels[dataset.labels.length - 1]}<br/>{(dataset.datasets[0].data[dataset.datasets[0].data.length - 1])?.toFixed(4)} kWh</p>
            </div>
            <div className='my-8 h-80'>
                <Bar data={dataset} options={option}/>
            </div>
            <div className="bg-indigo-950 rounded w-fit text-white flex items-center justify-around m-auto overflow-hidden cursor-pointer">
                <p onClick={() => setTimeScale("minute")} className={`px-8 py-2 ${timeScale === 'minute' ? 'bg-teal-400' : 'hover:text-teal-400'}`}>Minute</p>
                <div className='h-6 border-l'></div>
                <p onClick={() => setTimeScale("hour")} className={`px-8 py-2 ${timeScale === 'hour' ? 'bg-teal-400' : 'hover:text-teal-400'}`}>Hour</p>
                <div className='h-6 border-l'></div>
                <p onClick={() => setTimeScale("day")} className={`px-8 py-2 ${timeScale === 'day'? 'bg-teal-400' : 'hover:text-teal-400'}`}>Day</p>
                <div className='h-6 border-l'></div>
                <p onClick={() => setTimeScale("week")} className={`px-8 py-2 ${timeScale === 'week'? 'bg-teal-400' : 'hover:text-teal-400'}`}>Week</p>
                <div className='h-6 border-l'></div>
                <p onClick={() => setTimeScale("month")} className={`px-8 py-2 ${timeScale === 'month'? 'bg-teal-400' : 'hover:text-teal-400'}`}>Month</p>
                <div className='h-6 border-l'></div>
                <p onClick={() => setTimeScale("year")} className={`px-8 py-2 ${timeScale === 'year'? 'bg-teal-400' : 'hover:text-teal-400'}`}>Year</p>
            </div>
            {showResumeModal && <ResumeModal onResume={handleResume} />}
        </>
    )
}

export default Graph;