import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'FinancePro - Your Financial Planning Companion',
  description: 'Comprehensive financial planning app with budgeting, debt management, and financial literacy tools.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}