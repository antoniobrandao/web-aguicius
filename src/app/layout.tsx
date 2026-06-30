import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";
import "./frontend.css";
import { TooltipProvider } from "@/components/ui/tooltip";

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
      <body className={`${montserrat.variable} min-h-dvh`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
