import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { fetchTemperature, deleteTemperature } from "../redux/temperature-slice";

const Temperature = () => {
  const dispatch = useDispatch();

  const { data, last_page, isLoading } = useSelector((state) => state.temperature);

  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  // Fetch data on page load + pagination change
  useEffect(() => {
    dispatch(fetchTemperature(currentPage));
  }, [currentPage]);

  // Delete one
  const confirmDeleteAction = () => {
    dispatch(deleteTemperature({ id: confirmDelete.id }))
      .then(() => dispatch(fetchTemperature(currentPage)))
      .finally(() => setConfirmDelete({ open: false, id: null }));
  };

  return (
    <div className="mt-10 sm:p-8 p-4 relative">
      <h1 className="text-xl font-bold mb-5">Temperature Records</h1>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200">
            <tr className="text-gray-800">
              <th className="px-4 py-2">S/N</th>
              <th className="px-4 py-2">Device Name</th>
              <th className="px-4 py-2">Temperature (°C)</th>
              <th className="px-4 py-2">Recorded At</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : data?.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No temperature records found.
                </td>
              </tr>
            ) : (
              data?.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.device_name}</td>
                  <td className="px-4 py-3">{item.home_temp}</td>
                  <td className="px-4 py-3">{item.recorded_at}</td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() =>
                        setConfirmDelete({ open: true, id: item.id })
                      }
                      className="text-red-500 hover:underline"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm Delete Modal */}
      {confirmDelete.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
            <h2 className="text-lg font-semibold mb-3">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this temperature record?
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setConfirmDelete({ open: false, id: null })}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAction}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {last_page > 1 && (
        <div className="p-5">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={last_page}
          />
        </div>
      )}
    </div>
  );
};

export default Temperature;
