import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Loader from "./Loader";
import Pagination from "./Pagination";
import { Trash2Icon } from "lucide-react";

const OVDSAlarm = () => {
  const wrapperRef = useRef(null);

  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);

  // selection
  const [selectedIds, setSelectedIds] = useState(new Set());

  // modal
  const [showModal, setShowModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState("single"); // "single" | "multiple"
  const [selectedId, setSelectedId] = useState(null);

  const link = "https://milesight.trafficiot.com/api/vehicle-records";
  const pageSize = 20;

  const selectedCount = useMemo(() => selectedIds.size, [selectedIds]);

  const fetchData = useCallback(async (page) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({ page: String(page) });
      const res = await fetch(`${link}?${queryParams.toString()}`);

      if (!res.ok) return;

      const json = await res.json();
      setData(json.results || []);
      setTotalPage(Math.ceil((json.count || 0) / pageSize));

      // If page changed, clear selection (keeps UX simple/clean)
      setSelectedIds(new Set());
    } catch (e) {
      console.error("Error fetching vehicle records:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  // Close selection dropdowns etc. if you add later (kept from your style)
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // nothing now, but keeping structure consistent with LidarLogs
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const confirmDeleteSingle = (id) => {
    setDeleteMode("single");
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDeleteMultiple = () => {
    if (selectedIds.size === 0) return;
    setDeleteMode("multiple");
    setSelectedId(null);
    setShowModal(true);
  };

  const deleteOne = async (id) => {
    const res = await fetch(`${link}/${id}`, { method: "DELETE" });
    return res.ok;
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      if (deleteMode === "single" && selectedId != null) {
        const ok = await deleteOne(selectedId);
        if (ok) {
          setShowModal(false);
          setSelectedId(null);

          // Refetch; if this page becomes empty, step back a page
          // (simple approach: refetch current page; if empty result and page>1, go back)
          await fetchData(currentPage);
        }
        return;
      }

      if (deleteMode === "multiple") {
        const ids = Array.from(selectedIds);
        const results = await Promise.all(ids.map((id) => deleteOne(id)));
        const anyDeleted = results.some(Boolean);

        if (anyDeleted) {
          setShowModal(false);
          setSelectedIds(new Set());
          await fetchData(currentPage);
        }
      }
    } catch (e) {
      console.error("Error deleting record(s):", e);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isAllChecked = useMemo(() => {
    if (!data?.length) return false;
    return data.every((row) => selectedIds.has(row.id));
  }, [data, selectedIds]);

  const toggleSelectAllOnPage = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (isAllChecked) {
        // uncheck all on this page
        data.forEach((row) => next.delete(row.id));
      } else {
        // check all on this page
        data.forEach((row) => next.add(row.id));
      }
      return next;
    });
  };

  if (loading) return <Loader className="h-screen" />;

  return (
    <div ref={wrapperRef} className="sm:mt-8 mt-12 sm:p-10 p-4">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>

            {deleteMode === "single" ? (
              <p className="mb-4">Are you sure you want to delete this record?</p>
            ) : (
              <p className="mb-4">
                Are you sure you want to delete <b>{selectedCount}</b> selected record(s)?
              </p>
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold">OVDS Alarm</div>

        <div className="flex items-center gap-3">
          {selectedCount > 0 && (
            <div className="text-sm text-gray-700">
              Selected: <b>{selectedCount}</b>
            </div>
          )}

          <button
            onClick={confirmDeleteMultiple}
            disabled={selectedCount === 0}
            className={`px-3 py-2 rounded-md text-white ${
              selectedCount === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Header */}
        <div className="flex justify-between border mb-2 bg-indigo-950 text-white font-semibold text-center min-w-[1100px]">
          <div className="w-14 p-1 py-2">
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={toggleSelectAllOnPage}
              className="h-4 w-4 accent-white"
              title="Select all on this page"
            />
          </div>

          <div className="w-20 p-1 py-2">Serial</div>
          <div className="w-60 p-1 py-2">Device Name</div>
          <div className="w-44 p-1 py-2">Timestamp</div>
          <div className="w-40 p-1 py-2">License Plate</div>
          <div className="w-32 p-1 py-2">Height</div>
          <div className="w-56 p-1 py-2">Snapshot</div>
          <div className="w-20 p-1 py-2">Action</div>
        </div>

        {/* Rows */}
        {data?.map((item, index) => (
          <div
            key={item.id}
            className="flex justify-between items-center border mb-2 min-w-[1100px]"
          >
            <div className="w-14 p-1 py-2 text-center">
              <input
                type="checkbox"
                checked={selectedIds.has(item.id)}
                onChange={() => toggleSelectOne(item.id)}
                className="h-4 w-4"
              />
            </div>

            <div className="w-20 p-1 py-2 text-center">
              {(currentPage - 1) * pageSize + index + 1}
            </div>

            <div className="w-60 p-1 py-2">{item.device_name}</div>

            <div className="w-44 p-1 py-2">{item.captured_at}</div>

            <div className="w-40 p-1 py-2">{item.license_plate_no}</div>

            <div className="w-32 p-1 py-2 text-center">{item.vehicle_height}</div>

            <div className="w-56 p-1 py-1 flex items-center justify-center">
              {item.vehicle_snapshot_url ? (
                <a
                  href={item.vehicle_snapshot_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <img
                    src={item.vehicle_snapshot_url}
                    alt="snapshot"
                    className="h-10 w-16 object-cover rounded border"
                  />
                </a>
              ) : (
                <span className="text-gray-500 text-sm">No snapshot</span>
              )}
            </div>

            <div className="w-20 p-1 py-1 text-center flex items-center justify-center">
              <button
                className="px-2 py-1 text-red-500 hover:text-red-600 rounded-md"
                onClick={() => confirmDeleteSingle(item.id)}
              >
                <Trash2Icon size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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

export default OVDSAlarm;
