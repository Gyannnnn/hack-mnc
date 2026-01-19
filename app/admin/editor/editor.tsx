"use client";

import { useActionState, useEffect, useState } from "react";
import { createBlogAction } from "@/actions/create-blog";
import { Loader2 } from "lucide-react";
import { Author } from "@/types/author.types";
import { GetAllAuthors } from "@/actions/author.actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type ActionState = {
  message?: string;
  error?: string;
  success?: boolean;
};

const initialState: ActionState = {
  message: "",
  error: "",
  success: false,
};

export default function EditorPageComonent() {
  const [state, formAction, isPending] = useActionState(
    createBlogAction,
    initialState,
  );
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Interview Experience",
  );
  const [categories, setCategories] = useState<string[]>([
    "Operating System",
    "System Design",
    "Interview Experience",
    "Computer Networks",
    "DBMS",
    "Hackathon",
    "Interview Questions"
  ]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleCategoryChange = (value: string) => {
    if (value === "new") {
      setIsAddingCategory(true);
    } else {
      setSelectedCategory(value);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories((prev) => [...prev, newCategory.trim()]);
      setSelectedCategory(newCategory.trim());
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  useEffect(() => {
    async function fetchAuthors() {
      const response = await GetAllAuthors();
      if (response && response.data && Array.isArray(response.data)) {
        setAuthors(response.data);
        // Set default author if available
        if (response.data.length > 0) {
          setSelectedAuthor(response.data[0]);
        }
      }
    }
    fetchAuthors();
  }, []);

  const handleAuthorChange = (authorId: string) => {
    const author = authors.find((a) => a.id === authorId);
    setSelectedAuthor(author || null);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Create New Blog Post
            </CardTitle>
            <CardDescription>
              Fill in the details to publish a new blog post.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {state?.error && (
              <div className="p-4 mb-6 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg text-sm">
                {state.error}
              </div>
            )}

            {state?.success && (
              <div className="p-4 mb-6 bg-green-500/10 border border-green-500/50 text-green-500 rounded-lg text-sm">
                {state.message}
              </div>
            )}

            <form action={formAction} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    required
                    placeholder="Blog Title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    required
                    placeholder="blog-url-slug"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <input
                    type="hidden"
                    name="authorId"
                    value={selectedAuthor?.id || ""}
                  />
                  <input
                    type="hidden"
                    name="authorName"
                    value={selectedAuthor?.name || ""}
                  />
                  <input
                    type="hidden"
                    name="authorSlug"
                    value={selectedAuthor?.slug || ""}
                  />
                  <Select
                    onValueChange={handleAuthorChange}
                    value={selectedAuthor?.id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Author" />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <input
                    type="hidden"
                    name="category"
                    value={selectedCategory}
                  />
                  <Select
                    onValueChange={handleCategoryChange}
                    value={selectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                      <SelectItem
                        value="new"
                        className="text-muted-foreground font-medium"
                      >
                        <div className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          <span>Create New Category</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Dialog
                    open={isAddingCategory}
                    onOpenChange={setIsAddingCategory}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Category</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="newCategory">Category Name</Label>
                          <Input
                            id="newCategory"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="e.g. Cloud Computing"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsAddingCategory(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleAddCategory}>
                          Add Category
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image</Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  type="file"
                  accept="image/*"
                />
                <p className="text-xs text-muted-foreground">
                  Upload an image. It will be saved to{" "}
                  <code className="bg-muted p-0.5 rounded">
                    public/blogs-image/[slug]
                  </code>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  required
                  className="min-h-[80px]"
                  placeholder="Short description for SEO and cards..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content (MDX Supported)</Label>
                <Textarea
                  id="content"
                  name="content"
                  required
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="# Hello World..."
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full"
                size="lg"
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {isPending ? "Publishing..." : "Publish Blog"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
