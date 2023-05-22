import React, { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, } from 'chart.js'
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale, 
    LinearScale,
    Tooltip,
)

const GraphChart = () => {

  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});
  const [start, setStart] = useState(16)
  const [end, setEnd] = useState(22)

  useEffect(() => {
    setChartData({
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          type: 'line',
          label: 'Line Chart',
          data: [280, 336, 244, 400, 263, 327, 200],
          borderColor: 'blue',
          barPercentage: 0.1,
          fill: false,
        },
        {
          data: [286, 356, 244, 384, 263, 327, 187],
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
        plugins: {
          legend: {
            display: false,
          },
        },
    });
  }, []);

  const handlePrevious = () => {
    setChartData(prevState => ({
      ...prevState,
      datasets: [{
        ...prevState.datasets[0],
        data: [100, 200, 300, 400, 500, 600, 700]
      }]
    }));
    setStart(9);
    setEnd(15);
  }
  const handleNext = () => {
    setChartData(prevState => ({
      ...prevState,
      datasets: [{
        ...prevState.datasets[0],
        data: [324, 421, 863, 249, 300, 284, 400]
      }]
    }));
    setStart(23);
    setEnd(29);
  }

  return (
    <div className="p-4 bg-white rounded-sm shadow-lg m-2 sm:h-96 h-80 flex justify-center pt-12 relative">
      <div className="w-full flex font-bold top-4 justify-center absolute">
        <h1 onClick={handlePrevious} className='mr-10 cursor-pointer hover:text-rose-400'>&lt;</h1>
        <h1 className="">April {start} - April {end}</h1>
        <h1 onClick={handleNext} className='ml-10 cursor-pointer hover:text-rose-400'>&gt;</h1>
      </div>
      <div className="lg:w-2/3 w-full">
        <Bar options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

export default GraphChart;
