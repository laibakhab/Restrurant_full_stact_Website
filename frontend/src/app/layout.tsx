import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/ReduxProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://spiceroute.pk"),
  title: {
    default: "SpiceRoute | Authentic Karachi Flavors - Best Biryani & BBQ",
    template: "%s | SpiceRoute Karachi"
  },
  description: "Experience the boldest flavors in Karachi! Order authentic Biryani, BBQ, and Burgers online. Fast 30-min delivery across Karachi.",
  keywords: ["Restaurant Karachi", "Best Biryani Karachi", "Food Delivery Karachi", "BBQ Karachi", "SpiceRoute Karachi", "Order Food Online Karachi"],
  openGraph: {
    title: "SpiceRoute | Authentic Karachi Flavors",
    description: "Experience the boldest flavors in Karachi! Order authentic Biryani, BBQ, and Burgers online.",
    url: "https://spiceroute.pk",
    siteName: "SpiceRoute",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SpiceRoute Restaurant Karachi",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpiceRoute | Authentic Karachi Flavors",
    description: "Experience the boldest flavors in Karachi! Order authentic Biryani, BBQ, and Burgers online.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "SpiceRoute",
  "image": "https://spiceroute.pk/og-image.jpg",
  "@id": "https://spiceroute.pk",
  "url": "https://spiceroute.pk",
  "telephone": "+922134567890",
  "priceRange": "$$",
  "menu": "https://spiceroute.pk/menu",
  "servesCuisine": ["Pakistani", "BBQ", "Biryani"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Main Tariq Road, PECHS",
    "addressLocality": "Karachi",
    "addressRegion": "Sindh",
    "postalCode": "75400",
    "addressCountry": "PK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 24.875324,
    "longitude": 67.056024
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "12:00",
    "closes": "03:00"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
