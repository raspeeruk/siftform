import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
