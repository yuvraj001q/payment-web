export function generateSchemaMarkup(profile: {
  businessName: string;
  description: string | null;
  category: string;
  slug: string;
  logoUrl: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  website: string | null;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://predatorgrid.com";

  const typeMap: Record<string, string> = {
    restaurant: "Restaurant",
    cafe: "CafeOrCoffeeShop",
    hotel: "Hotel",
    salon: "BeautySalon",
    gym: "HealthClub",
    retail: "Store",
    creator: "Organization",
    services: "LocalBusiness",
    general: "LocalBusiness",
  };

  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": typeMap[profile.category] || "LocalBusiness",
    name: profile.businessName,
    description: profile.description || "",
    url: `${baseUrl}/${profile.slug}`,
  };

  if (profile.logoUrl) schema.logo = profile.logoUrl;
  if (profile.phone) schema.telephone = profile.phone;

  if (profile.address || profile.city || profile.country) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: profile.address || "",
      addressLocality: profile.city || "",
      addressRegion: profile.state || "",
      addressCountry: profile.country || "",
    };
  }

  if (profile.website) {
    schema.sameAs = [profile.website];
  }

  return schema;
}
