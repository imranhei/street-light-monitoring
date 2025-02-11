import React, { useState, useEffect } from "react";
import { fetchDeviceName } from "../redux/milesight-slice";
import { useDispatch } from "react-redux";

const FilterModal = ({ type, isOpen, onClose, onApply, currentValue }) => {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState(
    type === "date"
      ? { from: null, to: null }
      : type === "speed"
      ? { min: null, max: null }
      : { direction: "" }
  );
  const [deviceName, setDeviceName] = useState([]);

  useEffect(() => {
    if (isOpen && type === "device_name") {
      dispatch(fetchDeviceName())
        .then((data) => {
          setDeviceName(data.payload.device_names);
        });
    }
  }, [isOpen, type, dispatch]);

  // ✅ Sync with currentValue when modal opens
  useEffect(() => {
    if (isOpen) {
      setFilterValue(currentValue || {});
    }
  }, [isOpen, currentValue]);

  const handleApply = () => {
    onApply(filterValue);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-10">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-lg shadow-lg w-96 p-5 z-50">
        <h3 className="text-lg font-semibold mb-4">
          {type === "device_name"
            ? "Filter by Device Name"
            : type === "date"
            ? "Filter by Date"
            : type === "speed"
            ? "Filter by Speed"
            : "Filter by Direction"}
        </h3>

        {/* Device Name Filter */}
        {type === "device_name" && (
          <div>
            <label className="block text-sm font-medium">Device Name</label>
            <select
              className="mt-1 block w-full border rounded focus:border-indigo-500 focus:ring-indigo-500 h-8"
              value={filterValue.device_name || ""}
              onChange={(e) =>
                setFilterValue((prev) => ({
                  ...prev,
                  device_name: e.target.value,
                }))
              }
            >
              <option value="">Select Device</option>
              {deviceName.map((device) => (
                <option key={device} value={device}>
                  {device}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Date Filter */}
        {type === "date" && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                className="mt-1 block w-full border rounded focus:outline-none h-8"
                value={filterValue.from || ""}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, from: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                className="mt-1 block w-full border rounded focus:outline-none h-8"
                value={filterValue.to || ""}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, to: e.target.value }))
                }
              />
            </div>
          </div>
        )}

        {/* Speed Filter */}
        {type === "speed" && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium">Min Speed</label>
              <input
                type="number"
                className="mt-1 block w-full border rounded focus:outline-none h-8"
                value={filterValue.min || ""}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, min: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Max Speed</label>
              <input
                type="number"
                className="mt-1 block w-full border rounded focus:outline-none h-8"
                value={filterValue.max || ""}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, max: e.target.value }))
                }
              />
            </div>
          </div>
        )}

        {/* Direction Filter */}
        {type === "direction" && (
          <div>
            <label className="block text-sm font-medium">Direction</label>
            <select
              className="mt-1 block w-full border rounded focus:border-indigo-500 focus:ring-indigo-500 h-8"
              value={filterValue.direction || ""}
              onChange={(e) =>
                setFilterValue((prev) => ({
                  ...prev,
                  direction: e.target.value,
                }))
              }
            >
              <option value="">Select Direction</option>
              <option value="Away">Away</option>
              <option value="Approach">Approach</option>
            </select>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
