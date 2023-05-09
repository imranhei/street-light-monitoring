import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';


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
        type: 'line',
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
        plugins: [zoomPlugin],
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
    }, 1000);

    return () => clearInterval(interval);
  }, [chartInstance]);

  return (
    <div className='mt-16'>
      <canvas ref={chartContainer} height={500}/>
    </div>
  );
};

export default Graph;

