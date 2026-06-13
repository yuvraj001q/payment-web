import { auth } from "@/config/auth";
import { getProfileByUserId, getAnalyticsSummary, getTilesByProfileId } from "@/db/queries";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  MousePointerClick,
  QrCode,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  LayoutGrid,
  ExternalLink,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const profile = await getProfileByUserId((session.user as any).id);
  if (!profile) redirect("/dashboard/profile");

  const [analytics, tiles] = await Promise.all([
    getAnalyticsSummary(profile.id),
    getTilesByProfileId(profile.id),
  ]);

  const stats = [
    {
      label: "Total Views",
      value: analytics?.totalViews || 0,
      icon: Eye,
      change: 12.5,
      color: "text-indigo-400",
      bg: "from-indigo-500/20 to-indigo-500/5",
    },
    {
      label: "Tile Clicks",
      value: analytics?.totalClicks || 0,
      icon: MousePointerClick,
      change: 8.2,
      color: "text-purple-400",
      bg: "from-purple-500/20 to-purple-500/5",
    },
    {
      label: "QR Scans",
      value: analytics?.totalQrScans || 0,
      icon: QrCode,
      change: 23.1,
      color: "text-pink-400",
      bg: "from-pink-500/20 to-pink-500/5",
    },
    {
      label: "Unique Visitors",
      value: analytics?.totalUniqueVisitors || 0,
      icon: Users,
      change: -3.2,
      color: "text-cyan-400",
      bg: "from-cyan-500/20 to-cyan-500/5",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {session.user.name}
          </p>
        </div>
        <Link
          href={`/${profile.slug}`}
          target="_blank"
          className="btn-secondary"
        >
          <ExternalLink className="h-4 w-4" />
          View Live Page
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-5">
            <div className="flex items-center justify-between">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.bg} border border-white/10 flex items-center justify-center`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.change >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {stat.change >= 0 ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {Math.abs(stat.change)}%
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold">{formatNumber(stat.value)}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/tiles"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <LayoutGrid className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm font-medium">Manage Tiles</div>
                  <div className="text-xs text-muted-foreground">
                    {tiles.length} tiles configured
                  </div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm font-medium">Edit Profile</div>
                  <div className="text-xs text-muted-foreground">
                    /{profile.slug}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">Profile Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Business</span>
              <span className="font-medium">{profile.businessName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium capitalize">{profile.category}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Slug</span>
              <span className="font-medium">/{profile.slug}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tiles</span>
              <span className="font-medium">{tiles.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium">
                {new Date(profile.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
