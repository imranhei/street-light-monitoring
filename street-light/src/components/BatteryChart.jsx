import { ChevronsLeft, ChevronsRight, Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
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
import PowerChartPrint from "./PowerChartPrint";

const BatteryChart = () => {
  const dispatch = useDispatch();
  const printRef = useRef(null);
  const { devices, isLoading, isChartLoading } = useSelector(
    (state) => state.battery
  );

  const [selectedDevice, setSelectedDevice] = useState("");
  const [groupBy, setGroupBy] = useState("hour");
  const [offset, setOffset] = useState(0);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [chartData, setChartData] = useState([]);
  const [cache, setCache] = useState({});
  const [dataLoading, setDataLoading] = useState(false);

  // Fetch device list
  useEffect(() => {
    dispatch(fetchDeviceList());
  }, [dispatch]);

  // Set default device
  useEffect(() => {
    if (devices?.length && !selectedDevice) {
      setSelectedDevice(
        typeof devices[0] === "string" ? devices[0] : devices[0]?.name ?? ""
      );
    }
  }, [devices, selectedDevice]);

  // Calculate date range
  useEffect(() => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    let start = new Date(end);

    switch (groupBy) {
      case "hour":
        start.setDate(end.getDate() - 2);
        start.setHours(0, 0, 0, 0);
        if (offset > 0) {
          start.setDate(start.getDate() - offset * 2);
          end.setDate(end.getDate() - offset * 2);
        }
        break;
      case "day":
        start.setDate(end.getDate() - 30);
        start.setHours(0, 0, 0, 0);
        if (offset > 0) {
          start.setDate(start.getDate() - offset * 30);
          end.setDate(end.getDate() - offset * 30);
        }
        break;
      case "week":
        start.setDate(end.getDate() - 7 * 20);
        start.setHours(0, 0, 0, 0);
        if (offset > 0) {
          start.setDate(start.getDate() - offset * 7 * 20);
          end.setDate(end.getDate() - offset * 7 * 20);
        }
        break;
      case "month":
        start = new Date(end.getFullYear(), end.getMonth() - 11, 1);
        start.setHours(0, 0, 0, 0);
        if (offset > 0) {
          start.setMonth(start.getMonth() - offset * 12);
          end.setMonth(end.getMonth() - offset * 12);
        }
        break;
      default:
        start.setDate(end.getDate() - 2);
        start.setHours(0, 0, 0, 0);
    }

    setDateRange({ start, end });
  }, [groupBy, offset]);

  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;

  // Fetch chart data
  useEffect(() => {
    if (!selectedDevice || !dateRange.start || !dateRange.end) return;

    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const endDate = dateRange.end > today ? today : dateRange.end;

    const from = formatDate(dateRange.start);
    const to = formatDate(endDate);

    const key = `${selectedDevice}_${groupBy}_${from}_${to}`;

    if (cache[key] && Array.isArray(cache[key])) {
      setChartData(cache[key]);
      return;
    }

    setDataLoading(true);

    dispatch(
      fetchBattery({
        devices: [selectedDevice],
        from,
        to,
        group_by: groupBy,
      })
    )
      .unwrap()
      .then((res) => {
        const newChartData = res?.series?.[0]?.data || res?.data || [];
        setCache((prev) => ({ ...prev, [key]: newChartData }));
        setChartData(newChartData);
      })
      .finally(() => setDataLoading(false));
  }, [selectedDevice, dateRange, groupBy, dispatch, cache]);

  const handleGroupByChange = (val) => {
    setGroupBy(val);
    setOffset(0);
  };

  const formatDateDisplay = (date) =>
    date
      ? date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "";

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    pageStyle: `
      @page { size: A4; margin: 10mm; }
      @media print { .no-print { display: none !important; } }
    `,
  });

  if (isLoading) return <Loader className="h-screen" />;

  return (
    <div className="mt-10 sm:p-8 p-4 relative">
      {/* Hidden printable component */}
      <div className="absolute -left-[9999px]">
        <PowerChartPrint ref={printRef} selectedDevice={selectedDevice} />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="font-medium">Select Device:</span>
          <select
            className="border rounded px-2 py-1 w-48"
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
          >
            {devices?.map((d, i) => {
              const val = typeof d === "string" ? d : d?.name ?? "";
              return (
                <option key={i} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Group by:</span>
          <select
            className="border rounded px-2 py-1 w-32"
            value={groupBy}
            onChange={(e) => handleGroupByChange(e.target.value)}
          >
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
        <button
          className="ml-auto flex items-center gap-2 px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600"
          onClick={handlePrint}
        >
          Print
          <Printer size={16} />
        </button>
      </div>

      {/* Date range navigation */}
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={() => setOffset((o) => o + 1)}
          disabled={isLoading || dataLoading}
          className="px-3 py-2 bg-gray-200 rounded-l hover:bg-gray-300 disabled:opacity-50"
        >
          <ChevronsLeft size={16} />
        </button>
        <div className="px-4 py-1 border-t border-b">
          {formatDateDisplay(dateRange.start)} -{" "}
          {formatDateDisplay(dateRange.end)}
        </div>
        <button
          onClick={() => setOffset((o) => Math.max(0, o - 1))}
          disabled={offset === 0 || isLoading || dataLoading}
          className="px-3 py-2 bg-gray-200 rounded-r hover:bg-gray-300 disabled:opacity-50"
        >
          <ChevronsRight size={16} />
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-96 mt-2">
        <h1 className="text-xl text-center py-2 font-semibold">
          Battery Voltage Report
        </h1>
        <div className="w-full h-80 relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: -20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickFormatter={(value) => {
                  if (groupBy === "hour") {
                    const date = new Date(value);
                    return date.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  } else {
                    // fallback: just show date
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }
                }}
                fontSize={12}
                angle={groupBy === "hour" ? -90 : 0}
                textAnchor={groupBy === "hour" ? "end" : "middle"}
              />
              <YAxis />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" wrapperStyle={{ marginTop: -10, marginLeft: 20 }} />
              <Line
                type="monotone"
                dataKey="voltage"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          {(isChartLoading || dataLoading) && (
            <div className="absolute inset-0 grid place-items-center bg-white/60">
              <Loader className="!h-10 w-10 -translate-y-8" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatteryChart;
