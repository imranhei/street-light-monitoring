import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlarms } from "../redux/alarm-slice";
import Loader from "./Loader";

const Alarm = () => {
  const dispatch = useDispatch();
  const { alarms, isLoading, count } = useSelector((state) => state.alarm);
  const [editData, setEditData] = useState(null);
  const [statusOption, setStatusOption] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAlarms());
  }, [dispatch]);

  const handleEdit = async (id) => {
    const item = alarms.find((item) => item.id === id);
    setEditData(item);
  };

  const handleSaveComment = (editData) => {
    setStatusOption(false);
    fetch(`https://backend.trafficiot.com/api/alarms/${editData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comments: editData.comments,
        status: editData.status,
      }),
    })
      .then((response) => {
        if (response.ok) {
          dispatch(fetchAlarms(currentPage));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setEditData(null);
  };

  const handleCancelEdit = () => {
    setStatusOption(false);
    setEditData(null);
  };

  const handleDelete = (id) => {
    fetch(`https://backend.trafficiot.com/api/alarms/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          dispatch(fetchAlarms(currentPage));
        } else {
          console.error("Error deleting alarm");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
    dispatch(fetchAlarms(selected + 1));
  };

  return (
    <div className="mt-12 m-4">
      <h1 className="text-center font-extrabold text-3xl py-4">ALARMS</h1>
      {isLoading ? <Loader className="h-[65vh]"/> : <div className="overflow-x-auto">
        <div className="flex justify-between border mb-2 bg-indigo-950 text-white font-semibold text-center min-w-[1184px]">
          <div className="w-16 p-1 py-2">Serial</div>
          <div className="w-64 p-1 py-2">Message</div>
          <div className="w-64 p-1 py-2">Comment</div>
          <div className="w-60 p-1 py-2">Device Info</div>
          <div className="w-36 p-1 py-2">Time</div>
          <div className="w-24 p-1 py-2">Status</div>
          <div className="w-32 p-1 py-2">Action</div>
        </div>
        {alarms && alarms.length > 0 &&
          alarms.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border mb-1 text-center bg-white shadow items-center min-w-[1184px]"
            >
              <div className="w-16 p-1">
                {index + 1 + (currentPage - 1) * 15}
              </div>
              <div className="w-64 p-1 text-left">{item.message}</div>
              <div className="w-64 p-1 text-left">{item.comments}</div>
              <div className="w-60 p-1">
                Device: {JSON.parse(item.area_info).deviceName}, Channel:{" "}
                {JSON.parse(item.area_info).channel}
              </div>
              <div className="w-36 p-1">{item.timestamps}</div>
              <div
                className={`w-24 p-1 ${
                  item.status === "pending"
                    ? "text-red-500"
                    : item.status === "in progress"
                    ? "text-blue-500"
                    : "text-green-500"
                }`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </div>
              <div className="w-32 p-1">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-3 mr-2 rounded"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-2 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>}

      {editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 w-2/3 rounded">
            <h2 className="text-xl font-bold mb-2">Edit Data</h2>
            <p>Message: {editData.message}</p>
            <div className="mb-2">
              <label className="block mb-2">Comment:</label>
              <textarea
                className="border rounded w-full h-20 p-2 max-h-80 outline-none"
                value={editData.comments === null ? "" : editData.comments}
                onChange={(e) =>
                  setEditData({ ...editData, comments: e.target.value })
                }
              ></textarea>
            </div>
            <div className="px-1 flex items-center relative">
              <p>Status:</p>
              <div
                onClick={() => setStatusOption(!statusOption)}
                className="flex ml-2 items-center border pl-2 rounded cursor-pointer shadow-sm"
              >
                <p className="w-20">
                  {editData.status.charAt(0).toUpperCase() +
                    editData.status.slice(1)}
                </p>
                <svg
                  className="rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="m7 14l5-5l5 5H7Z" />
                </svg>
              </div>
              <ul
                className={`absolute left-14 top-7 bg-white border rounded-sm shadow cursor-pointer ${
                  statusOption ? "" : "hidden"
                }`}
              >
                <li
                  onClick={() =>
                    setEditData({ ...editData, status: "Pending" })
                  }
                  className={`hover:bg-blue-500 hover:text-white px-5`}
                >
                  Pending
                </li>
                <li
                  onClick={() =>
                    setEditData({ ...editData, status: "In progress" })
                  }
                  className={`hover:bg-blue-500 hover:text-white px-5`}
                >
                  In progress
                </li>
                <li
                  onClick={() => setEditData({ ...editData, status: "Solved" })}
                  className={`hover:bg-blue-500 hover:text-white px-5`}
                >
                  Solved
                </li>
              </ul>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 mr-2 rounded"
                onClick={() => handleSaveComment(editData)}
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`flex justify-center items-center my-4 ${
          count > 15 ? "" : "hidden"
        }`}
      >
        <ReactPaginate
          breakLabel={"..."}
          pageCount={Math.ceil((count || 0) / 15)}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          previousLabel="Previous"
          nextLabel="Next"
          previousLinkClassName="px-2 py-1 rounded-sm bg-blue-500 text-white"
          nextLinkClassName="px-2 py-1 rounded-sm bg-blue-500 text-white"
          activeClassName="bg-blue-500 text-white py-[3px]"
          pageLinkClassName="p-2"
          className="flex gap-2 items-center"
        />
      </div>
    </div>
  );
};

export default Alarm;
