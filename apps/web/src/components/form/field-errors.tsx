import type { AnyFieldMeta } from "@tanstack/react-form";
import type { ArkError } from "arktype";

type FieldErrorsProps = {
  meta: AnyFieldMeta;
};

export const FieldErrors = ({ meta }: FieldErrorsProps) => {
  if (!meta.isTouched) return null;

  return meta.errors.map(({ message }: ArkError, index) => (
    <p key={index} className="text-sm font-medium text-destructive">
      {message}
    </p>
  ));
};
