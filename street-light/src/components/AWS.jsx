import React, { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";

const AWS = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [switchData, setSwitchData] = useState(0);
  const [eventType, setEventType] = useState("event");
  const [currentPage, setCurrentPage] = useState(1);
  const link = "https://milesight.trafficiot.com/api/events";

  // Memoized fetch function to prevent unnecessary recreations
  const fetchData = useCallback(async (type = eventType, page = currentPage) => {
    try {
      const response = await fetch(`${link}?event_type=${type}&page=${page}`);
      if (response.ok) {
        const data = await response.json();
        setData(data.results);
        setTotalPage(Math.ceil(data.count / 10)); // Use Math.ceil for proper page count
        setTotal(data.count);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }, [eventType, currentPage]);

  // Fetch data on mount and when eventType changes
  useEffect(() => {
    fetchData();
    
    // Time interval
    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchData]);

  // Handle event type change
  const handleSelectChange = (e) => {
    setEventType(e.target.value);
    setCurrentPage(1); // Reset to first page when changing event type
  };

  // Handle page click
  const handlePageClick = (e) => {
    const newPage = e.selected + 1;
    setCurrentPage(newPage);
  };

  // Fetch switch data (only on mount)
  const fetchSwitchData = useCallback(async () => {
    try {
      const response = await fetch("https://milesight.trafficiot.com/api/values");
      if (response.ok) {
        const data = await response.json();
        setSwitchData(data?.data[0]?.value);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchSwitchData();
  }, [fetchSwitchData]);

  const lighttrigger = async () => {
    try {
      const response = await fetch(
        "https://milesight.trafficiot.com/api/values/1",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: switchData ? 0 : 1,
          }),
        }
      );
      if (response.ok) {
        fetchSwitchData();
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div className="mt-8 p-10">
      <div className="flex w-full justify-between pb-2">
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
        </div>
        <div className="flex items-center mb-2">
          <span className="text-sm font-semibold pr-2">Display Status: </span>
          <button
            className={`relative focus:outline-none w-10 h-6 transition-colors duration-300 ease-in-out ${
              switchData ? "bg-blue-400" : "bg-gray-300"
            } rounded-full`}
            onClick={lighttrigger}
          >
            <span
              className={`inline-block w-4 h-4 mt-1 transform transition-transform duration-300 ease-in-out ${
                switchData ? "translate-x-2" : "-translate-x-2"
              } bg-white rounded-full`}
            ></span>
          </button>
          <span className="ml-2 text-sm font-semibold">
            {switchData ? "On" : "Off"}
          </span>
        </div>
      </div>
      <div className="">
        <div className="flex justify-between border mb-2 bg-indigo-950 text-white font-semibold text-center min-w-[752px]">
          <div className="w-12 p-1 py-2">Serial</div>
          <div className="w-60 p-1 py-2">Device Name</div>
          <div className="w-48 p-1 py-2">Event Description</div>
          <div className="w-48 p-1 py-2">Event Type</div>
          <div className="w-36 p-1 py-2">Time</div>
        </div>
        {data &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between border mb-2 min-w-[752px]"
              >
                <div className="w-12 p-1 py-2 text-center">{1 + index}</div>
                <div className="w-60 p-1 py-2">{item.device_name}</div>
                <div className="w-48 p-1 py-2">{item.event_desc}</div>
                <div className="w-48 p-1 py-2 text-center">
                  {item.event_type}
                </div>
                <div className="w-36 p-1 py-2">{item.time_stamp}</div>
              </div>
            );
          })}
      </div>
      <div
        className={`flex justify-center my-4 ${totalPage > 1 ? "" : "hidden"}`}
      >
        <ReactPaginate
          breakLabel={"..."}
          pageCount={totalPage}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          previousLabel="Previous"
          nextLabel="Next"
          previousLinkClassName="px-2 py-px rounded-sm bg-blue-500 text-white"
          nextLinkClassName="px-2 py-px rounded-sm bg-blue-500 text-white"
          activeClassName="bg-blue-500 text-white"
          pageLinkClassName="p-2"
          className="flex gap-2"
        />
      </div>
    </div>
  );
};

export default AWS;