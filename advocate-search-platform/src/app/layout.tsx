import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Advocate Search',
  description: 'Find and search through a comprehensive list of advocates',
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
