export const runtime = 'edge';

import { auth } from "@/config/auth";
import { getProfileByUserId } from "@/db/queries";
import { redirect } from "next/navigation";
import SettingsEditor from "@/components/dashboard/SettingsEditor";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const profile = await getProfileByUserId((session.user as any).id);
  if (!profile) redirect("/dashboard/profile");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Customize the look and feel of your page
        </p>
      </div>
      <SettingsEditor profile={profile} />
    </div>
  );
}
