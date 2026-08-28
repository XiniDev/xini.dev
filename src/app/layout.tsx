import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  style: "italic",
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "XiniDev",
  description: "My Personal Website",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#05100d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
