import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";

// Initialize Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thrifnity.com"),
  title: {
    default: "Thrifnity | Sustainable Fashion Platform",
    template: "%s | Thrifnity",
  },
  description:
    "Platform terbaik untuk fashion second-hand, repair, dan trade di Indonesia",
  keywords: [
    "thrift",
    "sustainable fashion",
    "second-hand",
    "clothing repair",
    "fashion trade",
    "eco-friendly fashion",
    "preloved fashion",
    "fashion marketplace",
  ],
  authors: [{ name: "Thrifnity Team" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://thrifnity.com",
    siteName: "Thrifnity",
    title: "Thrifnity | Sustainable Fashion Platform",
    description:
      "Platform terbaik untuk fashion second-hand, repair, dan trade di Indonesia",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thrifnity - Sustainable Fashion Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thrifnity | Sustainable Fashion Platform",
    description:
      "Platform terbaik untuk fashion second-hand, repair, dan trade di Indonesia",
    images: ["/og-image.jpg"],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="id"
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            {/* Skip to main content link for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-primary"
            >
              Skip to main content
            </a>

            <Navbar />

            <main
              id="main-content"
              className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"
            >
              {children}
            </main>

            <Footer />
          </div>
        </ThemeProvider>

        {/* Add analytics script if needed */}
        {process.env.NODE_ENV === "production" && (
          <script
            defer
            data-domain="thrifnity.com"
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  );
}
