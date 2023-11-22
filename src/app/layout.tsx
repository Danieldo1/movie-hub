import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MovieHub',
  description: 'Discover the best movies with MovieHub',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <div className='grid grid-cols-1 sm:grid-cols-[250px,1fr]'>
          <Sidebar />
        {children}
        </div>
        </body>
    </html>
  )
}
