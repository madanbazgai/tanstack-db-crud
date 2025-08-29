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
import { postCollection, type Post } from "@/db/post-collection";
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
  const { data: posts } = useLiveQuery((q) => q.from({ postCollection }));

  const updatePost = (post: Post) => {
    postCollection.update(post.id, (draft) => {
      draft.title = post.title;
      draft.body = post.body;
    });
  };

  const deletePost = (post: Post) => {
    postCollection.delete(post.id);
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
          {posts.map((post) => (
            <div key={post.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {post.id}
                    </span>
                  </div>
                  <h3 className="font-medium text-sm truncate mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.body}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 ml-2"
                      aria-label={`Actions for post ${post.id}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => updatePost?.(post)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deletePost?.(post)}
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
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-mono text-xs">{post.id}</TableCell>
                <TableCell className="font-medium max-w-[200px]">
                  <div className="truncate" title={post.title}>
                    {post.title}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground max-w-[300px]">
                  <div className="truncate" title={post.body}>
                    {post.body}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      aria-label={`Edit post ${post.id}`}
                      onClick={() => updatePost?.(post)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      aria-label={`Delete post ${post.id}`}
                      onClick={() => deletePost?.(post)}
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

      {posts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No posts found. Create your first post to get started.</p>
        </div>
      )}
    </div>
  );
}
