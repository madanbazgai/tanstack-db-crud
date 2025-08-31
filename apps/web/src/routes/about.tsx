import { AddPostForm } from "@/components/post/add-post";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { productCollection, type Product } from "@/db/product-collection";
import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: products } = useLiveQuery((q) => q.from({ productCollection }));

  const updateProduct = (product: Product) => {
    productCollection.update(product.id, (draft) => {
      draft.title = product.title;
      draft.description = product.description;
      draft.price = product.price;
      draft.category = product.category;
    });
  };

  const deleteProduct = (product: Product) => {
    productCollection.delete(product.id);
  };

  return (
    <div className="rounded-2xl border">
      <div className="p-4 border-b">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Add New Post</Button>
          </SheetTrigger>
          <SheetContent>
            <AddPostForm />
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden">
        <div className="divide-y">
          {products.map((product) => (
            <div key={product.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {product.id}
                    </span>
                  </div>
                  <h3 className="font-medium text-sm truncate mb-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 ml-2"
                      aria-label={`Actions for product ${product.id}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => updateProduct?.(product)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteProduct?.(product)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead className="min-w-[150px]">Title</TableHead>
              <TableHead className="min-w-[200px]">Body</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-mono text-xs">
                  {product.id}
                </TableCell>
                <TableCell className="font-medium max-w-[200px]">
                  <div className="truncate" title={product.title}>
                    {product.title}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground max-w-[300px]">
                  <div className="truncate" title={product.description}>
                    {product.description}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      aria-label={`Edit post ${product.id}`}
                      onClick={() => updateProduct?.(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      aria-label={`Delete post ${product.id}`}
                      onClick={() => deleteProduct?.(product)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No posts found. Create your first post to get started.</p>
        </div>
      )}
    </div>
  );
}
