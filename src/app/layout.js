import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {  QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import QueryProvider from "@/util/QueryProvider";
import AuthProvider from "@/util/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BridgeLearn",
  description: "A low cost tutoring platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
        <QueryProvider>
          <Navbar />
          {children}
       </QueryProvider>
       </AuthProvider>
      </body>
    </html>
  );
}
