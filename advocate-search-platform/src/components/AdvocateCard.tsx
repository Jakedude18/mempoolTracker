'use client'

import { Advocate } from '@/types'
import { MapPin, Phone, Briefcase } from 'lucide-react'

interface AdvocateCardProps {
  advocate: Advocate
}

export function AdvocateCard({ advocate }: AdvocateCardProps) {
  return (
    <div className="group h-full bg-white rounded-xl border-2 border-slate-100 hover:border-indigo-300 p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Header */}
      <div className="mb-4 pb-4 border-b-2 border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {advocate.name}
        </h3>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Phone */}
        <div className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 transition-colors">
          <Phone className="w-5 h-5 text-indigo-500 flex-shrink-0" />
          <a href={`tel:${advocate.phone}`} className="hover:underline font-mono text-sm">
            {advocate.phone}
          </a>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3 text-slate-700">
          <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <span className="text-sm font-medium">{advocate.city}</span>
        </div>

        {/* Specialty */}
        <div className="flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <span className="text-sm text-slate-600">{advocate.specialty}</span>
        </div>
      </div>

      {/* Footer Badge */}
      <div className="mt-4 pt-4 border-t-2 border-slate-100">
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
          ID: {advocate.id}
        </span>
      </div>
    </div>
  )
}
