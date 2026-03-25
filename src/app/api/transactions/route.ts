import { NextRequest, NextResponse } from 'next/server'

const FASTAPI_URL = 'http://89.167.58.34:8000'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '25', 10)))

    let url = search
      ? `${FASTAPI_URL}/mempool/${search}`
      : `${FASTAPI_URL}/mempool?limit=${limit}&page=${page}`

    const res = await fetch(url)
    const json = await res.json()
    // Check if FastAPI returned error
    
    if (!res.ok || json.error) {
      return NextResponse.json({ data: [], pagination: null, search }, { status: res.status })
    }

    // Ensure array format for frontend
    const txData = json.data

    console.log(json)
    return NextResponse.json({
      data: txData,
      pagination: json.pagination || null,
      search: search || null,
    })


  } catch (error) {
    console.error(error)
    return NextResponse.json({ data: [], pagination: null, search: null, error: 'Internal server error' }, { status: 500 })
  }
}