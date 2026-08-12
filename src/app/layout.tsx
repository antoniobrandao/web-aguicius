import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";
import "./frontend.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getSettings } from "@/lib/content/content";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Site-wide metadata is business data: the client maintains it in the casadigital
// dashboard. Each field is only set when authored, so an empty site simply has no
// metadata rather than placeholder text.
export async function generateMetadata(): Promise<Metadata> {
  const { name, description, seo } = await getSettings();
  const defaultTitle = seo.defaultTitle || name;

  let metadataBase: URL | undefined;
  if (seo.metadataBase) {
    try {
      metadataBase = new URL(seo.metadataBase);
    } catch {
      console.error(`[content] settings.seo.metadataBase is not a valid URL: ${seo.metadataBase}`);
    }
  }

  return {
    ...(metadataBase ? { metadataBase } : {}),
    ...(defaultTitle
      ? {
          title: {
            default: defaultTitle,
            template: seo.titleTemplate || `%s — ${defaultTitle}`,
          },
        }
      : {}),
    ...(seo.defaultDescription || description
      ? { description: seo.defaultDescription || description }
      : {}),
  };
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
