import "./globals.css";
import "./font.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Script from "next/script";
import NextTopLoader from 'nextjs-toploader';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Eastern Mirror",
  description:
    "Eastern Mirror brings you the latest breaking news and current affairs. The top stories on politics, business, sports, technology, education, arts and",
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
        {children}
      </body>
    </html>
  );
}
