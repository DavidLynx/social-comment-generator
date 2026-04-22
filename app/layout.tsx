import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://social-comment-generator.vercel.app"),
  title: "Social Comment Generator",
  description:
    "Create bilingual TikTok-style and Instagram-style social comment mockups.",
  verification: {
    google: "GmDibdMIwDxhmer4HphXDrqgct6T_gP3V5xo16tG2DU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-background antialiased dark">
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
