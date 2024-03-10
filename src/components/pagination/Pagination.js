import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={`px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none ${
            currentPage === i + 1 ? "bg-gray-100" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
