import { AlertCircle } from "lucide-react";

import { Label } from "@/components/site/ui/label";

/**
 * Marks a control as invalid and points it at its message. Spread onto the input
 * itself, since the message is rendered by its Field wrapper.
 */
export function fieldErrorProps(id: string, error?: string) {
  if (!error) return {};

  return { "aria-invalid": true, "aria-describedby": `${id}-error` } as const;
}

export function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-frontend-brand"> *</span> : null}
      </Label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-xs text-frontend-danger"
        >
          <AlertCircle className="mt-px size-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
