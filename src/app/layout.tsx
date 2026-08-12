import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";
import "./frontend.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteMeta } from "@/content/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Metadata belongs to this site, not to the platform: it is static, versioned with
// the code, and each route adds its own title and description.
export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: siteMeta.title,
    template: siteMeta.titleTemplate,
  },
  description: siteMeta.description,
};

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
