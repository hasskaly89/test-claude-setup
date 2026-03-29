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
    default: "Reformd Pilates | Boutique Reformer Pilates Studio",
    template: "%s | Reformd Pilates",
  },
  description:
    "Reformd Pilates is a boutique owner-operated reformer pilates studio with locations in Cecil Hills and Kings Park, NSW. Small class sizes, personalised attention, and classes for every fitness level.",
  keywords: [
    "reformer pilates Sydney",
    "pilates Cecil Hills",
    "pilates Kings Park",
    "boutique pilates studio",
    "Reformd Pilates",
    "pilates classes NSW",
    "beginner pilates",
    "pilates with creche",
    "pilates membership",
    "sculpt pilates",
    "power pilates",
    "ignite HIIT pilates",
  ],
  metadataBase: new URL("https://www.reformdpilates.com.au"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Reformd Pilates | Boutique Reformer Pilates Studio",
    description:
      "Boutique reformer pilates at Cecil Hills and Kings Park. Small class sizes, 5 class types, creche available. Book your class today.",
    url: "https://www.reformdpilates.com.au",
    siteName: "Reformd Pilates",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/a6acf6e3-1c59-4391-a994-838fd0f2b527/DSC05771-Enhanced-NR.jpg",
        width: 1500,
        height: 1000,
        alt: "Reformd Pilates studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reformd Pilates | Boutique Reformer Pilates Studio",
    description:
      "Boutique reformer pilates at Cecil Hills and Kings Park. Book your class today.",
    images: [
      "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/a6acf6e3-1c59-4391-a994-838fd0f2b527/DSC05771-Enhanced-NR.jpg",
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
