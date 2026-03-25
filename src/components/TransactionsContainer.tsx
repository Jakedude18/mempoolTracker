'use client'

import { useState, useCallback, useEffect } from 'react'
import { TransactionsResponse } from '@/types'
import { SearchBar } from './SearchBar'
import { TransactionCard } from './TransactionCard'
import { Pagination } from './Pagination'
import { LoadingState } from './LoadingState'
import { EmptyState } from './EmptyState'

const ITEMS_PER_PAGE = 25

export function TransactionsContainer() {
  const [data, setData] = useState<TransactionsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchTransactions = useCallback(async (page: number, search: string) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        ...(search && { search }),
      })

      const response = await fetch(`/api/transactions?${params}`)

      if (!response.ok) {
        throw new Error('Failed to fetch Transactions')
      }

      const result: TransactionsResponse = await response.json()
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
    fetchTransactions(1, '')
  }, [fetchTransactions])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
    fetchTransactions(1, query)
  }

  const handleNextPage = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchTransactions(nextPage, searchQuery)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrevPage = () => {
    const prevPage = Math.max(1, currentPage - 1)
    setCurrentPage(prevPage)
    fetchTransactions(prevPage, searchQuery)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setSearchQuery('')
    setCurrentPage(1)
    fetchTransactions(1, '')
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
            {data.data.map((transaction) => (
              <TransactionCard key={transaction.txid} transaction={transaction} />
            ))}
          </div>
          {/* Results Info */}
          <div className="text-sm text-slate-600 text-center">
            Showing {data.pagination.page === 1 ? 1 : (data.pagination.page - 1) * ITEMS_PER_PAGE + 1} -{' '}
            {Math.min(
              data.pagination.page * ITEMS_PER_PAGE,
              data.pagination.total
            )}{' '}
            of {data.pagination.total} Transactions
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
