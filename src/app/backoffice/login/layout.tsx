import { BackofficeThemeProvider } from "@/components/backoffice/theme-provider";

export default function BackofficeLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BackofficeThemeProvider>{children}</BackofficeThemeProvider>;
}
