import { SettingsHeader } from "@/components/settings/settings-header";
import { SettingsForm } from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <SettingsHeader />
      <SettingsForm />
    </div>
  );
}