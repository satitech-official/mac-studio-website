import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "MAC Studio | Art Classes & Creative Workshops in Sector 57, Gurugram";
const description = "Discover art classes, creative workshops, painting, sketching, calligraphy, pottery and engaging art programs for kids and adults at MAC Studio in Sector 57, Gurugram.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mac-studio.example"),
  title,
  description,
  keywords: ["art classes Gurugram", "art workshops Sector 57", "painting classes Gurugram", "kids art classes", "MAC Studio Gurugram"],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_IN",
    siteName: "MAC Studio",
    images: [{ url: "/og.png", width: 1732, height: 909, alt: "MAC Studio — Ignite Your Creativity Through Art" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#191714",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IN"><body>{children}</body></html>;
}
