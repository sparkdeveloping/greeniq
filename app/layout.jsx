import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://greeniqlawn.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GreenIQ | Corporate-Ready Lawn Science for Midwest Turf",
    template: "%s | GreenIQ"
  },
  description:
    "GreenIQ is a soil-first turf system for homeowners, facilities teams, lawn care professionals, and commercial property programs. Explore a clear four-phase lawn care framework.",
  keywords: [
    "GreenIQ",
    "commercial lawn care products",
    "Midwest lawn care",
    "Kansas lawn care",
    "soil-first turf program",
    "facilities lawn care",
    "property management lawn products",
    "Launch X",
    "Fortify+",
    "Defend lawn",
    "Recover lawn"
  ],
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: "GreenIQ | Corporate-Ready Lawn Science",
    description:
      "A professional four-phase turf system for residential lawns, commercial properties, facilities teams, and lawn care operators.",
    url: siteUrl,
    siteName: "GreenIQ",
    images: [
      {
        url: "https://greeniqlawn.com/cdn/shop/files/Fortify_WebHero.png?v=1778613296&width=3840",
        width: 1600,
        height: 900,
        alt: "GreenIQ turf product system"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenIQ | Corporate-Ready Lawn Science",
    description:
      "A four-phase turf program built for clear residential and commercial lawn decisions.",
    images: ["https://greeniqlawn.com/cdn/shop/files/Fortify_WebHero.png?v=1778613296&width=3840"]
  },
  icons: {
    icon: "/leaf-mark.svg",
    apple: "/leaf-mark.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
