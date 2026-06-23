"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Status = "idle" | "submitting" | "success" | "error";

export function QuoteForm({
  compact = false,
  services,
}: {
  compact?: boolean;
  services: { slug: string; title: string }[];
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { success?: boolean }
        | null;

      if (!response.ok || !result?.success) {
        throw new Error("Request failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 border border-border bg-card p-12 text-center">
        <CheckCircle2 className="size-12 text-primary" />
        <h3 className="text-xl font-bold uppercase tracking-wide text-secondary">
          Pedido enviado
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Obrigado pelo seu contacto. A equipa Aguicius irá responder ao seu
          pedido de orçamento o mais brevemente possível.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Enviar novo pedido
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 border border-border bg-card p-8 lg:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Nome" required>
          <Input id="name" name="name" placeholder="O seu nome" required />
        </Field>
        <Field id="email" label="Email" required>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="[email protected]"
            required
          />
        </Field>
        <Field id="phone" label="Telefone">
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+351 ..."
          />
        </Field>
        <Field id="service" label="Serviço">
          <select
            id="service"
            name="service"
            defaultValue=""
            className="flex h-12 w-full border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
          >
            <option value="" disabled>
              Selecione um serviço
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {!compact ? (
        <Field id="origin-destination" label="Recolha / Entrega">
          <Input
            id="origin-destination"
            name="origin-destination"
            placeholder="Origem → Destino"
          />
        </Field>
      ) : null}

      <Field id="message" label="Mensagem" required>
        <Textarea
          id="message"
          name="message"
          placeholder="Descreva o que precisa transportar ou o serviço pretendido."
          required
        />
      </Field>

      {status === "error" ? (
        <div className="flex items-start gap-3 border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p>
            Não foi possível enviar o seu pedido. Tente novamente ou contacte-nos
            diretamente.
          </p>
        </div>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="self-start"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "A enviar..." : "Reserve já"}
        <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </Label>
      {children}
    </div>
  );
}
