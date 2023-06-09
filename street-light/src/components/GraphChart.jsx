import React, { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, PointElement} from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { setTwoWeekData } from "../redux/twoWeekData";
import { useSelector, useDispatch } from 'react-redux';
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
    labels: [],
    datasets: [
      {
        label: 'Trend Line',
        data: [],
        borderColor: 'violet',
        borderWidth: 1.5,
      },
      {
        label: 'Power Usage',
        data: [],
        backgroundColor: 'tomato',
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
  });
  const [date, setDate] = useState();
  const [endDate, setEndDate] = useState();
  // const [time, setTime] = useState();
  const dispatch = useDispatch();
  const devicesData = useSelector(state => state.twoWeek.value?.data);
  const time = useSelector(state => state.twoWeek.value?.time);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentTime = moment().tz('Australia/Queensland').subtract(10, "hour").format('YYYY-MM-DDTHH:mm');
        const startTime = moment(currentTime).subtract(13, 'days').format('YYYY-MM-DDTHH:mm');

        const graphTime = moment().tz('Australia/Queensland');
        setDate(graphTime.format('MMMM D'));
        const timeArray = [graphTime.format('ddd')];

        for (let i = 0; i < 6; i++) {
          timeArray.unshift(graphTime.subtract(1, 'days').format('ddd'));
        }
        setEndDate(graphTime.format('MMMM D'));
        // setTime(timeArray);

        const response = await fetch('http://ventia.atpldhaka.com/api/fetchDevicesApi');
        const jsonData = await response.json();

        const resultPromises = jsonData.map(item => {
          return fetch('http://ventia.atpldhaka.com/api/getChartUsageApi', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              deviceGid: item.deviceGid,
              channel: '1,2,3',
              start: `${startTime}Z`,
              end: `${currentTime}Z`,
              scale: `1D`,
              energyUnit: 'KilowattHours',
            })
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error('Failed to fetch data');
            })
            .catch(error => {
              console.log('Error fetching data:', error);
            });
        });

        Promise.all(resultPromises)
          .then(results => {
            const summedData = results.reduce((acc, data) => {
              if (Array.isArray(data?.usageList)) {
                data.usageList.forEach((value, index) => {
                  if (value !== null) {
                    if (acc[index] === undefined) {
                      acc[index] = value;
                    } else {
                      acc[index] += value;
                    }
                  }
                });
              } else {
                console.log('Invalid data format:', data);
              }
              return acc;
            }, []);

            dispatch(setTwoWeekData({time: timeArray, data: summedData}));
          });
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    if (!devicesData) {
      fetchData();
    }
  }, [dispatch, devicesData])

  useEffect(() => {
    if (devicesData) {
      setChartData(prevChartData => ({
        ...prevChartData,
        labels: time,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: devicesData.slice(0, 7),
          },
          {
            ...prevChartData.datasets[1],
            data: devicesData.slice(-7),
          },
        ],
      }));
    }
  }, [devicesData]);

  return (
    <div className="p-4 bg-white rounded-sm shadow-lg m-2 sm:h-96 h-80 flex justify-center pt-12 relative">
      <div className="w-full flex gap-10 top-4 justify-center absolute">
        <h1 className="">{endDate} - {date}</h1>
        <div className="">
          <div className="flex gap-2"><div className="bg-rose-400 h-4 w-4"></div> <p>This week</p></div>
          <div className="flex gap-2"><div className="bg-gray-300 h-4 w-4"></div> <p>Last week</p></div>
        </div>
      </div>
      <div className="lg:w-2/3 w-full flex justify-center">
        <Bar options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

export default GraphChart;