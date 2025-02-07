'use client'


import { Inter } from 'next/font/google'
import './globals.css'
import { PrivyProvider } from '@privy-io/react-auth'


const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
          
        >
          {children}
        </PrivyProvider>
      </body>
    </html>
  )
}