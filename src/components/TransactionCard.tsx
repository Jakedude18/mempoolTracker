'use client'

import { Transaction } from '@/types'
import { Card, CardHeader, CardTitle, CardContent} from './ui/card'
interface TransactionCardProps {
  transaction: Transaction
}




export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <Card className="group h-full hover:border-indigo-300 p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Header */}
      <CardHeader className="border-b">
        <CardTitle className="group-hover:text-indigo-600 transition-colors break-all">
          {transaction.txid}
        </CardTitle>

        <CardContent className="mt-2 flex flex-col gap-1 text-sm text-gray-600">
        <div>
          <span className="font-semibold">VSize:</span> {transaction.vsize} vB
        </div>
        <div>
          <span className="font-semibold">Time in mempool:</span>{' '}
          {transaction.time_in_mempool}
        </div>
      </CardContent>

      </CardHeader>
    </Card>
  )
}
