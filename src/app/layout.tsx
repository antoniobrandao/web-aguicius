import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aguicius.com"),
  title: {
    default: "Aguicius — Peça o seu orçamento",
    template: "%s — Aguicius",
  },
  description:
    "Soluções Smart de transporte e serviços. Transporte de mercadorias, montagens, instalações, entregas, mudanças e armazenamento em todo o território nacional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body className={`${montserrat.variable} flex min-h-dvh flex-col`}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
