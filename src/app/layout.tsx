import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Predator Grid - The Bento-Grid Linktree Killer",
    template: "%s | Predator Grid",
  },
  description:
    "Create high-converting public landing pages with premium Bento Grid layout for local businesses. The modern Linktree alternative.",
  keywords: [
    "linktree alternative",
    "bento grid",
    "local business",
    "landing page",
    "bio link",
    "QR code",
    "local seo",
  ],
  authors: [{ name: "Predator Grid" }],
  creator: "Predator Grid",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Predator Grid",
    title: "Predator Grid - The Bento-Grid Linktree Killer",
    description:
      "Create high-converting public landing pages with premium Bento Grid layout for local businesses.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Predator Grid - The Bento-Grid Linktree Killer",
    description:
      "Create high-converting public landing pages with premium Bento Grid layout for local businesses.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
