import "./globals.css";

export const metadata = {
  title: 'CRUD App',
  description: 'Next.js CRUD Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}