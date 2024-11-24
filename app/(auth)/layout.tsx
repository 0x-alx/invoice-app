import "../globals.css";

export const metadata = {
  title: "Invoice Dashboard",
  description: "Modern invoice management system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
