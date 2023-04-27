import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

export default function LightGraph() {
    const on = 6800;
    const off = 1500;
    const fOn = 70;
    const fOff = 80;
    const unknown = 20;

    // const data = {
    //     labels: [
    //       'Red',
    //       'Blue',
    //       'Yellow'
    //     ],
    //     datasets: [{
    //       label: 'My First Dataset',
    //       data: [300, 50, 100],
    //       backgroundColor: [
    //         'rgb(255, 99, 132)',
    //         'rgb(54, 162, 235)',
    //         'rgb(255, 205, 86)'
    //       ],
    //       hoverOffset: 4
    //     }]
    //   };
      const [chartData, setChartData] = useState({});

      useEffect(() => {
        const data = {
        //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              data: [6800, 1500, 70, 80, 20],
              backgroundColor: [
                "#4ADE80",
                "#EF4444",
                "#2DD4BF",
                "#FB923C",
                "#000000"
              ],
            //   borderColor: [
            //     "rgba(255, 99, 132, 1)",
            //     "rgba(54, 162, 235, 1)",
            //     "rgba(255, 206, 86, 1)",
            //     "rgba(75, 192, 192, 1)",
            //     "rgba(153, 102, 255, 1)",
            //     "rgba(255, 159, 64, 1)",
            //   ],
              borderWidth: 0,
            },
          ],
        };
        setChartData(data);
      }, []);
    
      useEffect(() => {
        if (chartData && Object.keys(chartData).length) {
          const ctx = document.getElementById("pieChart");
          new Chart(ctx, {
            type: "pie",
            data: chartData,
          });
        }
      }, [chartData]);

  return (
    <div className='lg:w-1/2 w-full bg-green-200 p-4 rounded-sm shadow-lg flex flex-col gap-2 items-center justify-center m-2 h-64'>
        <div className="flex justify-around items-center">
            <div className="h-52">
                <canvas id="pieChart"></canvas>
            </div>
            <div className="">
                <div className="flex gap-1 items-center py-1">
                    <div className="bg-green-400 h-4 w-4"></div>
                    <h1 className='cursor-pointer hover:text-rose-400'>ON ({on})</h1>
                </div>
                <div className="flex gap-1 items-center py-1">
                    <div className="bg-red-500 h-4 w-4"></div>
                    <h1 className='cursor-pointer hover:text-rose-400'>OFF ({off})</h1>
                </div>
                <div className="flex gap-1 items-center py-1">
                    <div className="bg-teal-400 h-4 w-4"></div>
                    <h1 className='cursor-pointer hover:text-rose-400'>Faulty ON ({fOn})</h1>
                </div>
                <div className="flex gap-1 items-center py-1">
                    <div className="bg-orange-400 h-4 w-4"></div>
                    <h1 className='cursor-pointer hover:text-rose-400'>Faulty OFF ({fOff})</h1>
                </div>
                <div className="flex gap-1 items-center py-1">
                    <div className="bg-black h-4 w-4"></div>
                    <h1 className='cursor-pointer hover:text-rose-400'>Unknown ({unknown})</h1>
                </div>
            </div>
        </div>
        <h1 className='font-bold'>Light Status</h1>
    </div>
  )
}
