import { forwardRef, useEffect, useState } from "react";
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
import { fetchBattery } from "../redux/battery-slice";
import Loader from "./Loader";

const PowerChartPrint = forwardRef(({ selectedDevice }, ref) => {
  const dispatch = useDispatch();
  const [printData, setPrintData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    const fetchPrintData = async () => {
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const start = new Date(end);
      start.setDate(start.getDate() - 7);
      start.setHours(0, 0, 0, 0);
      setDateRange({ start, end });

      try {
        const res = await dispatch(
          fetchBattery({
            devices: [selectedDevice],
            from: formatDate(start),
            to: formatDate(end),
            group_by: "hour",
          })
        ).unwrap();

        setPrintData(res?.series?.[0]?.data || res?.data || []);
      } catch (err) {
        console.error("Failed to fetch print data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedDevice) fetchPrintData();
  }, [dispatch, selectedDevice]);

  if (loading) return <Loader />;

  return (
    <div ref={ref} className="p-8">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Battery Voltage Report</h1>
        <p className="text-lg">Device: {selectedDevice} | Grouped by: hour</p>
        <p className="text-md">
          {dateRange.start && dateRange.start.toLocaleDateString()} -{" "}
          {dateRange.end && dateRange.end.toLocaleDateString()}
        </p>
      </div>
      <div style={{ width: "100%", minWidth: "650px", height: "350px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={printData}
            margin={{ top: 5, right: 30, left: -20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleTimeString("en-US", {
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
              fontSize={12}
              angle={-90}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ marginTop: -10, marginLeft: 30 }}
            />
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
});

export default PowerChartPrint;
