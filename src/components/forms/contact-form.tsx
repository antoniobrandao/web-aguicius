"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Field, fieldErrorProps } from "@/components/forms/field";
import { useLeadForm } from "@/components/forms/use-lead-form";
import { Button } from "@/components/site/ui/button";
import { Input } from "@/components/site/ui/input";
import { Textarea } from "@/components/site/ui/textarea";
import { designCopy } from "@/content/design-copy";
import { contactFormSchema } from "@/lib/leads/form-schemas";

// General contact form. Posts to /api/contact, which creates a lead tagged as a
// contact submission in the casadigital dashboard.
export function ContactForm() {
  const copy = designCopy.contact.form;
  const { status, fieldErrors, reset, formProps } = useLeadForm({
    schema: contactFormSchema,
    endpoint: "/api/contact",
  });

  if (status === "success") {
    return (
      <div className="frontend-card flex flex-col items-center gap-4 p-12 text-center">
        <CheckCircle2 className="size-12 text-frontend-brand" />
        <h3 className="frontend-card-title">
          {copy.success.title}
        </h3>
        <p className="frontend-copy max-w-md">{copy.success.description}</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={reset}>
          {copy.success.resetLabel}
        </Button>
      </div>
    );
  }

  return (
    <form {...formProps} className="frontend-card flex flex-col gap-6 p-8 lg:p-10">
      {/* Honeypot: hidden from humans, bots tend to fill it. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="contact-name" label="Nome" required error={fieldErrors.name}>
          <Input
            id="contact-name"
            name="name"
            placeholder="O seu nome"
            autoComplete="name"
            required
            {...fieldErrorProps("contact-name", fieldErrors.name)}
          />
        </Field>
        <Field id="contact-email" label="Email" required error={fieldErrors.email}>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="[email protected]"
            autoComplete="email"
            required
            {...fieldErrorProps("contact-email", fieldErrors.email)}
          />
        </Field>
      </div>

      <Field id="contact-phone" label="Telefone" error={fieldErrors.phone}>
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder="+351 ..."
          autoComplete="tel"
          {...fieldErrorProps("contact-phone", fieldErrors.phone)}
        />
      </Field>

      <Field id="contact-message" label="Mensagem" required error={fieldErrors.message}>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Como podemos ajudar?"
          required
          {...fieldErrorProps("contact-message", fieldErrors.message)}
        />
      </Field>

      {status === "error" ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-frontend-danger/40 bg-frontend-danger/5 p-4 text-sm text-frontend-danger"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p>{copy.error}</p>
        </div>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="self-start"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? copy.submittingLabel : copy.submitLabel}
      </Button>
    </form>
  );
}
