import { productCollection } from "@/db/product-collection";
import { useAppForm } from "../form/useAppForm";
import { type } from "arktype";

export const addProductSchema = type({
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
      onChange: addProductSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      // postCollection.insert(value);
    },
  });
  return { form };
};
