'use client'

export function LoadingState() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
          <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        </div>
        <p className="text-center text-slate-600 font-medium">Loading advocates...</p>
      </div>
    </div>
  )
}
