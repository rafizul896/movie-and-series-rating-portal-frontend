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
    const pages: (number | "...")[] = []; // Create an empty list to hold page numbers or "..."

    // Decide how many pages to show based on screen size
    const isMobile = window.innerWidth < 640; // Check if the screen is small (less than 640px)
    const maxPagesToShow = isMobile ? 3 : 5; // Show 3 pages on mobile, 5 on bigger screens

    // If total pages are less than or equal to max pages + 1, show all pages
    if (totalPages <= maxPagesToShow + 1) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i); // Add each page number from 1 to totalPages
      }
    } else {
      // Show the first few pages
      for (let i = 1; i <= maxPagesToShow; i++) {
        pages.push(i); // Add the first 3 or 5 pages
      }

      // Add "..." if there are more pages after the first few
      if (totalPages > maxPagesToShow + 1) {
        pages.push("...");
      }

      // Always add the last page
      pages.push(totalPages);
    }

    return pages; // Return the list of pages
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8 py-4 px-2 sm:px-6 rounded-lg shadow-lg">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
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
            className="px-2 sm:px-3 text-gray-400 text-base sm:text-lg font-medium select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(Number(item))}
            className={`w-8 cursor-pointer  h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-base sm:text-lg font-medium transition-all duration-300 ${
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
        className="w-8 h-8 cursor-pointer  sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
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

      {/* Page Size Selector - Hidden on Mobile */}
      {onPageSizeChange && (
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="ml-2 cursor-pointer  sm:ml-4 bg-gray-800 text-gray-300 rounded-lg px-2 py-1 sm:px-3 sm:py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 hidden sm:block"
        >
          {[10, 20, 50, 100].map((size) => (
            <option key={size} value={size} className="bg-gray-900 text-gray-300">
              {size} / page
            </option>
          ))}
        </select>
      )}

      {/* Go to Page - Hidden on Mobile */}
      <div className="ml-2 sm:ml-4 md:flex items-center gap-2 hidden sm:flex">
        <span className="text-gray-300 font-medium">Go to</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          className="w-14 sm:w-16 bg-gray-800 text-gray-300 rounded-lg px-2 sm:px-3 py-1 sm:py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
        />
        <button
          onClick={handleGoToPage}
          className="bg-red-600 text-white rounded-lg px-3 sm:px-4 py-1 sm:py-2 hover:bg-red-700 transition-all duration-300"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default CommonPagination;