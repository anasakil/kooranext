import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar';
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "kooranext",
  description: "Welcome to My Awesome Site, where we offer amazing content and insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Head>
          {/* Meta tags for SEO */}
          <meta name="description" content="Welcome to My Awesome Site, where we offer amazing content and insights." />
          <meta name="keywords" content="awesome, site, content, insights" />
          <meta name="author" content="Your Name" />

          {/* Google AdSense verification */}
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6784576418150334" crossorigin="anonymous"></script>
        </Head>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
