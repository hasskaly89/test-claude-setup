import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tanned Co. | Sydney's First Automated Spray Tanning Studio",
    template: "%s | Tanned Co.",
  },
  description:
    "Tanned Co. is Sydney's first automated spray tanning studio. Private booths, perfect results, open 7 days. 5 locations across Sydney — Caringbah, Edensor Park, Kings Park, Smeaton Grange & Woollahra.",
  keywords: [
    "spray tan Sydney",
    "automated spray tan",
    "spray tanning near me",
    "Tanned Co",
    "self tan booth",
    "private spray tan",
    "spray tan Caringbah",
    "spray tan Edensor Park",
    "spray tan Kings Park",
    "spray tan Smeaton Grange",
    "spray tan Woollahra",
    "contactless spray tan",
    "best spray tan Sydney",
  ],
  metadataBase: new URL("https://www.tannedco.com.au"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tanned Co. | Sydney's First Automated Spray Tanning Studio",
    description:
      "Private automated spray tanning booths across 5 Sydney locations. Book online, step in, and walk out glowing. Open 7 days.",
    url: "https://www.tannedco.com.au",
    siteName: "Tanned Co.",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://images.squarespace-cdn.com/content/v1/65cec61119c06337bea7a946/b1474ec4-23ae-4f11-9e38-66d88c73ace9/DSCF3371.jpg",
        width: 1500,
        height: 1000,
        alt: "Tanned Co. automated spray tanning studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanned Co. | Sydney's First Automated Spray Tanning Studio",
    description:
      "Private automated spray tanning booths across 5 Sydney locations. Book online and walk out glowing.",
    images: [
      "https://images.squarespace-cdn.com/content/v1/65cec61119c06337bea7a946/b1474ec4-23ae-4f11-9e38-66d88c73ace9/DSCF3371.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
