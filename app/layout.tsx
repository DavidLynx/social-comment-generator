import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://social-comment-generator.vercel.app"),
  applicationName: "Commentra",
  title: "Commentra - Social Comment Generator",
  description:
    "Create realistic TikTok-style and Instagram-style comment mockups directly in your browser.",
  icons: {
    icon: [
      { url: "/assets/icons/favicon.ico" },
      { url: "/assets/icons/commentra-logo.svg", type: "image/svg+xml" },
    ],
    shortcut: [
      { url: "/assets/icons/favicon.ico" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "icon",
        url: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        url: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
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
