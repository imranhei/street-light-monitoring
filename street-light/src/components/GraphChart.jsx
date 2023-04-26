import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale, 
    LinearScale,
    Tooltip,
)

const GraphChart = () => {

  const powers = [
    { day: 'Sun', value: 286 },
    { day: 'Mon', value: 356 },
    { day: 'Tue', value: 244 },
    { day: 'Wed', value: 384 },
    { day: 'Thu', value: 263 },
    { day: 'Fri', value: 327 },
    { day: 'Sat', value: 187 }
  ];

  const data = {
    labels: powers.map(item => item.day),
    datasets: [{
        data: powers.map(item => item.value),
        backgroundColor: 'tomato',
        barPercentage: 0.1,
        borderRadius: 5
    }]
  }

  const options = {
    // maintainAspectRatio: false,
    // responsive: true,
    scales: {
        maintainAspectRatio: false,
        responsive: true,
    }
  };

  return (
    <div className='bg-white p-4 rounded-sm shadow-lg m-2 h-96 relative'>
        <div className="w-full flex font-bold my-4 justify-center">
            <h1 className='mr-10 cursor-pointer hover:text-rose-400'>&lt;</h1>
            <h1 className="">April 16 - April 22</h1>
            <h1 className='ml-10 cursor-pointer hover:text-rose-400'>&gt;</h1>
        </div>
        <h1 className='absolute -rotate-90 -left-10 top-48'>Power Consumption (kWh)</h1>
        <div className='flex w-4/5 justufy-center absolute h-72 left-1/2 -translate-x-1/2'>
            <Bar className='mx-auto' data={data} option={options} ></Bar>
        </div>
    </div>
  );
};

export default GraphChart;
