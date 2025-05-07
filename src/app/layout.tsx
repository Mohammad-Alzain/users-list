import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Directory",
  description: "Browse and search users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${inter.className} antialiased bg-slate-50 dark:bg-slate-950 min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="container mx-auto px-4 py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
