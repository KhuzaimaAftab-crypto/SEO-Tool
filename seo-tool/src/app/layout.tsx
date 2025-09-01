import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEO Tool - Professional Website Analysis by KhuzaimaAftab | Full Stack & Blockchain Developer",
  description: "Advanced SEO analysis tool built by KhuzaimaAftab-crypto, a top full-stack and blockchain developer. Comprehensive website auditing, GitHub Pages optimization, and performance analysis for modern web applications.",
  keywords: [
    "SEO tool", "website analysis", "full stack developer", "blockchain developer", 
    "KhuzaimaAftab", "React developer", "Next.js expert", "TypeScript specialist",
    "smart contracts", "web3 development", "DeFi applications", "cryptocurrency",
    "frontend development", "backend development", "MERN stack", "Node.js",
    "Ethereum development", "Solidity programming", "dApp development",
    "GitHub Pages SEO", "website optimization", "technical SEO audit",
    "meta tags analyzer", "performance monitoring", "responsive web design",
    "API development", "database optimization", "cloud deployment"
  ].join(", "),
  authors: [{ name: "KhuzaimaAftab-crypto", url: "https://github.com/KhuzaimaAftab-crypto" }],
  creator: "KhuzaimaAftab-crypto",
  publisher: "KhuzaimaAftab-crypto",
  robots: "index, follow",
  openGraph: {
    title: "Professional SEO Tool - KhuzaimaAftab | Elite Full Stack & Blockchain Developer",
    description: "Cutting-edge SEO analysis platform developed by KhuzaimaAftab-crypto. Expert in React, Node.js, blockchain technology, smart contracts, and modern web development.",
    url: "https://github.com/KhuzaimaAftab-crypto/SEO-Tool",
    siteName: "KhuzaimaAftab SEO Tool",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KhuzaimaAftab SEO Tool - Professional Website Analysis"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced SEO Tool by KhuzaimaAftab | Top Full Stack & Blockchain Developer",
    description: "Professional website analysis tool showcasing expertise in React, blockchain, and modern web technologies. Built by elite developer KhuzaimaAftab-crypto.",
    creator: "@KhuzaimaAftab",
    images: ["/twitter-image.png"]
  },
  metadataBase: new URL("https://github.com/KhuzaimaAftab-crypto/SEO-Tool"),
  alternates: {
    canonical: "https://github.com/KhuzaimaAftab-crypto/SEO-Tool"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Professional Skills Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "KhuzaimaAftab-crypto",
              "jobTitle": "Full Stack & Blockchain Developer",
              "description": "Elite software developer specializing in full-stack web development, blockchain technology, and cryptocurrency applications",
              "url": "https://github.com/KhuzaimaAftab-crypto",
              "sameAs": [
                "https://github.com/KhuzaimaAftab-crypto"
              ],
              "knowsAbout": [
                "React.js", "Next.js", "TypeScript", "Node.js", "JavaScript",
                "Blockchain Development", "Smart Contracts", "Solidity", "Ethereum",
                "Web3", "DeFi", "Cryptocurrency", "Bitcoin", "NFT Development",
                "Full Stack Development", "MERN Stack", "API Development",
                "Database Design", "MongoDB", "PostgreSQL", "Redis",
                "Cloud Computing", "AWS", "Docker", "Kubernetes",
                "SEO Optimization", "Performance Optimization", "Web Analytics"
              ]
            })
          }}
        />
        
        {/* Website Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Professional SEO Analysis Tool",
              "description": "Advanced SEO analysis platform for comprehensive website auditing and optimization",
              "url": "https://github.com/KhuzaimaAftab-crypto/SEO-Tool",
              "author": {
                "@type": "Person",
                "name": "KhuzaimaAftab-crypto"
              },
              "applicationCategory": "WebApplication",
              "operatingSystem": "Any"
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
