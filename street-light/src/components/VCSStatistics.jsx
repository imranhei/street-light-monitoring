import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
  "#ea580c",
  "#4f46e5",
];

export default function VCSStatistics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVehicleCounts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://milesight.trafficiot.com/api/vehicle-counts");
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const json = await res.json();

      if (json?.status && Array.isArray(json.results)) {
        setData(json.results);
      } else {
        throw new Error(json?.message || "Invalid API response");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch vehicle counts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleCounts();
  }, []);

  const summary = useMemo(() => {
    if (!data.length) {
      return {
        totalVehicle: 0,
        totalCars: 0,
        totalMotorbikes: 0,
        totalBuses: 0,
        totalTrucks: 0,
        totalVans: 0,
        totalSUVs: 0,
        totalOther: 0,
      };
    }

    return data.reduce(
      (acc, item) => {
        acc.totalVehicle += Number(item.total_vehicle || 0);
        acc.totalCars += Number(item.car || 0);
        acc.totalMotorbikes += Number(item.motorbike || 0);
        acc.totalBuses += Number(item.bus || 0);
        acc.totalTrucks += Number(item.truck || 0);
        acc.totalVans += Number(item.van || 0);
        acc.totalSUVs += Number(item.suv || 0);
        acc.totalOther += Number(item.other || 0);
        return acc;
      },
      {
        totalVehicle: 0,
        totalCars: 0,
        totalMotorbikes: 0,
        totalBuses: 0,
        totalTrucks: 0,
        totalVans: 0,
        totalSUVs: 0,
        totalOther: 0,
      }
    );
  }, [data]);

  const totalByDeviceChart = useMemo(() => {
    return data.map((item) => ({
      name: `${item.device_name} (${item.detection_region_name || item.detection_region})`,
      total_vehicle: Number(item.total_vehicle || 0),
      car: Number(item.car || 0),
      motorbike: Number(item.motorbike || 0),
      bus: Number(item.bus || 0),
      truck: Number(item.truck || 0),
      van: Number(item.van || 0),
      suv: Number(item.suv || 0),
      other: Number(item.other || 0),
      time: item.time,
    }));
  }, [data]);

  const classBreakdownChart = useMemo(() => {
    if (!data.length) return [];

    const totals = data.reduce(
      (acc, item) => {
        acc.small += Number(item.count_type_small_vehicle || 0);
        acc.medium += Number(item.count_type_medium_vehicle || 0);
        acc.large += Number(item.count_type_large_vehicle || 0);
        acc.motorcycle += Number(item.count_type_motorcycle || 0);
        acc.non_motor += Number(item.count_type_non_motor || 0);
        return acc;
      },
      {
        small: 0,
        medium: 0,
        large: 0,
        motorcycle: 0,
        non_motor: 0,
      }
    );

    return [
      { name: "Small", value: totals.small },
      { name: "Medium", value: totals.medium },
      { name: "Large", value: totals.large },
      { name: "Motorcycle", value: totals.motorcycle },
      { name: "Non-motor", value: totals.non_motor },
    ];
  }, [data]);

  const detailedTypeChart = useMemo(() => {
    return [
      { name: "Car", value: summary.totalCars },
      { name: "Motorbike", value: summary.totalMotorbikes },
      { name: "Bus", value: summary.totalBuses },
      { name: "Truck", value: summary.totalTrucks },
      { name: "Van", value: summary.totalVans },
      { name: "SUV", value: summary.totalSUVs },
      { name: "Other", value: summary.totalOther },
    ];
  }, [summary]);

  const trendChart = useMemo(() => {
    return [...data]
      .sort((a, b) => new Date(a.time) - new Date(b.time))
      .map((item) => ({
        time: formatDateTime(item.time),
        total_vehicle: Number(item.total_vehicle || 0),
        car: Number(item.car || 0),
        truck: Number(item.truck || 0),
        suv: Number(item.suv || 0),
      }));
  }, [data]);

  function formatDateTime(value) {
    if (!value) return "-";
    const d = new Date(value.replace(" ", "T"));
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleString();
  }

  const StatCard = ({ title, value }) => (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-medium text-gray-700">Loading vehicle counts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
            <p className="text-lg font-semibold text-red-700">Failed to load data</p>
            <p className="mt-2 text-sm text-red-600">{error}</p>
            <button
              onClick={fetchVehicleCounts}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen sm:mt-8 mt-12 sm:p-10 p-4">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vehicle Count Dashboard</h1>
            <p className="text-sm text-gray-500">
              Visualizing data from your vehicle-count API
            </p>
          </div>

          <button
            onClick={fetchVehicleCounts}
            className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Vehicles" value={summary.totalVehicle} />
          <StatCard title="Total Cars" value={summary.totalCars} />
          <StatCard title="Total SUVs" value={summary.totalSUVs} />
          <StatCard title="Total Trucks" value={summary.totalTrucks} />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Total by device/lane */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Total Vehicles by Device / Lane
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={totalByDeviceChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-15} textAnchor="end" height={70} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total_vehicle" name="Total Vehicle" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Vehicle class breakdown */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Vehicle Class Breakdown
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={classBreakdownChart}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                    label
                  >
                    {classBreakdownChart.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed type breakdown */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Detailed Vehicle Type Breakdown
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={detailedTypeChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trend chart */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Vehicle Trend Over Time
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total_vehicle" stroke="#2563eb" strokeWidth={3} name="Total" />
                  <Line type="monotone" dataKey="car" stroke="#16a34a" name="Car" />
                  <Line type="monotone" dataKey="truck" stroke="#dc2626" name="Truck" />
                  <Line type="monotone" dataKey="suv" stroke="#f59e0b" name="SUV" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Data table */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Latest Records</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Device</th>
                  <th className="px-4 py-3 text-left">Lane</th>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-right">Total</th>
                  <th className="px-4 py-3 text-right">Car</th>
                  <th className="px-4 py-3 text-right">SUV</th>
                  <th className="px-4 py-3 text-right">Truck</th>
                  <th className="px-4 py-3 text-right">Bus</th>
                  <th className="px-4 py-3 text-right">Van</th>
                  <th className="px-4 py-3 text-right">Other</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{item.device_name}</td>
                    <td className="px-4 py-3">{item.detection_region_name}</td>
                    <td className="px-4 py-3">{formatDateTime(item.time)}</td>
                    <td className="px-4 py-3 text-right">{item.total_vehicle}</td>
                    <td className="px-4 py-3 text-right">{item.car}</td>
                    <td className="px-4 py-3 text-right">{item.suv}</td>
                    <td className="px-4 py-3 text-right">{item.truck}</td>
                    <td className="px-4 py-3 text-right">{item.bus}</td>
                    <td className="px-4 py-3 text-right">{item.van}</td>
                    <td className="px-4 py-3 text-right">{item.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}