import { useStore } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { useFormContext } from "./useAppForm";

type SubmitButtonProps = {
  children: React.ReactNode;
};

export const SubmitButton = ({ children }: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => {
    console.log("state", state);

    return [state.isSubmitting, state.canSubmit];
  });

  return (
    <Button type="submit" disabled={isSubmitting || !canSubmit}>
      {children}
    </Button>
  );
};
