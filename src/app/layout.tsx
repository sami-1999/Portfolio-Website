import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammadsamidev.vercel.app"),
  title: {
    default: "Muhammad Sami | Senior Software Engineer & Full-Stack Developer",
    template: "%s | Muhammad Sami"
  },
  description: "Senior Software Engineer with 5+ years of experience building CRM, ERP, and RESTful APIs using Laravel, React.js, Next.js. Expert in PHP, JavaScript, TypeScript, MySQL, and API integrations. Available for freelance projects on Fiverr and Upwork.",
  keywords: [
    "Muhammad Sami",
    "Software Engineer",
    "Full-Stack Developer",
    "Laravel Developer", 
    "PHP Developer",
    "React Developer",
    "Next.js Developer",
    "API Developer",
    "CRM Development",
    "ERP Development",
    "RESTful APIs",
    "JavaScript",
    "TypeScript",
    "MySQL",
    "PostgreSQL",
    "Docker",
    "Git",
    "Freelancer",
    "Pakistan",
    "Karachi",
    "Web Development",
    "Backend Development",
    "Frontend Development"
  ],
  authors: [{ name: "Muhammad Sami" }],
  creator: "Muhammad Sami",
  publisher: "Muhammad Sami",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammadsamidev.vercel.app",
    title: "Muhammad Sami | Senior Software Engineer & Full-Stack Developer",
    description: "Senior Software Engineer with 5+ years of experience building CRM, ERP, and RESTful APIs using Laravel, React.js, Next.js. Expert in PHP, JavaScript, TypeScript, and API integrations.",
    siteName: "Muhammad Sami Portfolio",
    images: [
      {
        url: "/avatar-main.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Sami - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Sami | Senior Software Engineer & Full-Stack Developer",
    description: "Senior Software Engineer with 5+ years of experience building CRM, ERP, and RESTful APIs using Laravel, React.js, Next.js.",
    images: ["/avatar-main.png"],
    creator: "@muhammad_sami_dev",
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://muhammadsamidev.vercel.app",
  },
  category: "Technology",
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
        <link rel="apple-touch-icon" href="/avatar-main.png" />
        <meta name="theme-color" content="#1e293b" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Muhammad Sami",
              "jobTitle": "Senior Software Engineer",
              "description": "Senior Software Engineer with 5+ years of experience building CRM, ERP, and RESTful APIs using Laravel, React.js, Next.js.",
              "url": "https://muhammadsamidev.vercel.app",
              "image": "https://muhammadsamidev.vercel.app/avatar-main.png",
              "email": "mohammadsami501@gmail.com",
              "telephone": "+92 3132835015",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Karachi",
                "addressCountry": "Pakistan"
              },
              "sameAs": [
                "https://github.com/sami-1999",
                "https://linkedin.com/in/muhammad-sami-dev",
                "https://www.fiverr.com/muhammad_sami_dev",
                "https://www.upwork.com/freelancers/muhammadsami"
              ],
              "knowsAbout": [
                "PHP",
                "Laravel",
                "JavaScript",
                "TypeScript", 
                "React.js",
                "Next.js",
                "MySQL",
                "PostgreSQL",
                "RESTful APIs",
                "CRM Development",
                "ERP Development",
                "Web Development",
                "Full-Stack Development"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Software Engineer",
                "occupationLocation": {
                  "@type": "City",
                  "name": "Karachi, Pakistan"
                }
              }
            })
          }}
        />
        
        {/* Additional SEO Tags */}
        <meta property="og:site_name" content="Muhammad Sami Portfolio" />
        <meta name="author" content="Muhammad Sami" />
        <meta name="copyright" content="© 2026 Muhammad Sami. All rights reserved." />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="web" />
        <meta name="rating" content="general" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
