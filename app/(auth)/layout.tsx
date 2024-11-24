import "../globals.css";

export const metadata = {
  title: "Invoice Dashboard",
  description: "Modern invoice management system",
}

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <div className="min-h-screen">
          {children}
        </div>
     </>
  )
}

export default AuthLayout
