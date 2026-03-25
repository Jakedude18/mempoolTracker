import { TransactionsContainer } from '@/components/TransactionsContainer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">
            Transaction Feed
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover Transactions waiting in bitcoin's mempool.
          </p>
        </div>

        {/* Main Content */}
        <TransactionsContainer />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t-2 border-slate-200 text-center text-slate-600 text-sm">
          <p>
            Transaction Search Platform v1.0 • Built with Next.js & Tailwind CSS
          </p>
        </footer>
      </div>
    </main>
  )
}
