import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "kooranext", // Mettez à jour le titre ici
  description: "Welcome to My Awesome Site, where we offer amazing content and insights.", // Mettez à jour la description ici
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Meta tags for SEO */}
        <meta name="description" content="Welcome to My Awesome Site, where we offer amazing content and insights." />
        <meta name="keywords" content="awesome, site, content, insights" />
        <meta name="author" content="Your Name" />
        
        {/* Google AdSense verification */}
        <meta name="google-adsense-account" content="ca-pub-6784576418150334">
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
