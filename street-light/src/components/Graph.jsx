 //**********     Final Code     ************
import React, { useState, useEffect, useRef } from 'react';
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

  useEffect(() => {
    const chartData = JSON.parse(localStorage.getItem('chartData'));

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
  }, [chartInstance]);

  return (
    <div className='mt-16'>
      <canvas ref={chartContainer} height={500}/>
    </div>
  );
};

export default Graph;

/*
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

const Graph = () => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: 'rgb(22, 250, 208)',
              borderWidth: 0,
              pointRadius: 0,
              tension: .3,
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
            x: {
              min: 0,
              max: 60,
            },
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Value',
                },
              },
            ],
          },
          plugins: {
            legend: {
              display: false,
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'x',
              },
              zoom: {
                enabled: true,
                mode: 'x',
              },
            },
          },
        },
        plugins: [zoomPlugin],
      });

      setChartInstance(newChartInstance);

      // Initialize the worker with the chart instance
      let worker = new Worker('worker.js');
      worker.postMessage({ type: 'INIT', chartInstance: newChartInstance });
    }
  }, [chartContainer]);

  return (
    <div className='mt-16'>
      <canvas ref={chartContainer} height={500}/>
    </div>
  );
};

export default Graph;
*/

/*
import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "./styles.css";
import moment from "moment";

const data = {
  datasets: [
    {
      label: "Power Consumption",
      backgroundColor: "cyan",
      borderWidth: 0,
      fill: true,
      lineTension: 0.3,
      data: []
    }
  ]
};

const options = {
  elements: {
    line: {
      tension: 0.5
    }
  },
  scales: {
    xAxes: [
      {
        type: "realtime",
        distribution: "linear",
        realtime: {
          onRefresh: function(chart) {
            chart.data.datasets[0].data.push({
              x: moment(),
              y: Math.random()
            });
          },
          delay: 3000,
          time: {
            displayFormat: "h:mm"
          }
        },
        ticks: {
          displayFormats: 1,
          maxRotation: 0,
          minRotation: 0,
          stepSize: 1,
          maxTicksLimit: 30,
          minUnit: "second",
          source: "auto",
          autoSkip: true,
          callback: function(value) {
            return moment(value, "HH:mm:ss").format("mm:ss");
          }
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          max: 1
        }
      }
    ]
  },
};

<Line data={data} options={options} />
*/