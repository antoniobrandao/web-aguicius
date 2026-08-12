import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";
import "./frontend.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { buildRootMetadata } from "@/lib/content/metadata";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
    <html lang="pt-PT">
      <body className={`${montserrat.variable} min-h-dvh`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
