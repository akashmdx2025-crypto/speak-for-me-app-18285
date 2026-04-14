import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Speak For Me',
  description: 'An AI that gives a voice to people who struggle to express their problems.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          <header className="header">
            <h1 className="title">Speak For Me</h1>
            <p className="subtitle">An AI that gives a voice to people who struggle to express their problems.</p>
          </header>
          {children}
        </main>
      </body>
    </html>
  )
}
