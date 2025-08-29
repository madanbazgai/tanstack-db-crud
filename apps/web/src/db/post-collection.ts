import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";
import { QueryClient } from "@tanstack/react-query";
import { type } from "arktype";

export const postSchema = type({
  id: "number",
  title: "string",
  body: "string",
});

export type Post = typeof postSchema.infer;

export const postCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["posts"],
    queryFn: async (): Promise<Post[]> => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      return res.json();
    },
    queryClient: new QueryClient(),
    schema: type(postSchema.array()),
    getKey: (item) => item.id,

    onInsert: async ({ transaction }) => {
      const { modified: newTodo } = transaction.mutations[0];
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newTodo),
      });
    },

    onUpdate: async ({ transaction }) => {
      const { original, modified } = transaction.mutations[0];
      await fetch(`https://jsonplaceholder.typicode.com/posts/${original.id}`, {
        method: "PUT",
        body: JSON.stringify(modified),
      });
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await fetch(`https://jsonplaceholder.typicode.com/posts/${original.id}`, {
        method: "DELETE",
      });
    },
  })
);
