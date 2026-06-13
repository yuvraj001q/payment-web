export function generateSEOMetadata(profile: {
  businessName: string;
  description: string | null;
  category: string;
  slug: string;
  city: string | null;
  state: string | null;
  country: string | null;
  coverImageUrl: string | null;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://predatorgrid.com";
  const profileUrl = `${baseUrl}/${profile.slug}`;

  const locationStr = [profile.city, profile.state, profile.country]
    .filter(Boolean)
    .join(", ");

  const description =
    profile.description ||
    `${profile.businessName} - ${profile.category}${
      locationStr ? ` in ${locationStr}` : ""
    }. Visit our page for offers, menu, and more.`;

  return {
    title: profile.businessName,
    description,
    openGraph: {
      title: profile.businessName,
      description,
      url: profileUrl,
      siteName: "Predator Grid",
      images: [
        {
          url: profile.coverImageUrl || `${baseUrl}/og-default.png`,
          width: 1200,
          height: 630,
          alt: profile.businessName,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: profile.businessName,
      description,
      images: [profile.coverImageUrl || `${baseUrl}/og-default.png`],
    },
    alternates: {
      canonical: profileUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
