import { z } from "zod";

// Field rules for this site's lead forms, mirrored from the casadigital Site API
// (POST /api/v1/leads) so a submission that passes here cannot be rejected there.
// Shared by the forms and the routes that proxy them: the visitor is told what is
// wrong before the request leaves the browser, and again if it arrives without
// having been through the form.
//
// The messages are shown to the visitor, so they live with the rules that produce
// them rather than in design-copy.ts, which the routes cannot reach into.

const MESSAGE_MIN_LENGTH = 10;
const PHONE_PATTERN = /^[0-9+()\s-]{6,20}$/;

// The type-level message matters as much as the others: every message here can end
// up in front of a visitor, so none of them may fall back to a zod default.
const name = z
  .string({ error: "Indique o seu nome." })
  .trim()
  .min(1, "Indique o seu nome.")
  .min(2, "O nome indicado é demasiado curto.");

const email = z
  .string({ error: "Indique o seu email." })
  .trim()
  .min(1, "Indique o seu email.")
  .pipe(z.email("Indique um email válido."));

const message = z
  .string({ error: "Escreva a sua mensagem." })
  .trim()
  .min(1, "Escreva a sua mensagem.")
  .min(MESSAGE_MIN_LENGTH, `Descreva o seu pedido em pelo menos ${MESSAGE_MIN_LENGTH} caracteres.`);

// Optional fields arrive as empty strings from an untouched input, which is not a
// mistake the visitor should be told about.
const optionalText = z.string({ error: "Preenchimento inválido." }).trim().optional();

const optionalPhone = optionalText.refine(
  (value) => !value || PHONE_PATTERN.test(value),
  "Indique um telefone válido.",
);

export const contactFormSchema = z.object({
  name,
  email,
  phone: optionalPhone,
  message,
});

// Field names match the form controls, not the API payload; the route maps them.
export const quoteFormSchema = contactFormSchema.extend({
  service: optionalText,
  "origin-destination": optionalText,
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export type FieldErrors = Record<string, string>;

/**
 * One message per field, in schema order. A field can fail several checks at
 * once and the visitor only needs the first thing to fix.
 */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const fieldErrors: FieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path.join(".");
    if (field && !(field in fieldErrors)) {
      fieldErrors[field] = issue.message;
    }
  }

  return fieldErrors;
}
