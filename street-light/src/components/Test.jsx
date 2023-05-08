// import React, { useState, useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import zoomPlugin from 'chartjs-plugin-zoom';

// const RealtimeChart = () => {
//   const chartContainer = useRef(null);
//   const [chartInstance, setChartInstance] = useState(null);

//   useEffect(() => {
//     if (chartContainer && chartContainer.current) {
//       const newChartInstance = new Chart(chartContainer.current, {
//         type: 'line',
//         data: {
//           labels: [],
//           datasets: [
//             {
//               label: 'Realtime Data',
//               data: [],
//               borderColor: 'rgba(255, 99, 132, 1)',
//               borderWidth: 1,
//               fill: false,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           animation: {
//             duration: 0,
//           },
//           scales: { 
//             x: {
//               min: 0,
//               max: 10,
//             }
//           },
//         }
//       });

//       setChartInstance(newChartInstance);
//     }
//   }, [chartContainer]);

//   const updateChart = (value) => {
//     if (chartInstance) {
//       const now = Date.now();
//       chartInstance.data.labels.push(now);
//       chartInstance.data.datasets[0].data.push(value);

//       if (chartInstance.data.labels.length > 20) {
//         chartInstance.data.labels.shift();
//         chartInstance.data.datasets[0].data.shift();
//       }

//       chartInstance.update({
//         preservation: true,
//       });
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const value = Math.floor(Math.random() * 100);
//       updateChart(value);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [chartInstance]);

//   return (
//     <div className='mt-16'>
//       <canvas ref={chartContainer} height={500}/>
//     </div>
//   );
// };

// export default RealtimeChart;

/*
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

const RealtimeChart = () => {
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
              borderColor: 'rgba(255, 99, 132, 1)',
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
            xAxes: [
              {
                type: 'time',
                distribution: 'series',
                ticks: {
                  source: 'auto',
                  autoSkip: true,
                },
                bounds: 'ticks',
                adapters: {
                  date: {
                    locale: 'en',
                  },
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Time',
                },
              },
            ],
            x: {
              min: 0,
              max: 10,
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
              display: false, // hide legend labels
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
    }
  }, [chartContainer]);

  const updateChart = (value) => {
    if (chartInstance) {
      const now = Date.now();
      chartInstance.data.labels.push(now);
      chartInstance.data.datasets[0].data.push(value);

      if (chartInstance.data.labels.length > 100) {
        chartInstance.data.labels.shift();
        chartInstance.data.datasets[0].data.shift();
      }

      chartInstance.update({
        preservation: true,
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const value = Math.floor(Math.random() * 100);
      updateChart(value);
    }, 1000);

    return () => clearInterval(interval);
  }, [chartInstance]);

  return (
    <div className='mt-16'>
      <canvas ref={chartContainer} height={500}/>
    </div>
  );
};

export default RealtimeChart;
*/

/*
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

const RealtimeChart = () => {
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
              max: 20,
              scroll: {
                enabled: true,
                mode: 'x',
                reverse: true
              }
            },
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
    }
  }, [chartContainer]);

  const updateChart = (value) => {
    if (chartInstance) {
      const now = Date.now();
      chartInstance.data.labels.push(now);
      chartInstance.data.datasets[0].data.push(value);

      if (chartInstance.data.labels.length > 60) {
        chartInstance.data.labels.shift();
        chartInstance.data.datasets[0].data.shift();
      }

      chartInstance.update({
        preservation: true,
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const value = Math.floor(Math.random() * 100);
      updateChart(value);
    }, 1000);

    return () => clearInterval(interval);
  }, [chartInstance]);

  return (
    <div className='mt-16'>
      <canvas ref={chartContainer} height={500}/>
    </div>
  );
};

export default RealtimeChart;
*/
