import "./globals.css";
import "./font.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@/components/ScrollToTop";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title:
    "Eastern Mirror: Latest News, Top Headlines, Breaking News, Live Updates from Nagaland & Beyond",
  description:
    "Stay informed with breaking news, top headlines, and live updates on politics, sports, business, tech, and more from Nagaland, India & world.",

  keywords: [
    "Nagaland news",
    "India news",
    "world news",
    "breaking news",
    "political updates",
    "sports headlines",
    "tech news",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-6451251690288368" />
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="afterInteractive"
        />
        {/* Add Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6451251690288368"
          crossOrigin="anonymous"
        ></Script>

        {/* Add Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4E1QMEYP2C"
        ></Script>
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4E1QMEYP2C');
            `,
          }}
        ></Script>
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased w-full overflow-x-hidden",
          fontSans.variable
        )}
      >
        <NextTopLoader />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
