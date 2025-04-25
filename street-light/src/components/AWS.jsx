import React, { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import Loader from "./Loader";

const AWS = () => {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [switchData, setSwitchData] = useState(0);
  const [eventType, setEventType] = useState("event");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const link = "https://milesight.trafficiot.com/api/events";

  // Memoized fetch function to prevent unnecessary recreations
  const fetchData = useCallback(
    async (type = eventType, page = currentPage) => {
      try {
        setLoading(true);
        const response = await fetch(`${link}?event_type=${type}&page=${page}`);
        if (response.ok) {
          const data = await response.json();
          setData(data.results);
          setTotalPage(Math.ceil(data.count / 10)); // Use Math.ceil for proper page count
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [eventType, currentPage]
  );

  // Fetch data on mount and when eventType changes
  useEffect(() => {
    fetchData();

    // Time interval
    // const interval = setInterval(() => {
    //   fetchData();
    // }, 60000);

    // return () => clearInterval(interval);
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
      const response = await fetch(
        "https://milesight.trafficiot.com/api/values"
      );
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

  // Trigger modal and set selected ID
  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const deleteData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://milesight.trafficiot.com/api/events/${selectedId}`,
        {
          method: "DELETE",
        }
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

  if (loading) return <Loader className="h-screen" />;

  return (
    <div className="mt-8 p-10">
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
        <div className="flex justify-between border mb-2 bg-indigo-950 text-white font-semibold text-center min-w-[832px]">
          <div className="w-12 p-1 py-2">Serial</div>
          <div className="w-60 p-1 py-2">Device Name</div>
          <div className="w-48 p-1 py-2">Event Description</div>
          <div className="w-48 p-1 py-2">Event Type</div>
          <div className="w-36 p-1 py-2">Time</div>
          {eventType === "error" && <div className="w-20 p-1 py-2">Action</div>}
        </div>
        {data &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between border mb-2 min-w-[832px]"
              >
                <div className="w-12 p-1 py-2 text-center">{1 + index}</div>
                <div className="w-60 p-1 py-2">{item.device_name}</div>
                <div className="w-48 p-1 py-2">{item.event_desc}</div>
                <div className="w-48 p-1 py-2 text-center">
                  {item.event_type}
                </div>
                <div className="w-36 p-1 py-2">{item.time_stamp}</div>
                {eventType === "error" && (
                  <div className="w-20 p-1 py-1 text-center flex items-center justify-center">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                      onClick={() => confirmDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
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
