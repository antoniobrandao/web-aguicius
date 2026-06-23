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
    <main className="relative flex min-h-dvh items-center justify-center bg-muted/40 px-4 py-12">
      <div className="absolute right-4 top-4">
        <BackofficeThemeToggle />
      </div>
      <Card className="w-full max-w-sm rounded-xl shadow-sm">
        <CardHeader className="gap-3">
          <span className="text-xs font-semibold tracking-[0.22em] text-primary">
            AGUICIUS
          </span>
          <div className="flex flex-col gap-1.5">
            <CardTitle>Backoffice</CardTitle>
            <CardDescription>
              Introduza a palavra-passe para gerir os conteúdos do website.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
