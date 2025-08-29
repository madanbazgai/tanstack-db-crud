import { postCollection } from "@/db/post-collection";
import { useAppForm } from "../form/useAppForm";
import { type } from "arktype";

export const addPostSchema = type({
  title: "string > 5",
  description: "string > 10",
});

export const useForm = () => {
  const form = useAppForm({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onChange: addPostSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      // postCollection.insert(value);
    },
  });
  return { form };
};
