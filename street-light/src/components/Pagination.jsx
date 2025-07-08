import { useState } from "react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const [gotoPage, setGotoPage] = useState("");

  const handleClick = (page) => {
    const pageNum = Number(page);
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setGotoPage(""); // optional: reset input
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3; // Define how many pages to show at a time
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`px-3 py-1 mx-1 rounded ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-blue-100"
          }`}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(
        <span key="start-ellipsis" className="mx-1 pb-2 text-gray-500">
          ...
        </span>
      );
      pageNumbers.unshift(
        <button
          key="1"
          onClick={() => handleClick(1)}
          className="px-3 py-1 mx-1 rounded bg-gray-100 text-gray-700 hover:bg-blue-100"
        >
          1
        </button>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <span key="end-ellipsis" className="mx-1 pb-2 text-gray-500">
          ...
        </span>
      );
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handleClick(totalPages)}
          className="px-3 py-1 mx-1 rounded bg-gray-100 text-gray-700 hover:bg-blue-100"
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded bg-gray-100 ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-blue-100"
          }`}
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {renderPageNumbers()}

        {/* Next Button */}
        <button
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded bg-gray-100 ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-blue-100"
          }`}
        >
          &gt;
        </button>
      </div>

      {/* Go to page field */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-400 text-sm font-semibold">Go to page</span>
        <input
          type="number"
          value={gotoPage}
          onChange={(e) => setGotoPage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const pageNum = Number(gotoPage);
              if (pageNum >= 1 && pageNum <= totalPages) {
                setCurrentPage(pageNum);
                setGotoPage(""); // optional: clear input
              }
            }
          }}
          className="w-16 px-1 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
          min={1}
          max={totalPages}
        />
        <button
          onClick={() => handleClick(gotoPage)}
          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm font-semibold"
        >
          Go &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
