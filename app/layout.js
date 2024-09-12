import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar';
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Koora Live Matches - بث مباشر للمباريات",
  description: "Watch live football matches with Koora - بث مباشر لأحدث المباريات وتحليل نتائج المباريات",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Basic SEO */}
        <meta name="description" content="Watch live football matches with Koora. بث مباشر للمباريات مع تغطية شاملة وتحليل النتائج." />
        <meta name="keywords" content="koora live, football live matches, بث مباشر, koora, live football" />
        <meta name="author" content="Anas Akil" />
        <meta name="robots" content="index, follow" />
        
        {/* Arabic-specific SEO */}
        <meta httpEquiv="Content-Language" content="ar" />
        <meta name="description" content="بث مباشر لمباريات كرة القدم مع كوورة وتحليل شامل للنتائج." lang="ar" />
        <meta name="keywords" content="كوورة بث مباشر, كرة القدم المباشرة, مباريات كرة القدم" lang="ar" />

        {/* Open Graph for Social Sharing */}
        <meta property="og:title" content="Koora Live Matches - بث مباشر للمباريات" />
        <meta property="og:description" content="Watch live football matches with Koora. بث مباشر لأحدث المباريات وتحليل النتائج." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kooranext.com" />
        <meta property="og:image" content="https://kooranext.com/og-image.jpg" /> 
        <meta property="og:site_name" content="KooraNext" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Koora Live Matches - بث مباشر للمباريات" />
        <meta name="twitter:description" content="Watch live football matches with Koora. بث مباشر لأحدث المباريات وتحليل النتائج." />
        <meta name="twitter:image" content="https://kooranext.com/og-image.jpg" />
        
        {/* Structured Data for Search Engines */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            "name": "Koora Live Football Matches",
            "description": "Watch live football matches and in-depth analysis of game results on Koora.",
            "startDate": "2024-09-15T20:00:00+01:00",  // Adjust accordingly
            "endDate": "2024-09-15T22:00:00+01:00",   // Adjust accordingly
            "url": "https://kooranext.com",
            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "performer": {
              "@type": "SportsTeam",
              "name": "Team A",
            },
            "location": {
              "@type": "VirtualLocation",
              "url": "https://kooranext.com/live"
            }
          })}
        </script>

      </Head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
