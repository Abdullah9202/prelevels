import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";

import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prelevels",
  description: "Prepare with confidence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>{children}</body>
      {/* <body className={poppins.className}>{children}<body/> */}
    </html>
  );
}
