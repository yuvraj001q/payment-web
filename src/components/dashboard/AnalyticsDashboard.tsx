"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Eye,
  MousePointerClick,
  QrCode,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface AnalyticsData {
  date: string;
  views: number;
  clicks: number;
  qrScans: number;
}

interface TopTile {
  tileId: string;
  tileTitle: string;
  count: number;
}

export default function AnalyticsDashboard({
  analyticsData,
  topTiles,
  summary,
}: {
  analyticsData: AnalyticsData[];
  topTiles: TopTile[];
  summary: {
    totalViews: number;
    totalClicks: number;
    totalQrScans: number;
    totalUniqueVisitors: number;
  };
}) {
  const [period, setPeriod] = useState(30);

  const stats = [
    {
      label: "Total Views",
      value: summary.totalViews,
      icon: Eye,
      color: "text-indigo-400",
      bg: "from-indigo-500/20 to-indigo-500/5",
    },
    {
      label: "Total Clicks",
      value: summary.totalClicks,
      icon: MousePointerClick,
      color: "text-purple-400",
      bg: "from-purple-500/20 to-purple-500/5",
    },
    {
      label: "QR Scans",
      value: summary.totalQrScans,
      icon: QrCode,
      color: "text-pink-400",
      bg: "from-pink-500/20 to-pink-500/5",
    },
    {
      label: "Unique Visitors",
      value: summary.totalUniqueVisitors,
      icon: TrendingUp,
      color: "text-cyan-400",
      bg: "from-cyan-500/20 to-cyan-500/5",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your page performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[7, 14, 30].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                period === p
                  ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                  : "glass hover:bg-white/10"
              }`}
            >
              {p}d
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-5">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.bg} border border-white/10 flex items-center justify-center mb-4`}
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold">{formatNumber(stat.value)}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-6">Traffic Overview</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.3)"
                fontSize={12}
                tickFormatter={(val) => new Date(val).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(10,10,15,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "white",
                }}
              />
              <Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="clicks" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="qrScans" stroke="#ec4899" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Tiles */}
      {topTiles.length > 0 && (
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-6">Top Performing Tiles</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topTiles}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="tileTitle" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(10,10,15,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "white",
                  }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
