import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1Fi EMI Store",
  description: "Dynamic product pages with multiple EMI plans backed by mutual funds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
          <div className="container mx-auto px-4 h-16 flex items-center gap-4 text-sm font-medium text-gray-500">
            <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl mr-4 hover:opacity-80 transition-opacity">
              1Fi
            </Link>
          </div>
        </header>
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
