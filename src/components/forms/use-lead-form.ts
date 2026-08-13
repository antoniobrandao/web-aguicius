"use client";

import { useState } from "react";
import type { z } from "zod";

import { toFieldErrors, type FieldErrors } from "@/lib/leads/form-schemas";

export type LeadFormStatus = "idle" | "submitting" | "success" | "error";

// Submit behaviour shared by this site's lead forms: validate against the same
// schema the route uses, keep the browser's own bubbles out of the way, and put
// every message next to the field that caused it. A banner is only for failures
// that belong to no field, like an unreachable platform.
export function useLeadForm<Schema extends z.ZodType>({
  schema,
  endpoint,
}: {
  schema: Schema;
  endpoint: string;
}) {
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function rejectFields(form: HTMLFormElement, errors: FieldErrors) {
    setFieldErrors(errors);
    setStatus("idle");
    focusFirstInvalidField(form, errors);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Held in a variable because currentTarget is gone by the time the request
    // settles.
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const parsed = schema.safeParse(payload);

    if (!parsed.success) {
      rejectFields(form, toFieldErrors(parsed.error));
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      // The honeypot travels with the payload, so the raw entries are sent rather
      // than the parsed data the schema strips it from.
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; fieldErrors?: FieldErrors }
        | null;

      if (response.ok && result?.success) {
        setStatus("success");
        return;
      }

      if (result?.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
        rejectFields(form, result.fieldErrors);
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  // A field the visitor is correcting should stop shouting at them.
  function handleInput(event: React.FormEvent<HTMLFormElement>) {
    const field = (event.target as HTMLElement & { name?: string }).name;

    if (!field || !fieldErrors[field]) return;

    setFieldErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  return {
    status,
    fieldErrors,
    reset() {
      setFieldErrors({});
      setStatus("idle");
    },
    formProps: {
      noValidate: true,
      onSubmit: handleSubmit,
      onInput: handleInput,
    },
  };
}

function focusFirstInvalidField(form: HTMLFormElement, errors: FieldErrors) {
  for (const element of Array.from(form.elements)) {
    const field = (element as HTMLElement & { name?: string }).name;

    if (field && errors[field] && element instanceof HTMLElement) {
      element.focus();
      return;
    }
  }
}
