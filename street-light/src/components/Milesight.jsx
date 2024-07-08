import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";

const Milesight = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [from, setFrom] = useState(1);
  const [onClose, setOnClose] = useState(false);
  const [picture, setPicture] = useState();
  const link = "https://milesight.trafficiot.com/api/traffic-events";
  const modalRef = useRef(null);

  useEffect(() => {
    fetchData();
    //Time interval
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () =>
      //clearInterval(interval);
      {
        clearInterval(interval);
      };
  }, []);

  useEffect(() => {
    if (totalPage > 0) {
      fetchPage(1);
    }
  }, [totalPage, total]);

  const fetchData = async () => {
    try {
      const response = await fetch(link);
      if (response.ok) {
        response.json().then((data) => {
          setTotalPage(data.last_page);
          setTotal(data.total);
        });
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchPage = async (page) => {
    try {
      const response = await fetch(link + "?page=" + page);
      if (response.ok) {
        response.json().then((data) => {
          setData(data.data);
          setFrom(data.from);
        });
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handlePageClick = (e) => {
    fetchPage(e.selected + 1);
  };

  const handleView = (address) => {
    setPicture(address);
    setOnClose(true);
  };

  return (
    <div className="mt-14 p-10">
      <div className="">
        <div className="flex justify-between border mb-2 bg-indigo-950 text-white font-semibold text-center min-w-[752px]">
          <div className="w-12 p-1 py-2">Serial</div>
          <div className="w-60 p-1 py-2">License Plate</div>
          <div className="w-48 p-1 py-2">Snapshot</div>
          <div className="w-48 p-1 py-2">Plate Type</div>
          <div className="w-48 p-1 py-2">Detection Region</div>
          <div className="w-36 p-1 py-2">Time</div>
          <div className="w-32 p-1 py-2">Operation</div>
        </div>
        {data &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between border mb-2 min-w-[752px]"
              >
                <div className="w-12 p-1 py-2 text-center">{from + index}</div>
                <div className="w-60 p-1 py-2">{item.license_plate}</div>
                <div className="w-48 p-1 py-2">
                  <img
                    className="w-auto h-12"
                    src={item.target_jpg}
                    alt="snapshot"
                  />
                </div>
                <div className="w-48 p-1 py-2">{item.plate_type}</div>
                <div className="w-48 p-1 py-2 text-center">{item.region}</div>
                <div className="w-36 p-1 py-2">{item.time}</div>
                <div className="w-32 p-1 py-2">
                  <button className="bg-green-500 px-2 py-1 rounded text-white" onClick={() => handleView(item.violation_jpg)}>
                    View Details
                  </button>
                </div>
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
      {onClose && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-10">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className="relative bg-white rounded-lg shadow-lg"
            ref={modalRef}
          >
            <button
              className="absolute top-2 right-2 text-white hover:text-red-500"
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
            <img
              className="max-w-full max-h-screen"
              src={picture}
              alt="Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Milesight;
