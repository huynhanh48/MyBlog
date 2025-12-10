import type { Metadata } from "next";
import "../globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "FDT",
  description: "Fredom trading",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
