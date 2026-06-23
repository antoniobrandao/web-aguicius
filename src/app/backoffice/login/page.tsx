import type { Metadata } from "next";

import { LoginForm } from "./login-form";
import { BackofficeThemeToggle } from "@/components/backoffice/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Backoffice",
  robots: { index: false, follow: false },
};

export default function BackofficeLoginPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center bg-muted px-4 py-12">
      <div className="absolute right-4 top-4">
        <BackofficeThemeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Backoffice Aguicius</CardTitle>
          <CardDescription>
            Introduza a palavra-passe para gerir os conteúdos do website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
