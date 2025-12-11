import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Suspense } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Freedom Trading VN",
  description: "Freedom trading",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${montserrat.variable} antialiased `}
      >
        <Suspense> {children}</Suspense>
      </body>
    </html>
  );
}
