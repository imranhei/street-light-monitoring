import { useEffect } from "react";
import { useDispatch } from "react-redux";
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

const BatteryChart = () => {
  const dispatch = useDispatch();
  const data = []

  useEffect(() => {
    dispatch(fetchBattery());
  }, [dispatch]);
  return (
    <div className="mt-10 sm:p-8 p-4">
      Battery Chart
      {/* <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer> */}
    </div>
  );
};

export default BatteryChart;
