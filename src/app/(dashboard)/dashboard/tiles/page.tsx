export const runtime = 'edge';

import { auth } from "@/config/auth";
import { getProfileByUserId, getTilesByProfileId } from "@/db/queries";
import { redirect } from "next/navigation";
import TilesManager from "@/components/dashboard/TilesManager";

export default async function TilesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const profile = await getProfileByUserId((session.user as any).id);
  if (!profile) redirect("/dashboard/profile");

  const tiles = await getTilesByProfileId(profile.id);

  return <TilesManager initialTiles={tiles} profileId={profile.id} />;
}
