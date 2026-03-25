import { NextRequest, NextResponse } from 'next/server'

// Mock database of advocates
const advocatesDatabase = [
  { id: 1, name: "John Smith", phone: "555-123-4567", city: "Boston", specialty: "Immigration Law" },
  { id: 2, name: "Jane Doe", phone: "555-987-6543", city: "New York", specialty: "Civil Rights" },
  { id: 3, name: "Johnny Appleseed", phone: "555-222-3333", city: "Chicago", specialty: "Employment Law" },
  { id: 4, name: "Sarah Connor", phone: "555-444-1111", city: "Los Angeles", specialty: "Criminal Defense" },
  { id: 5, name: "Michael Johnson", phone: "555-555-5555", city: "Boston", specialty: "Tax Law" },
  { id: 6, name: "Emily Davis", phone: "555-666-6666", city: "New York", specialty: "Family Law" },
  { id: 7, name: "Robert Wilson", phone: "555-777-7777", city: "Chicago", specialty: "Corporate Law" },
  { id: 8, name: "Jessica Martinez", phone: "555-888-8888", city: "Los Angeles", specialty: "Real Estate" },
  { id: 9, name: "David Brown", phone: "555-999-9999", city: "Boston", specialty: "Intellectual Property" },
  { id: 10, name: "Lisa Anderson", phone: "555-101-0101", city: "New York", specialty: "Environmental Law" },
  { id: 11, name: "James Taylor", phone: "555-202-0202", city: "Chicago", specialty: "Personal Injury" },
  { id: 12, name: "Maria Garcia", phone: "555-303-0303", city: "Los Angeles", specialty: "Immigration Law" },
]

interface QueryParams {
  search?: string
  page?: string
  limit?: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const search = (searchParams.get('search') || '').toLowerCase().trim()
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '5', 10)))

    // Filter advocates by name or phone
    const filtered = advocatesDatabase.filter((advocate) => {
      if (!search) return true
      
      return (
        advocate.name.toLowerCase().includes(search) ||
        advocate.phone.includes(search) ||
        advocate.city.toLowerCase().includes(search) ||
        advocate.specialty.toLowerCase().includes(search)
      )
    })

    // Calculate pagination
    const total = filtered.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    // Validate page number
    if (page > totalPages && total > 0) {
      return NextResponse.json(
        { error: 'Page number exceeds total pages' },
        { status: 400 }
      )
    }

    const data = filtered.slice(startIndex, endIndex)

    return NextResponse.json(
      {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        search: search || null,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
