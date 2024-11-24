import "../globals.css";

export const metadata = {
  title: "Invoice Dashboard",
  description: "Modern invoice management system",
}

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}

export default AuthLayout
