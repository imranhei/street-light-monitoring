import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchBattery, fetchDeviceList } from "../redux/battery-slice";
import Loader from "./Loader";

const BatteryChart = () => {
  const dispatch = useDispatch();
  const { data, devices, isLoading } = useSelector((state) => state.battery);
  const [selectedDevice, setSelectedDevice] = useState("");

  useEffect(() => {
    dispatch(fetchDeviceList());
  }, [dispatch]);

  useEffect(() => {
    if (devices?.length > 0) {
      const device = selectedDevice || devices[0]; // pick current or default
      if (device !== selectedDevice) setSelectedDevice(device);
      dispatch(fetchBattery({ devices: [device] }));
    }
  }, [devices, selectedDevice, dispatch]);

  if (isLoading) {
    return <Loader className="h-screen"/>;
  }

  return (
    <div className="mt-10 sm:p-8 p-4">
      <div className="flex items-center gap-4">
        <span className="font-medium">Select Device:</span>
        <select
          className="border rounded px-2 py-1 w-48"
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
        >
          {devices?.map((d, index) => (
            <option key={index} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full h-96 mt-2">
        <h1 className="text-xl text-center py-2 font-semibold">Battery Voltage</h1>
        <ResponsiveContainer width="100%" height="100%" >
          <LineChart
            width={500}
            height={300}
            data={data?.data || []}
            margin={{
              top: 5,
              right: 30,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="voltage"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BatteryChart;
