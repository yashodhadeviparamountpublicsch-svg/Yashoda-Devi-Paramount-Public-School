import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/auth-context";
import { SiteSettingsProvider } from "@/lib/site-settings";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ydpps.in"),
  title: {
    default: "Yashoda Devi Paramount Public School",
    template: "%s | YDPPS"
  },
  description: "Yashoda Devi Paramount Public School (YDPPS) is the best school in Haveli Kharagpur, Munger, offering world-class CBSE education. A top choice for students in Jamui and nearby areas.",
  keywords: [
    "Best School in Haveli Kharagpur",
    "Best School in Munger",
    "Best School in Jamui",
    "Best School Near Me",
    "YDPPS",
    "Yashoda Devi Paramount Public School",
    "Top CBSE School in Bihar",
    "Admissions 2026-27",
    "English Medium School Munger"
  ],
  authors: [{ name: "YDPPS" }],
  creator: "Yashoda Devi Paramount Public School",
  publisher: "Yashoda Devi Paramount Public School",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Yashoda Devi Paramount Public School",
    description: "Nurturing Excellence, Inspiring Futures. Join YDPPS for a journey of holistic learning and growth.",
    url: "https://ydpps.in",
    siteName: "Yashoda Devi Paramount Public School",
    images: [
      {
        url: "/images/school-hero.png",
        width: 1200,
        height: 630,
        alt: "Yashoda Devi Paramount Public School Campus",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashoda Devi Paramount Public School",
    description: "Nurturing Excellence, Inspiring Futures.",
    images: ["/images/school-hero.png"],
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
  verification: {
    google: "slAqZ4QG5zpdsckz897NsmmKGSe3CWBNj9oIqgDdDHs",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${dmSans.variable} antialiased bg-mesh-orange text-foreground font-sans min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <SiteSettingsProvider>
            {/* JSON-LD Schema for SEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "School",
                  "name": "Yashoda Devi Paramount Public School",
                  "alternateName": "YDPPS",
                  "url": "https://ydpps.in",
                  "logo": "https://ydpps.in/images/logo.jpg",
                  "image": "https://ydpps.in/images/school-hero.png",
                  "description": "Yashoda Devi Paramount Public School is a leading educational institution in Kharagpur, Bihar, committed to holistic development and academic excellence.",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Kharagpur - Asarganj Rd",
                    "addressLocality": "Kharagpur",
                    "addressRegion": "Bihar",
                    "postalCode": "811213",
                    "addressCountry": "IN"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-6205878510",
                    "contactType": "admissions",
                    "areaServed": "IN",
                    "availableLanguage": ["en", "hi"]
                  },
                  "sameAs": [
                    "https://www.facebook.com/ydppublicschool",
                    "https://www.instagram.com/ydp.publicschool",
                    "https://www.youtube.com/@ydppublicschool"
                  ]
                })
              }}
            />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </SiteSettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
