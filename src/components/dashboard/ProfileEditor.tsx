"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Save,
  Loader2,
  User,
  MapPin,
  Phone,
  Globe,
  Tag,
  Image,
  Palette,
} from "lucide-react";
import { updateProfileAction } from "@/actions/profile";
import type { Profile } from "@/db/schema";

const categories = [
  "restaurant",
  "cafe",
  "hotel",
  "salon",
  "gym",
  "retail",
  "creator",
  "services",
  "general",
];

const themes = ["dark", "light", "midnight", "neon", "elegant"];

export default function ProfileEditor({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    businessName: profile.businessName,
    slug: profile.slug,
    description: profile.description || "",
    category: profile.category,
    logoUrl: profile.logoUrl || "",
    coverImageUrl: profile.coverImageUrl || "",
    phone: profile.phone || "",
    whatsappNumber: profile.whatsappNumber || "",
    address: profile.address || "",
    city: profile.city || "",
    state: profile.state || "",
    country: profile.country || "",
    website: profile.website || "",
    theme: profile.theme,
    primaryColor: profile.primaryColor || "#6366f1",
    secondaryColor: profile.secondaryColor || "#8b5cf6",
    tileRadius: profile.tileRadius || 16,
    gridGap: profile.gridGap || 16,
    fontFamily: profile.fontFamily || "Inter",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateField(key: string, value: string | number) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSuccess("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await updateProfileAction(form);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess("Profile updated successfully");
        router.refresh();
      }
    });
  }

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

      {/* Basic Info */}
      <div className="glass-card p-6 space-y-5">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <User className="h-5 w-5 text-indigo-400" />
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="label">Business Name</label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) => updateField("businessName", e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="label">URL Slug</label>
            <div className="flex items-center gap-0">
              <span className="px-3 h-11 flex items-center text-sm text-muted-foreground bg-white/5 border border-white/10 border-r-0 rounded-l-xl">
                /
              </span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) =>
                  updateField(
                    "slug",
                    e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
                  )
                }
                className="input !rounded-l-none"
                required
                pattern="[a-z0-9-]+"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="label">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="input min-h-[80px] resize-y"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="label">Category</label>
          <select
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="input"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#0a0a0f]">
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contact */}
      <div className="glass-card p-6 space-y-5">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Phone className="h-5 w-5 text-purple-400" />
          Contact Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="label">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="input"
              placeholder="+1 234 567 890"
            />
          </div>
          <div className="space-y-2">
            <label className="label">WhatsApp Number</label>
            <input
              type="tel"
              value={form.whatsappNumber}
              onChange={(e) => updateField("whatsappNumber", e.target.value)}
              className="input"
              placeholder="1234567890"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="label">Website</label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => updateField("website", e.target.value)}
            className="input"
            placeholder="https://example.com"
          />
        </div>
      </div>

      {/* Location */}
      <div className="glass-card p-6 space-y-5">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-pink-400" />
          Location
        </h2>

        <div className="space-y-2">
          <label className="label">Address</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            className="input"
            placeholder="123 Main Street"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <div className="space-y-2">
            <label className="label">City</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              className="input"
            />
          </div>
          <div className="space-y-2">
            <label className="label">State</label>
            <input
              type="text"
              value={form.state}
              onChange={(e) => updateField("state", e.target.value)}
              className="input"
            />
          </div>
          <div className="space-y-2">
            <label className="label">Country</label>
            <input
              type="text"
              value={form.country}
              onChange={(e) => updateField("country", e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="glass-card p-6 space-y-5">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image className="h-5 w-5 text-cyan-400" />
          Images
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="label">Logo URL</label>
            <input
              type="url"
              value={form.logoUrl}
              onChange={(e) => updateField("logoUrl", e.target.value)}
              className="input"
              placeholder="https://example.com/logo.png"
            />
          </div>
          <div className="space-y-2">
            <label className="label">Cover Image URL</label>
            <input
              type="url"
              value={form.coverImageUrl}
              onChange={(e) => updateField("coverImageUrl", e.target.value)}
              className="input"
              placeholder="https://example.com/cover.jpg"
            />
          </div>
        </div>
      </div>

      {/* Theme */}
      <div className="glass-card p-6 space-y-5">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Palette className="h-5 w-5 text-amber-400" />
          Theme & Appearance
        </h2>

        <div className="space-y-2">
          <label className="label">Theme</label>
          <div className="flex gap-3">
            {themes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => updateField("theme", t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  form.theme === t
                    ? "bg-indigo-500/20 border border-indigo-500/30 text-indigo-400"
                    : "glass hover:bg-white/10"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="space-y-2">
            <label className="label">Primary Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.primaryColor}
                onChange={(e) => updateField("primaryColor", e.target.value)}
                className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
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
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.secondaryColor}
                onChange={(e) => updateField("secondaryColor", e.target.value)}
                className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={form.secondaryColor}
                onChange={(e) => updateField("secondaryColor", e.target.value)}
                className="input flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="label">Tile Radius</label>
            <input
              type="number"
              value={form.tileRadius}
              onChange={(e) => updateField("tileRadius", Number(e.target.value))}
              className="input"
              min={0}
              max={32}
            />
          </div>
          <div className="space-y-2">
            <label className="label">Grid Gap</label>
            <input
              type="number"
              value={form.gridGap}
              onChange={(e) => updateField("gridGap", Number(e.target.value))}
              className="input"
              min={0}
              max={32}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isPending} className="btn-primary">
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Profile
        </button>
      </div>
    </form>
  );
}
