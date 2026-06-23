"use client";

import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";

import { loginBackoffice } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState = null;

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginBackoffice,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Palavra-passe</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Introduza a palavra-passe"
          aria-invalid={state?.ok === false}
        />
        {state?.ok === false ? (
          <p className="text-sm text-destructive">{state.error}</p>
        ) : null}
      </div>
      <Button type="submit" variant="primary" className="w-full" disabled={pending}>
        {pending ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : null}
        Entrar
      </Button>
    </form>
  );
}
