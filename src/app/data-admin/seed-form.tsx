"use client";

import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { seedDefaultWebsiteContentAction } from "./actions";

const initialState = null;

export function SeedForm() {
  const [state, formAction, pending] = useActionState(
    seedDefaultWebsiteContentAction,
    initialState,
  );

  return (
    <form action={formAction} className="grid gap-3">
      <Button type="submit" disabled={pending}>
        {pending ? <LoaderCircle className="animate-spin" /> : null}
        {pending ? "A gravar..." : "Gravar default normalizado"}
      </Button>
      {state?.ok === false ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      {state?.ok === true ? (
        <p className="rounded-md border border-primary/30 bg-primary/5 p-3 text-sm text-primary">
          Seed gravado nas coleções normalizadas.
        </p>
      ) : null}
    </form>
  );
}
