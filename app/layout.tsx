import "@/styles/globals.css";
import { Inter } from "next/font/google";
import React from "react"; // Import React

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Maps Application",
  description: "A Google Maps-like application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
