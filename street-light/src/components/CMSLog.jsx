import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import Pagination from "./Pagination";

const CMSLog = () => {
  const wrapperRef = useRef(null);

  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [eventType, setEventType] = useState("event");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [searchItems, setSearchItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");

  const link = "https://milesight.trafficiot.com/api/cms-events";

  const fetchData = useCallback(
    async (type, page, deviceName = "") => {
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
          const result = await response.json();
          setData(result.results || []);
          setTotalPage(Math.ceil((result.count || 0) / 10));
        }
      } catch (error) {
        console.error("Error fetching CMS logs:", error);
      } finally {
        setLoading(false);
      }
    },
    [link],
  );

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

  const handleSelectChange = (e) => {
    setEventType(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = async (searchTerm) => {
    setSearch(searchTerm);

    if (searchTerm.trim() !== "") {
      try {
        const response = await fetch(
          `${link}?event_type=${eventType}&device_name=${searchTerm}&only_device_name=true`,
        );

        if (response.ok) {
          const result = await response.json();
          setSearchItems(result.results || []);
        }
      } catch (error) {
        console.error("Error searching CMS device:", error);
      }
    } else {
      setSearchItems([]);
    }
  };

  const handleSelect = (item) => {
    setSelectedDevice(item);
    setSearch(item);
    setSearchItems([]);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSelectedDevice("");
    setSearch("");
    setSearchItems([]);
    setCurrentPage(1);
  };

  if (loading) return <Loader className="h-screen" />;

  return (
    <div className="sm:mt-8 mt-12 sm:p-10 p-4">
      <div className="flex w-full justify-between pb-2 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <p>CMS Event Type:</p>

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
              className="border rounded-md px-2 py-1 w-full outline-none pr-9"
              placeholder="Search Device Name"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />

            <div className="absolute top-0 p-1 w-8 right-0 rounded-r bg-gray-200 h-full flex items-center justify-center">
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="min-w-[900px]">
          {/* Header */}
          <div className="grid grid-cols-[70px_160px_minmax(300px,1fr)_140px_180px] bg-indigo-950 text-white text-sm font-semibold border-b">
            <div className="px-4 py-3 text-center">#</div>
            <div className="px-4 py-3">Device Name</div>
            <div className="px-4 py-3">CMS Event Description</div>
            <div className="px-4 py-3 text-center">Event Type</div>
            <div className="px-4 py-3">Timestamp</div>
          </div>

          {/* Rows */}
          {data.map((item, index) => (
            <div
              key={item.id || index}
              className="grid grid-cols-[70px_160px_minmax(300px,1fr)_140px_180px] items-center border-b last:border-b-0 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="px-4 py-3 text-center text-gray-500">
                {(currentPage - 1) * 10 + index + 1}
              </div>

              <div className="px-4 py-3 font-medium text-gray-900 truncate">
                {item.device_name}
              </div>

              <div className="px-4 py-3 text-gray-600 break-all leading-relaxed">
                {item.event_desc}
              </div>

              <div className="px-4 py-3 text-center">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    item.event_type?.toLowerCase() === "error"
                      ? "bg-red-100 text-red-700"
                      : item.event_type?.toLowerCase() === "warning"
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
            </div>
          ))}
        </div>
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

export default CMSLog;
