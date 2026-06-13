"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Palette, Type, Layout } from "lucide-react";
import { updateSettingsAction } from "@/actions/settings";
import type { Profile } from "@/db/schema";

export default function SettingsEditor({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    theme: profile.theme,
    primaryColor: profile.primaryColor || "#6366f1",
    secondaryColor: profile.secondaryColor || "#8b5cf6",
    tileRadius: profile.tileRadius || 16,
    gridGap: profile.gridGap || 16,
    fontFamily: profile.fontFamily || "Inter",
    customCss: profile.customCss || "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function updateField(key: string, value: string | number) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSuccess("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await updateSettingsAction(form);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess("Settings saved successfully");
        router.refresh();
      }
    });
  }

  const themes = [
    { name: "dark", label: "Dark", colors: ["#0a0a0f", "#6366f1", "#8b5cf6"] },
    { name: "light", label: "Light", colors: ["#ffffff", "#6366f1", "#8b5cf6"] },
    { name: "midnight", label: "Midnight", colors: ["#0f0f23", "#3b82f6", "#60a5fa"] },
    { name: "neon", label: "Neon", colors: ["#0a0a0f", "#00ff88", "#00ccff"] },
    { name: "elegant", label: "Elegant", colors: ["#1a1a2e", "#e94560", "#0f3460"] },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-sm text-emerald-400">
          {success}
        </div>
      )}

      {/* Theme Selection */}
      <div className="glass-card p-6 space-y-5">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Palette className="h-5 w-5 text-indigo-400" />
          Theme
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {themes.map((t) => (
            <button
              key={t.name}
              type="button"
              onClick={() => updateField("theme", t.name)}
              className={`p-4 rounded-xl border transition-all text-center ${
                form.theme === t.name
                  ? "border-indigo-500/50 bg-indigo-500/10"
                  : "border-white/10 hover:border-white/20 bg-white/5"
              }`}
            >
              <div className="flex gap-1 justify-center mb-2">
                {t.colors.map((c, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <span className="text-xs font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="glass-card p-6 space-y-5">
        <h2 className="text-lg font-semibold">Custom Colors</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="label">Primary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.primaryColor}
                onChange={(e) => updateField("primaryColor", e.target.value)}
                className="w-12 h-12 rounded-xl border border-white/10 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={form.primaryColor}
                onChange={(e) => updateField("primaryColor", e.target.value)}
                className="input flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="label">Secondary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.secondaryColor}
                onChange={(e) => updateField("secondaryColor", e.target.value)}
                className="w-12 h-12 rounded-xl border border-white/10 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={form.secondaryColor}
                onChange={(e) => updateField("secondaryColor", e.target.value)}
                className="input flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="glass-card p-6 space-y-5">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Layout className="h-5 w-5 text-purple-400" />
          Layout
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-2">
            <label className="label">Tile Radius (px)</label>
            <input
              type="range"
              min={0}
              max={32}
              value={form.tileRadius}
              onChange={(e) => updateField("tileRadius", Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <div className="text-xs text-muted-foreground text-center">{form.tileRadius}px</div>
          </div>
          <div className="space-y-2">
            <label className="label">Grid Gap (px)</label>
            <input
              type="range"
              min={0}
              max={32}
              value={form.gridGap}
              onChange={(e) => updateField("gridGap", Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <div className="text-xs text-muted-foreground text-center">{form.gridGap}px</div>
          </div>
          <div className="space-y-2">
            <label className="label">Font Family</label>
            <select
              value={form.fontFamily}
              onChange={(e) => updateField("fontFamily", e.target.value)}
              className="input"
            >
              {["Inter", "Poppins", "Montserrat", "Raleway", "Open Sans", "Lato"].map((f) => (
                <option key={f} value={f} className="bg-[#0a0a0f]">
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <div className="glass-card p-6 space-y-5">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Type className="h-5 w-5 text-pink-400" />
          Custom CSS
        </h2>
        <p className="text-sm text-muted-foreground">
          Add custom CSS to further customize your page appearance.
        </p>
        <textarea
          value={form.customCss}
          onChange={(e) => updateField("customCss", e.target.value)}
          className="input min-h-[120px] font-mono text-sm resize-y"
          rows={6}
          placeholder=".tile { border: 1px solid rgba(255,255,255,0.1); }"
        />
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isPending} className="btn-primary">
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Settings
        </button>
      </div>
    </form>
  );
}
