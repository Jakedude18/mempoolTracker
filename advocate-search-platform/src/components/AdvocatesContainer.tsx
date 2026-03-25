'use client'

import { useState, useCallback, useEffect } from 'react'
import { AdvocatesResponse } from '@/types'
import { SearchBar } from './SearchBar'
import { AdvocateCard } from './AdvocateCard'
import { Pagination } from './Pagination'
import { LoadingState } from './LoadingState'
import { EmptyState } from './EmptyState'

const ITEMS_PER_PAGE = 5

export function AdvocatesContainer() {
  const [data, setData] = useState<AdvocatesResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchAdvocates = useCallback(async (page: number, search: string) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        ...(search && { search }),
      })

      const response = await fetch(`/api/advocates?${params}`)

      if (!response.ok) {
        throw new Error('Failed to fetch advocates')
      }

      const result: AdvocatesResponse = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchAdvocates(1, '')
  }, [fetchAdvocates])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
    fetchAdvocates(1, query)
  }

  const handleNextPage = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchAdvocates(nextPage, searchQuery)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrevPage = () => {
    const prevPage = Math.max(1, currentPage - 1)
    setCurrentPage(prevPage)
    fetchAdvocates(prevPage, searchQuery)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setSearchQuery('')
    setCurrentPage(1)
    fetchAdvocates(1, '')
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} isLoading={loading} />

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-800">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && <LoadingState />}

      {/* Results */}
      {!loading && data && data.data.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
            {data.data.map((advocate) => (
              <AdvocateCard key={advocate.id} advocate={advocate} />
            ))}
          </div>

          {/* Results Info */}
          <div className="text-sm text-slate-600 text-center">
            Showing {data.pagination.page === 1 ? 1 : (data.pagination.page - 1) * ITEMS_PER_PAGE + 1} -{' '}
            {Math.min(
              data.pagination.page * ITEMS_PER_PAGE,
              data.pagination.total
            )}{' '}
            of {data.pagination.total} advocates
            {searchQuery && ` matching "${searchQuery}"`}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={data.pagination.page}
            totalPages={data.pagination.totalPages}
            hasNextPage={data.pagination.hasNextPage}
            hasPrevPage={data.pagination.hasPrevPage}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            isLoading={loading}
          />
        </>
      )}

      {/* Empty State */}
      {!loading && data && data.data.length === 0 && (
        <EmptyState searchQuery={searchQuery} onReset={handleReset} />
      )}
    </div>
  )
}
