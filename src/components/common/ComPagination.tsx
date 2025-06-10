// components/common/Pagination.tsx
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const ComPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  className = "",
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    const validatedPage = Math.max(1, Math.min(newPage, totalPages));
    onPageChange(validatedPage);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're at the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Always show first page
    if (startPage > 1) {
      pages.push(
        <Button
          key={1}
          size="sm"
          variant={currentPage === 1 ? "default" : "accent"}
          onClick={() => handlePageChange(1)}
        >
          1
        </Button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="flex items-center px-2">
            ...
          </span>
        );
      }
    }

    // Show visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          size="sm"
          variant={currentPage === i ? "default" : "accent"}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="flex items-center px-2">
            ...
          </span>
        );
      }
      pages.push(
        <Button
          key={totalPages}
          size="sm"
          variant={currentPage === totalPages ? "default" : "accent"}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  const getShowingRange = () => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);
    return `Showing ${start} - ${end} of ${totalItems}`;
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        <span className="font-medium text-sm text-black-500">
          {getShowingRange()}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="accent"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} strokeWidth="4px" />
        </Button>

        {renderPageNumbers()}

        <Button
          size="sm"
          variant="accent"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} strokeWidth="4px" />
        </Button>
      </div>
    </div>
  );
};

export default ComPagination;
