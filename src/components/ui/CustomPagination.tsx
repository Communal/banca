"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: CustomPaginationProps) => {
  // If only 1 page, don't show pagination
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-end items-center gap-2 mt-4 text-[#1814F3] font-medium text-sm">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1 disabled:opacity-50 hover:underline disabled:hover:no-underline transition-opacity"
      >
        <ArrowLeft size={16} /> Previous
      </button>

      <div className="flex gap-2 mx-2">
        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          const isActive = currentPage === pageNum;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors font-bold",
                isActive
                  ? "bg-[#1814F3] text-white shadow-md"
                  : "text-[#1814F3] hover:bg-blue-50"
              )}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 disabled:opacity-50 hover:underline disabled:hover:no-underline transition-opacity"
      >
        Next <ArrowRight size={16} />
      </button>
    </div>
  );
};