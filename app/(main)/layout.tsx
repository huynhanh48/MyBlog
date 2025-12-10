import type { Metadata } from "next";
import "../globals.css";
import { Montserrat } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
  return (
    <main
      className="min-h-screen
        flex flex-col justify-between"
    >
      <Header />
      {children}
      <Footer />
    </main>
  );
}
