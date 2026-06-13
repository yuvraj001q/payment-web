import { auth } from "@/config/auth";
import { getProfileByUserId } from "@/db/queries";
import { redirect } from "next/navigation";
import ProfileEditor from "@/components/dashboard/ProfileEditor";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const profile = await getProfileByUserId((session.user as any).id);
  if (!profile) redirect("/dashboard");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">
          Customize your public profile and appearance
        </p>
      </div>
      <ProfileEditor profile={profile} />
    </div>
  );
}
