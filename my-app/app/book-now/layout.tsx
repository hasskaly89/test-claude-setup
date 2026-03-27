import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Now",
  description:
    "Book your automated spray tan session at Tanned Co. Choose from 5 Sydney locations — Caringbah, Edensor Park, Kings Park, Smeaton Grange & Woollahra. Private booths, online booking, open 7 days.",
  alternates: {
    canonical: "/book-now",
  },
  openGraph: {
    title: "Book Your Spray Tan | Tanned Co.",
    description:
      "Book your private automated spray tan session online. 5 locations across Sydney, open 7 days a week.",
    url: "https://www.tannedco.com.au/book-now",
    images: [
      {
        url: "https://images.squarespace-cdn.com/content/v1/65cec61119c06337bea7a946/68dfbc5a-7570-4655-8931-499fc2d58a0b/DSCF3334-HIGHRES-2.jpg",
        width: 1500,
        height: 1000,
        alt: "Book a spray tan session at Tanned Co.",
      },
    ],
  },
};

export default function BookNowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
