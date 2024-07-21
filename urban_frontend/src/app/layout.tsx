import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { NextUIProvider } from "@nextui-org/react";
import { StateContext } from "@/context/StateContext";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Urbanshop",
  description: "Hiking and camping gear at its finest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <StateContext>
          <NextUIProvider>
            <header>
              <Navbar />
            </header>
            <main>
              <Toaster />
              {children}
            </main>
            <footer>
              <Footer />
            </footer>
          </NextUIProvider>
        </StateContext>
      </body>
    </html>
  );
}
