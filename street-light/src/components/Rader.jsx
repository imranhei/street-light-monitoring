import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Milesight = () => {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const link = "https://milesight.trafficiot.com/api/events";

  useEffect(() => {
    fetchData(link);
  }, [link]);

  const fetchData = async (link) => {
    if (!link) return;
    try {
      const response = await fetch(link);
        if (response.ok) {
          response.json().then((data) => {
            setNextPage(data.next);
            setPrevPage(data.previous);
            setData(data.results);
          });
        }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div className="mt-14 p-10">
      <div className="">
        <div className="flex justify-between border mb-2 bg-indigo-950 text-white font-semibold text-center min-w-[752px]">
          <div className="w-12 p-1 py-2">Serial</div>
          <div className="w-48 p-1 py-2">Device Name</div>
          <div className="w-60 p-1 py-2">Time Stamp</div>
          <div className="w-48 p-1 py-2">Event Type</div>
          <div className="w-60 p-1 py-2">Description</div>
        </div>
        {data &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between border mb-2 min-w-[752px]"
              >
                <div className="w-12 p-1 py-2 text-center">{index+1}</div>
                <div className="w-48 p-1 py-2">{item.device_name}</div>
                <div className="w-60 p-1 py-2">{item.time_stamp}</div>
                <div className="w-48 p-1 py-2 text-center">
                  {item.event_type}
                </div>
                <div className="w-60 p-1 py-2">{item.event_desc}</div>
              </div>
            );
          })}
      </div>
      
      <div className="flex gap-5 my-5 float-right">
        <button onClick={() => fetchData(prevPage)} className="bg-blue-500 rounded text-white font-semibold w-20 py-1 hover:bg-blue-600" disabled={!prevPage}>Previous</button>
        <button onClick={() => fetchData(nextPage)} className="bg-blue-500 rounded text-white font-semibold w-20 py-1 hover:bg-blue-600" disabled={!nextPage}>Next</button>
      </div>
    </div>
  );
};

export default Milesight;
