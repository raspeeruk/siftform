import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-9C5YW41WFP";

export const metadata: Metadata = {
  title: "Sift — Turn Unstructured Text into Structured Data",
  description:
    "Replace your forms with natural language. Users describe their situation, AI extracts the data you need. Embed anywhere with one line of code.",
  openGraph: {
    title: "Sift — Turn Unstructured Text into Structured Data",
    description:
      "Replace your forms with natural language. Users describe their situation, AI extracts the data you need.",
    siteName: "Sift",
  },
  verification: {
    google: "Iputr7VnmeGAdV7BDD9009KppfZ5QI1O96e_m589DYY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,900&f[]=switzer@300,400,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fragment+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
