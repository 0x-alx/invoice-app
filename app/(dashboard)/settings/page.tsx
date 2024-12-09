import { updateSettings } from "@/app/actions/settings"
import { SettingsForm } from "@/components/settings/settings-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/login")
  }

  const settings = {
    companyName: user.companyName || "",
    address: user.address || "",
    city: user.city || "",
    postalCode: user.postalCode || "",
    country: user.country || "",
    phone: user.phone || "",
    email: user.email || "",
    vatNumber: user.vatNumber || "",
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Company Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm 
            initialData={settings} 
            onSubmit={updateSettings}
          />
        </CardContent>
      </Card>
    </div>
  )
}