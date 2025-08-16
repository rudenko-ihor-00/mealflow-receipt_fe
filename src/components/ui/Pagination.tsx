import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages: (number | string)[] = [];

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageButton = (page: number | string, index: number) => {
    if (page === "...") {
      return (
        <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-400">
          <MoreHorizontal className="w-4 h-4" />
        </span>
      );
    }

    const isActive = page === currentPage;
    const pageNumber = page as number;

    return (
      <motion.button
        key={pageNumber}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handlePageChange(pageNumber)}
        className={`
          ${sizeClasses[size]}
          font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          ${
            isActive
              ? "bg-primary-500 text-white shadow-lg"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-primary-300"
          }
        `}
      >
        {pageNumber}
      </motion.button>
    );
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* First Page */}
      {showFirstLast && currentPage > 1 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(1)}
          className={`
            ${sizeClasses[size]}
            bg-white text-gray-700 border border-gray-200 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          `}
        >
          1
        </motion.button>
      )}

      {/* Previous Page */}
      {showPrevNext && currentPage > 1 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`
            ${sizeClasses[size]}
            bg-white text-gray-700 border border-gray-200 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          `}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>
      )}

      {/* Page Numbers */}
      {getVisiblePages().map((page, index) => renderPageButton(page, index))}

      {/* Next Page */}
      {showPrevNext && currentPage < totalPages && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`
            ${sizeClasses[size]}
            bg-white text-gray-700 border border-gray-200 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          `}
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      )}

      {/* Last Page */}
      {showFirstLast && currentPage < totalPages && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(totalPages)}
          className={`
            ${sizeClasses[size]}
            bg-white text-gray-700 border border-gray-200 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          `}
        >
          {totalPages}
        </motion.button>
      )}
    </div>
  );
};

export default Pagination;
