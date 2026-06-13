import type { Metadata } from "next";
import { getProfileBySlug, getTilesByProfileId } from "@/db/queries";
import { trackProfileView } from "@/db/queries";

interface ProfileParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProfileParams): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);

  if (!profile) {
    return {
      title: "Page Not Found",
      description: "This profile does not exist.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://predatorgrid.com";
  const profileUrl = `${baseUrl}/${profile.slug}`;
  const description =
    profile.description ||
    `${profile.businessName} - ${profile.category} in ${profile.city || profile.country || "your area"}. Visit our page for offers, menu, and more.`;

  const schemaMarkup = generateSchemaMarkup(profile);

  return {
    title: `${profile.businessName} | Predator Grid`,
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
      card: "summary_large_image",
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
    other: {
      "application/ld+json": JSON.stringify(schemaMarkup),
    },
  };
}

function generateSchemaMarkup(profile: any) {
  const baseSchema: any = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: profile.businessName,
    description: profile.description || "",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "https://predatorgrid.com"}/${profile.slug}`,
  };

  if (profile.logoUrl) baseSchema.logo = profile.logoUrl;
  if (profile.phone) baseSchema.telephone = profile.phone;
  if (profile.email) baseSchema.email = profile.email;

  if (profile.address || profile.city || profile.country) {
    baseSchema.address = {
      "@type": "PostalAddress",
      streetAddress: profile.address || "",
      addressLocality: profile.city || "",
      addressRegion: profile.state || "",
      addressCountry: profile.country || "",
    };
  }

  if (profile.website) baseSchema.sameAs = [profile.website];

  switch (profile.category) {
    case "restaurant":
      baseSchema["@type"] = "Restaurant";
      break;
    case "cafe":
      baseSchema["@type"] = "CafeOrCoffeeShop";
      break;
    case "hotel":
      baseSchema["@type"] = "Hotel";
      break;
    case "salon":
      baseSchema["@type"] = "BeautySalon";
      break;
    case "gym":
      baseSchema["@type"] = "HealthClub";
      break;
    case "retail":
      baseSchema["@type"] = "Store";
      break;
  }

  return baseSchema;
}
