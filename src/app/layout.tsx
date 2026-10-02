import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Archivo } from "next/font/google";

import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { buildRootMetadata } from "@/lib/content/metadata";

// Variable in weight and width; headlines use the wide end of the width axis.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// Titled after the business, which the client maintains in the dashboard.
export function generateMetadata(): Promise<Metadata> {
  return buildRootMetadata();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" className={archivo.variable}>
      <body className="min-h-dvh">
        <TooltipProvider>{children}</TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
