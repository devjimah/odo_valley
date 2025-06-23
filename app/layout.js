import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientVideoBackground from "./components/ClientVideoBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Odo Valley - Sustainable Agriculture & Biodiversity",
  description:
    "Experience sustainable living, rich biodiversity, and authentic farm-to-table experiences in the heart of nature's paradise.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Global Video Background */}
        <ClientVideoBackground />

        {/* Main Content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
