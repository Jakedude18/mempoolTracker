import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mempool Tracker',
  description: 'Live stream of incoming bitcoin transactions,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
