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

// Casa Digital's live preview of the website blocks: loads the platform's hook
// only when the page is framed by the backoffice. Exactly as
// https://www.casadigital.pt/api/v1/integration.md gives it; it must stay a
// classic inline script from that URL, never bundled or copied here.
const PREVIEW_HOOK_LOADER = `if(window.self!==window.top){var s=document.createElement("script");s.src="https://www.casadigital.pt/preview-hook.js";s.async=true;document.head.appendChild(s)}`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREVIEW_HOOK_LOADER }} />
      </head>
      <body className="min-h-dvh">
        <TooltipProvider>{children}</TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
