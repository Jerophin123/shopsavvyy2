import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopSavvy - Premium E-Commerce Experience",
  description: "Discover amazing products with our premium liquid glass design and smooth animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen`}
      >
        <Navigation />
        <main className="pt-[50px] md:pt-16 min-h-screen mobile-container">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
