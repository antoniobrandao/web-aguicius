import { BackofficeThemeProvider } from "../_components/theme";

export default function BackofficeLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BackofficeThemeProvider>{children}</BackofficeThemeProvider>;
}
