'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  onNextPage: () => void
  onPrevPage: () => void
  isLoading?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
  isLoading = false,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-8 p-4 bg-white rounded-lg border-2 border-slate-200">
      <button
        onClick={onPrevPage}
        disabled={!hasPrevPage || isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </button>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-700">
          Page {currentPage}
        </span>
        <span className="text-slate-400">of</span>
        <span className="text-sm font-semibold text-slate-700">
          {totalPages || 1}
        </span>
      </div>

      <button
        onClick={onNextPage}
        disabled={!hasNextPage || isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
