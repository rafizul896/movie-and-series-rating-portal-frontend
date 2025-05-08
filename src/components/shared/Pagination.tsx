'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  totalPages: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  className?: string;
}

const CustomPagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
  className,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-6 w-full">
      {/* Limit Selector */}
      <div className={`flex items-center gap-2 ${className}`}>
        <p className="text-sm font-medium">Rows per page:</p>
        <Select
          value={limit.toString()}
          onValueChange={(value) => onLimitChange(Number(value))}
        >
          <SelectTrigger className="w-16 h-8">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 50].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        {/* Pagination Controls */}
        <Pagination>
          <PaginationContent className="flex items-center gap-2">
            <PaginationItem>
              <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
              >
                <PaginationPrevious />
              </button>
            </PaginationItem>

            <span className="text-sm">
              Page {page} of {totalPages}
            </span>

            <PaginationItem>
              <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
              >
                <PaginationNext />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default CustomPagination;