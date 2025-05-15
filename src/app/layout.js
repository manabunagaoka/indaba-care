import './globals.css'

export const metadata = {
  title: 'Indaba Care',
  description: 'A Montessori-based communication platform for live-in nannies and parents',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}