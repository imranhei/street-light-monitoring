import React from "react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Define how many pages to show at a time
    const startPage = Math.max(currentPage - 2, 1);
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
        <span key="start-ellipsis" className="mx-1 text-gray-500">
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
        <span key="end-ellipsis" className="mx-1 text-gray-500">
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
    <div className="flex items-center justify-center space-x-2 mt-5">
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
  );
};

export default Pagination;
