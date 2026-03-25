export interface Advocate {
  id: number
  name: string
  phone: string
  city: string
  specialty: string
}

export interface AdvocatesResponse {
  data: Advocate[]
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
