import { AdvocatesContainer } from '@/components/AdvocatesContainer'
import { Users } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-indigo-600 rounded-lg shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">
            Advocate Search
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover and connect with legal advocates across multiple specialties
          </p>
        </div>

        {/* Main Content */}
        <AdvocatesContainer />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t-2 border-slate-200 text-center text-slate-600 text-sm">
          <p>
            Advocate Search Platform v1.0 • Built with Next.js & Tailwind CSS
          </p>
        </footer>
      </div>
    </main>
  )
}
