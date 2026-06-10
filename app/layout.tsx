import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pandxy - Web Developer Portfolio',
  description:
    'Full-Stack Developer based in Indonesian. Building fast, secure, high-performance web & mobile apps.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="dark">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Geist:wght@400;500&family=Geist+Mono:wght@500&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Geist:wght@400;500&family=Geist+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body-md text-body-md antialiased selection:bg-white/20">
        {children}
      </body>
    </html>
  )
}
