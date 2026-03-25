'use client'

import { Search } from 'lucide-react'

interface EmptyStateProps {
  searchQuery?: string
  onReset?: () => void
}

export function EmptyState({ searchQuery, onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        No transactions found
      </h3>
      <p className="text-slate-600 text-center mb-6 max-w-md">
        {searchQuery
          ? `We couldn't find any transcations matching "${searchQuery}". Try adjusting your search terms.`
          : 'No transactions   available at the moment.'}
      </p>
      {onReset && searchQuery && (
        <button
          onClick={onReset}
          className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Clear Search
        </button>
      )}
    </div>
  )
}
