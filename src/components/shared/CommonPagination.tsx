import { useState } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
};

const CommonPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize = 10,
  onPageSizeChange,
}) => {
  const [inputPage, setInputPage] = useState("");

  const handleGoToPage = () => {
    const page = Number(inputPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
      setInputPage("");
    }
  };

  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 4) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 3) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8  py-4 px-6 rounded-lg shadow-lg">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Page Numbers */}
      {getPages().map((item, idx) =>
        item === "..." ? (
          <span
            key={idx}
            className="px-3 text-gray-400 text-lg font-medium select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(Number(item))}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-medium transition-all duration-300 ${
              currentPage === item
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white"
            }`}
          >
            {item}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Page Size Selector */}
      {onPageSizeChange && (
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="ml-4 bg-gray-800 text-gray-300 rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
        >
          {[10, 20, 50, 100].map((size) => (
            <option key={size} value={size} className="bg-gray-900 text-gray-300">
              {size} / page
            </option>
          ))}
        </select>
      )}

      {/* Go to Page */}
      <div className="ml-4 flex items-center gap-2">
        <span className="text-gray-300 font-medium">Go to</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          className="w-16 bg-gray-800 text-gray-300 rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
        />
        <button
          onClick={handleGoToPage}
          className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 transition-all duration-300"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default CommonPagination;