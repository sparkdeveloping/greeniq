import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://greeniqlawn.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GreenIQ | Soil-First Lawn Science for Kansas & Midwest Lawns",
    template: "%s | GreenIQ"
  },
  description:
    "GreenIQ is a Midwest-owned, soil-first lawn system built around seasonal phases: Launch X, Fortify+, Defend, and Recover. Get a clearer lawn plan without guessing.",
  keywords: [
    "GreenIQ",
    "lawn care Kansas",
    "Midwest lawn care",
    "soil first lawn care",
    "lawn fertilizer system",
    "Launch X",
    "Fortify+",
    "Defend lawn",
    "Recover lawn"
  ],
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: "GreenIQ | Stop Guessing. Start Sequencing.",
    description:
      "A premium, soil-first lawn system that matches the season your lawn is actually in.",
    url: siteUrl,
    siteName: "GreenIQ",
    images: [
      {
        url: "https://greeniqlawn.com/cdn/shop/files/Fortify_WebHero.png?v=1778613296&width=3840",
        width: 1600,
        height: 900,
        alt: "GreenIQ Fortify+ product in a Kansas lawn"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenIQ | Soil-First Lawn Science",
    description:
      "Four seasonal phases. One smarter lawn system for Kansas and Midwest homeowners.",
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
