import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import WhatsAppButton from "../components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const fontClasses = `${inter.variable} ${playfair.variable} ${cormorant.variable} ${jetbrains.variable}`;

export const metadata: Metadata = {
  title: "Jolily Blooms Equator Limited",
  description:
    "Jolily Blooms Equator Limited connects international buyers with export-grade Kenyan flowers, delivering reliable sourcing and quality.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://jolilybloomsequator.com",
  ),
  openGraph: {
    title: "Jolily Blooms Equator Limited",
    description:
      "Kenyan flower sourcing partner for Europe, the Middle East, and global wholesale buyers.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jolilybloomsequator.com",
    siteName: "Jolily Blooms Equator Limited",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontClasses} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
