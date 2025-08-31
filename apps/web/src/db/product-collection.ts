import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";
import { QueryClient } from "@tanstack/react-query";
import { type } from "arktype";

export const productSchema = type({
  id: "number",
  title: "string",
  price: "string",
  description: "string",
  image: "string",
  category: "string",
});

export type Product = typeof productSchema.infer;
const URL = "https://fakestoreapi.com/products";

export const productCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["posts"],
    queryFn: async (): Promise<Product[]> => {
      const res = await fetch(`${URL}?limit=10`);
      return res.json();
    },
    queryClient: new QueryClient(),
    schema: type(productSchema.array()),
    getKey: (item) => item.id,

    onInsert: async ({ transaction }) => {
      const { modified: newProduct } = transaction.mutations[0];
      await fetch(URL, {
        method: "POST",
        body: JSON.stringify(newProduct),
      });
    },

    onUpdate: async ({ transaction }) => {
      const { original, modified } = transaction.mutations[0];
      await fetch(`${URL}/${original.id}`, {
        method: "PUT",
        body: JSON.stringify(modified),
      });
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await fetch(`${URL}/${original.id}`, {
        method: "DELETE",
      });
    },
  }),
);
