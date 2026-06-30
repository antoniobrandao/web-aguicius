"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/site/ui/button";
import { Input } from "@/components/site/ui/input";
import { Select } from "@/components/site/ui/select";
import { Textarea } from "@/components/site/ui/textarea";
import { Label } from "@/components/site/ui/label";

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
      <div className="frontend-flat-card flex flex-col items-center gap-4 p-12 text-center">
        <CheckCircle2 className="size-12 text-frontend-brand" />
        <h3 className="text-xl font-medium leading-7 tracking-widest text-frontend-heading">
          Pedido enviado
        </h3>
        <p className="frontend-copy max-w-md text-sm">
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
      className="frontend-flat-card flex flex-col gap-6 p-8 lg:p-10"
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
          <Select
            id="service"
            name="service"
            defaultValue=""
          >
            <option value="" disabled>
              Selecione um serviço
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </Select>
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
        <div className="flex items-start gap-3 border border-frontend-danger/40 bg-frontend-danger/5 p-4 text-sm text-frontend-danger">
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
        {required ? <span className="text-frontend-brand"> *</span> : null}
      </Label>
      {children}
    </div>
  );
}
