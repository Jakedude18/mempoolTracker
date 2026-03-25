export interface Transaction {
  txid: number,
  vsize: number,
  time_in_mempool: number,
}

export interface TransactionsResponse {
  data: Transaction[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  search: string | null
}
