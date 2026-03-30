import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import Pagination from "./Pagination";

const VCSLogs = () => {
  const wrapperRef = useRef(null);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [switchData, setSwitchData] = useState(0);
  const [eventType, setEventType] = useState("event");
  // const [selectedEventType, setSelectedEventType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchItems, setSearchItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const link = "https://milesight.trafficiot.com/api/lidar-events2";

  const fetchData = useCallback(async (type, page, deviceName = "") => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        event_type: type,
        page: page,
      });

      if (deviceName) {
        queryParams.append("device_name", deviceName);
      }

      const response = await fetch(`${link}?${queryParams.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setData(data.results);
        setTotalPage(Math.ceil(data.count / 10));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(eventType, currentPage, selectedDevice);
  }, [eventType, currentPage, selectedDevice, fetchData]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSearchItems([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle event type change
  const handleSelectChange = (e) => {
    setEventType(e.target.value);
    setCurrentPage(1); // triggers fetch through useEffect
  };

  // Trigger modal and set selected ID
  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const deleteData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://milesight.trafficiot.com/api/lidar-events/${selectedId}`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        fetchData();
        setShowModal(false);
        setSelectedId(null);
      }
    } catch (error) {
      console.log("Error deleting data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    setSearch(searchTerm);
    if (searchTerm.trim() !== "") {
      const response = await fetch(
        `https://milesight.trafficiot.com/api/lidar-events?event_type=${eventType}&device_name=${searchTerm}&only_device_name=true`,
      );
      if (response.ok) {
        const data = await response.json();
        setSearchItems(data.results);
      }
    } else {
      setSearchItems([]);
    }
  };

  const handleSelect = async (item) => {
    setSelectedDevice(item); // store selected device
    setSearch(item); // set in input
    setSearchItems([]);
    setCurrentPage(1); // reset page
  };

  if (loading) return <Loader className="h-screen" />;

  return (
    <div className="sm:mt-8 mt-12 sm:p-10 p-4">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={deleteData}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full justify-between pb-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <p>Event Type:</p>
          <select
            className="border rounded-md px-2 py-1"
            value={eventType}
            onChange={handleSelectChange}
          >
            <option value="event">Event</option>
            <option value="error">Error</option>
          </select>

          <div className="relative sm:w-60 rounded-md" ref={wrapperRef}>
            <input
              type="text"
              className="border rounded-md px-2 py-1 w-full outline-none"
              placeholder="Search Device Name"
              value={search}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
            <div className="absolute top-0 p-1 w-8 right-0 rounded-r bg-gray-200 h-full">
              <Search size={20} />
            </div>

            {searchItems?.length > 0 && (
              <ul className="absolute z-20 bg-white border rounded w-full mt-0 max-h-40 overflow-y-auto shadow-lg">
                {searchItems.map((item, index) => (
                  <li
                    key={index}
                    className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelect(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() => {
              setSelectedDevice("");
              setSearch("");
              setCurrentPage(1);
            }}
          >
            Clear
          </button>
        </div>
      </div>
      <div className=" overflow-x-auto">
        {data && data.length > 0 && (
          <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="min-w-[790px]">
              {/* Header */}
              <div className="grid grid-cols-[70px_180px_1.5fr_140px_180px] bg-indigo-950 text-white text-sm font-semibold border-b">
                <div className="px-4 py-3 text-center">#</div>
                <div className="px-4 py-3">Device Name</div>
                <div className="px-4 py-3">Event Description</div>
                <div className="px-4 py-3 text-center">Event Type</div>
                <div className="px-4 py-3">Timestamp</div>
                {/* <div className="px-4 py-3 text-center">
                    {eventType === "error" && !loading ? "Action" : ""}
                </div> */}
              </div>

              {/* Rows */}
              {data.map((item, index) => (
                <div
                  key={item.id || index}
                  className="grid grid-cols-[70px_180px_1.5fr_140px_180px] items-center border-b last:border-b-0 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="px-4 py-3 text-center text-gray-500">
                    {(currentPage - 1) * 10 + index + 1}
                  </div>

                  <div className="px-4 py-3 font-medium text-gray-900 truncate">
                    {item.device_name}
                  </div>

                  <div className="px-4 py-3 text-gray-600 break-words">
                    {item.event_desc}
                  </div>

                  <div className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        item.event_type === "Error"
                          ? "bg-red-100 text-red-700"
                          : item.event_type === "warning"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.event_type}
                    </span>
                  </div>

                  <div className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {item.time_stamp}
                  </div>

                  {/* <div className="px-4 py-3 flex justify-center">
                    {eventType === "error" && !loading && (
                    <button
                        className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 transition-colors"
                        onClick={() => confirmDelete(item.id)}
                    >
                        Delete
                    </button>
                    )}
                </div> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {totalPage > 1 && (
        <div className="p-5">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPage}
          />
        </div>
      )}
    </div>
  );
};

export default VCSLogs;
