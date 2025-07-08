import React, { useState, useEffect, useRef, useCallback } from "react";
import { Filter } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/milesight-slice";
import Loader from "./Loader";
import FilterModal from "./FilterModal";
import { format } from "date-fns";
import Pagination from "./Pagination";

const Milesight = () => {
  const dispatch = useDispatch();
  const { data, count, isLoading } = useSelector(
    (state) => state.milesight
  );

  const [filters, setFilters] = useState({
    device_name: "",
    date: { from: null, fromTime: null, to: null, toTime: null },
    speed: { min: null, max: null },
    direction: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState({
    device_name: false,
    date: false,
    speed: false,
    direction: false,
  });
  const [onClose, setOnClose] = useState(false);
  const [picture, setPicture] = useState("");
  const imgLnk =
    "https://milesight.trafficiot.com/milesight/storage/app/public/";
  const modalRef = useRef(null);

  // Memoize the fetch function to avoid unnecessary recreations
const fetchDataWithFilters = useCallback(() => {
  dispatch(
    fetchData({
      page: currentPage,
      device_name: filters.device_name.device_name || null,
      start_time: filters.date.from
        ? format(filters.date.from, "yyyy-MM-dd")
        : null,
      end_time: filters.date.to
        ? format(filters.date.to, "yyyy-MM-dd")
        : null,
      start_speed: filters.speed.min,
      end_speed: filters.speed.max,
      direction: filters.direction.direction || null,
    })
  );
}, [currentPage, dispatch, filters]); // Only recreate when these dependencies change

// Fetch immediately when component mounts or filters/page changes
useEffect(() => {
  fetchDataWithFilters();
}, [fetchDataWithFilters]); // This effect runs only when fetchDataWithFilters changes

// Handle the interval based on modal state
useEffect(() => {
  const isAnyModalOpen = Object.values(openFilter).some((isOpen) => isOpen);
  let intervalId;

  if (!isAnyModalOpen) {
    intervalId = setInterval(fetchDataWithFilters, 30000);
  }

  return () => {
    if (intervalId) clearInterval(intervalId);
  };
}, [openFilter, fetchDataWithFilters]); // Restart interval when modal state or fetch function changes

  const handleFilterApply = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page after applying filters
  };

  const handleView = (address) => {
    setPicture(`${imgLnk}${address}`);
    setOnClose(true);
  };

  if (isLoading) return <Loader className="h-screen" />;

  return (
    <div className="mt-14 sm:p-8 p-4">
      <div className="w-full overflow-x-auto">
        {/* Table Header */}
        <div className="min-w-[1200px] flex justify-between items-center bg-indigo-950 text-white font-semibold text-center border-b border-gray-300">
          <div className="w-20 h-14 flex items-center justify-center border-r border-gray-300 px-1">
            Serial
          </div>
          <div className="w-48 h-14 flex items-center justify-center space-x-2 border-r border-gray-300 px-1">
            <span>Device Name</span>
            <Filter
              className="cursor-pointer"
              onClick={() =>
                setOpenFilter({ ...openFilter, device_name: true })
              }
              size={20}
            />
          </div>
          <div className="w-60 h-14 flex items-center justify-center space-x-2 border-r border-gray-300 px-1">
            <span>Time Stamp</span>
            <Filter
              className="cursor-pointer"
              onClick={() => setOpenFilter({ ...openFilter, date: true })}
              size={20}
            />
          </div>
          <div className="w-40 h-14 flex items-center justify-center space-x-2 border-r border-gray-300 px-1">
            <span>Speed</span>
            <Filter
              className="cursor-pointer"
              onClick={() => setOpenFilter({ ...openFilter, speed: true })}
              size={20}
            />
          </div>
          <div className="w-48 h-14 flex items-center justify-center border-r border-gray-300 px-1">
            Event Type
          </div>
          <div className="w-60 h-14 flex items-center justify-center space-x-2 border-r border-gray-300 px-1">
            <span>Direction</span>
            <Filter
              className="cursor-pointer"
              onClick={() => setOpenFilter({ ...openFilter, direction: true })}
              size={20}
            />
          </div>
          <div className="w-48 h-14 flex items-center justify-center border-r border-gray-300 px-1">
            License Plate No
          </div>
          <div className="w-48 h-14 flex items-center justify-center border-r border-gray-300 px-1">
            License Plate
          </div>
          <div className="w-48 h-14 flex items-center justify-center border-r border-gray-300 px-1">
            Vehicle Snapshot
          </div>
          <div className="w-48 h-14 flex items-center justify-center border-r border-gray-300 px-1">
            Full Snapshot
          </div>
          <div className="w-48 h-14 flex items-center justify-center border-r border-gray-300 px-1">
            Violation Snapshot
          </div>
          <div className="w-48 h-14 flex items-center justify-center">
            Vehicle Type
          </div>
        </div>

        {/* Table Body */}
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className={`min-w-[1200px] flex justify-between items-center border-b border-gray-300 ${
                index % 2 ? "bg-gray-100" : ""
              }`}
            >
              <div className="w-20 h-14 flex items-center justify-center border-r border-gray-300 px-1">
                {index + 1 + (currentPage - 1) * 15}
              </div>
              <div className="w-48 h-14 flex items-center justify-center border-r border-gray-300 px-1">
                {item.device_name}
              </div>
              <div className="w-60 h-14 flex items-center justify-center border-r border-gray-300 px-1">
                {item.time}
              </div>
              <div className="w-40 h-14 flex items-center justify-center border-r border-gray-300 px-1">
                {item.speed}
              </div>
              <div className="w-48 h-14 flex items-center justify-center border-r border-gray-300 px-1">
                {item.event_type}
              </div>
              <div className="w-60 h-14 flex items-center justify-center border-r border-gray-300 px-1">
                {item.direction}
              </div>
              <div className="w-48 h-14 flex items-center justify-center border-r border-gray-300 px-1">
                {item.license_plate}
              </div>
              <div
                className="w-48 h-14 flex items-center justify-center border-r border-gray-300 px-1"
                onClick={() =>
                  item.license_plate_snapshot &&
                  handleView(item.license_plate_snapshot)
                }
              >
                {item.license_plate_snapshot ? (
                  <img
                    className="max-h-12 object-contain hover:scale-105 transition-all cursor-pointer"
                    src={`${imgLnk}${item.license_plate_snapshot}`}
                    alt="snapshot"
                  />
                ) : (
                  <span>-</span>
                )}
              </div>
              <div
                className="w-48 h-14 flex items-center justify-center border-r border-gray-300 px-1"
                onClick={() =>
                  item.vehicle_snapshot && handleView(item.vehicle_snapshot)
                }
              >
                {item.vehicle_snapshot ? (
                  <img
                    className="max-h-12 object-contain hover:scale-105 transition-all cursor-pointer"
                    src={`${imgLnk}${item.vehicle_snapshot}`}
                    alt="snapshot"
                  />
                ) : (
                  <span>-</span>
                )}
              </div>
              <div
                className="w-48 h-14 flex items-center justify-center border-r border-gray-300 px-1"
                onClick={() =>
                  item.full_snapshot && handleView(item.full_snapshot)
                }
              >
                {item.full_snapshot ? (
                  <img
                    className="max-h-12 object-contain hover:scale-105 transition-all cursor-pointer"
                    src={`${imgLnk}${item.full_snapshot}`}
                    alt="snapshot"
                  />
                ) : (
                  <span>-</span>
                )}
              </div>
              <div
                className="w-48 h-14 flex items-center justify-center border-r border-gray-300 px-1"
                onClick={() =>
                  item.violation_snapshot && handleView(item.violation_snapshot)
                }
              >
                {item.violation_snapshot ? (
                  <img
                    className="max-h-12 object-contain hover:scale-105 transition-all cursor-pointer"
                    src={`${imgLnk}${item.violation_snapshot}`}
                    alt="snapshot"
                  />
                ) : (
                  <span>-</span>
                )}
              </div>
              <div className="w-48 h-14 flex items-center justify-center">
                {item.vehicle_type}
              </div>
            </div>
          ))}
      </div>

      {Math.ceil(count / 15) > 1 && (
        <div className="p-5 flex flex-wrap justify-center space-x-10 space-4">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(count / 15)}
          />
        </div>
      )}

      {/* Modals */}
      <FilterModal
        type="device_name"
        isOpen={openFilter.device_name}
        currentValue={filters.device_name}
        onClose={() => setOpenFilter({ ...openFilter, device_name: false })}
        onApply={(value) => handleFilterApply("device_name", value)}
      />
      <FilterModal
        type="date"
        isOpen={openFilter.date}
        currentValue={filters.date}
        onClose={() => setOpenFilter({ ...openFilter, date: false })}
        onApply={(value) => handleFilterApply("date", value)}
      />
      <FilterModal
        type="speed"
        isOpen={openFilter.speed}
        currentValue={filters.speed}
        onClose={() => setOpenFilter({ ...openFilter, speed: false })}
        onApply={(value) => handleFilterApply("speed", value)}
      />
      <FilterModal
        type="direction"
        isOpen={openFilter.direction}
        currentValue={filters.direction}
        onClose={() => setOpenFilter({ ...openFilter, direction: false })}
        onApply={(value) => handleFilterApply("direction", value)}
      />
      {onClose && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-10">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-50"></div>

          {/* Modal Content */}
          <div
            className="relative bg-white rounded-lg shadow-lg"
            ref={modalRef}
          >
            <img
              className="max-w-full max-h-screen"
              src={picture}
              alt="Preview"
            />
          </div>

          {/* Close Button */}
          <button
            className="absolute top-5 right-5 p-2 text-white bg-slate-600 rounded-full hover:bg-red-600"
            onClick={() => setOnClose(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Milesight;
