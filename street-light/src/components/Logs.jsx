import { Download, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import { deleteLog, fetchLogs } from "../redux/logs-slice";
import TokenService from "../secureStore/refreshToken";

const Logs = () => {
  const dispatch = useDispatch();

  const { data, last_page, isLoading } = useSelector((state) => state.logs);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });
  const [loadingAction, setLoadingAction] = useState({
    view: null,
    download: null,
  });

  // Fetch logs when page changes
  useEffect(() => {
    dispatch(fetchLogs(currentPage));
  }, [currentPage]);

  // Handle select checkbox
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds?.length === data?.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data?.map((item) => item?.id));
    }
  };

  // Delete single log
  const handleDelete = (id) => {
    dispatch(deleteLog({ id })).then(() => dispatch(fetchLogs(currentPage)));
  };

  // Delete multiple logs
  const handleDeleteSelected = () => {
    if (selectedIds?.length === 0) return;
    dispatch(deleteLog({ ids: selectedIds })).then(() => {
      setSelectedIds([]);
      dispatch(fetchLogs(currentPage));
    });
  };

  // View log file (open image)
  const handleView = async (id) => {
    try {
      setLoadingAction((prev) => ({ ...prev, view: id }));

      const token = TokenService.getToken();
      const res = await fetch(
        `https://backend.trafficiot.com/api/auth/logfiles/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data?.file_url) {
        window.open(data.file_url, "_blank");
      } else {
        alert("File URL not found.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to open file");
    } finally {
      setLoadingAction((prev) => ({ ...prev, view: null }));
    }
  };

  // Download log file
  const handleDownload = async (item) => {
  const { id, file_name } = item;

  try {
    setLoadingAction((prev) => ({ ...prev, download: id }));

    const token = TokenService.getToken();
    const response = await fetch(
      `https://backend.trafficiot.com/api/auth/logfiles/download/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to download file");

    const blob = await response.blob();

    // 🔥 Use ORIGINAL MIME TYPE
    const contentType =
      response.headers.get("Content-Type") || "application/octet-stream";

    const fixedBlob = new Blob([blob], { type: contentType });

    // ---------- FILENAME HANDLING ----------
    let fileName = file_name?.trim() || "downloaded_file";

    // Extract extension (if exists)
    const hasExt = /\.[a-z0-9]+$/i.test(fileName);

    // If NO extension, try to infer from contentType
    if (!hasExt) {
      if (contentType.includes("pdf")) fileName += ".pdf";
      else if (contentType.includes("png")) fileName += ".png";
      else if (contentType.includes("json")) fileName += ".json";
      else if (contentType.includes("text")) fileName += ".txt";
      else fileName += ""; // leave as-is (generic file)
    }

    const url = window.URL.createObjectURL(fixedBlob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
    alert("Unable to download file");
  } finally {
    setLoadingAction((prev) => ({ ...prev, download: null }));
  }
};


  const confirmDeleteAction = () => {
    dispatch(deleteLog({ id: confirmDelete.id }))
      .then(() => dispatch(fetchLogs(currentPage)))
      .finally(() => setConfirmDelete({ open: false, id: null }));
  };

  return (
    <div className="mt-10 sm:p-8 p-4 relative">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Logs</h1>

        {selectedIds?.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete Selected ({selectedIds?.length})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200">
            <tr className="text-gray-800">
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedIds?.length === data?.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-2">S/N</th>
              <th className="px-4 py-2">Device Name</th>
              <th className="px-4 py-2">Date</th>
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
                  No logs found.
                </td>
              </tr>
            ) : (
              data?.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds?.includes(item?.id)}
                      onChange={() => toggleSelect(item?.id)}
                    />
                  </td>

                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3">{item?.device_name}</td>

                  <td className="px-4 py-3">{item?.date}</td>

                  <td className="px-4 py-3 text-right space-x-3">
                    <button
                      onClick={() => handleView(item?.id)}
                      className="text-blue-500 hover:underline"
                    >
                      {loadingAction.view === item.id ? (
                        <span className="animate-spin border-2 border-blue-500 border-t-transparent rounded-full w-4 h-4 inline-block"></span>
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                    <button
                      onClick={() => handleDownload(item)}
                      className="text-green-600 hover:underline"
                    >
                      {loadingAction.download === item.id ? (
                        <span className="animate-spin border-2 border-green-600 border-t-transparent rounded-full w-4 h-4 inline-block"></span>
                      ) : (
                        <Download size={16} />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        setConfirmDelete({ open: true, id: item?.id })
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

      {confirmDelete.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
            <h2 className="text-lg font-semibold mb-3">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this log?
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

export default Logs;
