import type { Metadata } from "next";
import { Inter, Montserrat, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LenisScrollProvider } from "@/components/LenisScrollProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Navbar } from "@/components/Navbar";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "500", "700", "900"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LOOMIE — Clear. Connected. Complete.",
  description:
    "LOOMIE is a premium design & technology studio. Clear. Connected. Complete. — Specializing in kinetic web development, brutalist spatial concepts, and digital branding.",
  keywords: [
    "LOOMIE",
    "Clear Connected Complete",
    "Branding Studio",
    "Kinetic Web Development",
    "Spatial Architecture",
    "Digital Branding",
  ],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "LOOMIE — Clear. Connected. Complete.",
    description:
      "LOOMIE is a premium design & technology studio. Clear. Connected. Complete.",
    url: "https://loomiestudio.com",
    siteName: "LOOMIE",
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} ${caveat.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <LenisScrollProvider>
            <ScrollToTop />
            <Navbar />
            {children}
            <CookieConsent />
          </LenisScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
