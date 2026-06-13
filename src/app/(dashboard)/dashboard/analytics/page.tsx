import { auth } from "@/config/auth";
import { getProfileByUserId, getAnalytics, getAnalyticsSummary, getTopTiles, getTilesByProfileId } from "@/db/queries";
import { redirect } from "next/navigation";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const profile = await getProfileByUserId((session.user as any).id);
  if (!profile) redirect("/dashboard/profile");

  const [analytics, summary, topTileIds, tiles] = await Promise.all([
    getAnalytics(profile.id, 30),
    getAnalyticsSummary(profile.id),
    getTopTiles(profile.id),
    getTilesByProfileId(profile.id),
  ]);

  const tileMap = new Map(tiles.map((t) => [t.id, t.title]));

  const analyticsData = analytics
    .map((a) => ({
      date: new Date(a.date).toISOString(),
      views: a.profileViews,
      clicks: a.tileClicks,
      qrScans: a.qrScans,
    }))
    .reverse();

  const topTiles = topTileIds.map((t) => ({
    tileId: t.tileId,
    tileTitle: tileMap.get(t.tileId) || "Unknown",
    count: t.count,
  }));

  return (
    <AnalyticsDashboard
      analyticsData={analyticsData}
      topTiles={topTiles}
      summary={{
        totalViews: summary.totalViews || 0,
        totalClicks: summary.totalClicks || 0,
        totalQrScans: summary.totalQrScans || 0,
        totalUniqueVisitors: summary.totalUniqueVisitors || 0,
      }}
    />
  );
}
