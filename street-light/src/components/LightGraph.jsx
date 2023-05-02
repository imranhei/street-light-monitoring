import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Chart from "chart.js/auto";
import { useDispatch } from 'react-redux'
import { selectedLight } from "../redux/lightStatus";

export default function LightGraph() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const lightStatus = [{
    status: 'ON', lights: 6800
    },{
    status: 'OFF', lights: 1500
    },{
    status: 'Faulty ON', lights: 70
    },{
    status: 'Faulty OFF', lights: 80
    },{
    status: 'Unknown', lights: 20
    }
  ]
  const color = ["bg-green-400", "bg-red-500", "bg-teal-400", "bg-orange-400", "bg-black"];
  const [chartData, setChartData] = useState({});
  //  Number of lights of each status
  // const [data, setData] = useState();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('https://mocki.io/v1/d5a5af2f-13ad-4f9b-b6c4-e8695b14da71');
  //     const jsonData = await response.json();
  //     setData(jsonData);
  //   };
  //   fetchData()
  // },[])

  useEffect(() => {
    const data = {
      datasets: [
        {
          data: lightStatus.map(obj => obj.lights),
          backgroundColor: [
            "#4ADE80", "#EF4444", "#2DD4BF", "#FB923C", "#000000"
          ],
          borderWidth: 0,
        },
      ],
    };
    setChartData(data);
  }, []);

  useEffect(() => {
    if (chartData && Object.keys(chartData).length) {
      const ctx = document.getElementById("pieChart");
      if (ctx.chart) {
        ctx.chart.destroy();
      }
      new Chart(ctx, {
        type: "pie",
        data: chartData,
      });
    }
  }, [chartData]);

  const handleStatus = (st) => {
    dispatch(selectedLight(st));
    navigate('/inventory');
  }

  return (
    <div className='lg:w-1/2 w-full bg-green-200 p-4 rounded-sm shadow-lg flex flex-col gap-2 items-center justify-center m-2 h-64'>
        <div className="flex gap-4 items-center">
            <div className="h-52">
                <canvas id="pieChart"></canvas>
            </div>
            <div>
              {
                lightStatus.map((light, index) => (
                  <div key={light.status} className="flex gap-1 items-center py-1">
                    <div className={`h-4 w-4  ${color[index]}`}></div>
                    <h1 onClick={() => handleStatus(light.status)} className='cursor-pointer hover:text-rose-400'>{`${light.status} (${light.lights})`}</h1>
                  </div>
                ))
              }
            </div>
        </div>
        <h1 className='font-bold'>Light Status</h1>
    </div>
  )
}
