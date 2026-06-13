export const runtime = 'edge';

import { auth } from "@/config/auth";
import { getProfileByUserId } from "@/db/queries";
import { redirect } from "next/navigation";
import QRCodeGenerator from "@/components/qr/QRCodeGenerator";

export default async function QRPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const profile = await getProfileByUserId((session.user as any).id);
  if (!profile) redirect("/dashboard/profile");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">QR Code</h1>
        <p className="text-muted-foreground mt-1">
          Generate and download QR codes for your profile
        </p>
      </div>
      <QRCodeGenerator
        profileSlug={profile.slug}
        businessName={profile.businessName}
      />
    </div>
  );
}
