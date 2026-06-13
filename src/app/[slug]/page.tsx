import { notFound } from "next/navigation";
import { getProfileBySlug, getTilesByProfileId, trackProfileView } from "@/db/queries";
import { generateMetadata } from "./generateMetadata";
import PublicProfile from "./PublicProfile";

export { generateMetadata };

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);

  if (!profile) notFound();

  const tiles = await getTilesByProfileId(profile.id);

  trackProfileView(profile.id).catch(() => {});

  return (
    <PublicProfile
      profile={{
        businessName: profile.businessName,
        slug: profile.slug,
        description: profile.description,
        category: profile.category,
        logoUrl: profile.logoUrl,
        coverImageUrl: profile.coverImageUrl,
        phone: profile.phone,
        whatsappNumber: profile.whatsappNumber,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        website: profile.website,
        theme: profile.theme,
        primaryColor: profile.primaryColor || "#6366f1",
        secondaryColor: profile.secondaryColor || "#8b5cf6",
        tileRadius: profile.tileRadius || 16,
        gridGap: profile.gridGap || 16,
        fontFamily: profile.fontFamily || "Inter",
        customCss: profile.customCss,
      }}
      tiles={tiles.map((t) => ({
        id: t.id,
        tileType: t.tileType,
        title: t.title,
        description: t.description,
        url: t.url,
        imageUrl: t.imageUrl,
        videoUrl: t.videoUrl,
        gridWidth: t.gridWidth,
        gridHeight: t.gridHeight,
        displayOrder: t.displayOrder,
        backgroundStyle: t.backgroundStyle,
        ctaText: t.ctaText,
        whatsappMessage: t.whatsappMessage,
        countdownEnd: t.countdownEnd,
        isActive: t.isActive,
        metadata: t.metadata,
      }))}
    />
  );
}
