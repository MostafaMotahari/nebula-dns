import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nebula DNS',
  description: 'Created by mousiol',
  generator: 'mousiol.ir',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
