import { getBlogPosts, getAllCategories } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/blog-card";
import { FeaturedPost } from "@/components/blog/featured-post";
import { CategoryFilter } from "@/components/blog/category-filter";
import { SearchIcon } from "lucide-react";

export const metadata = {
  title: "Blog | HackMNC",
  description:
    "Expert insights on software engineering, interviews, and system design.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const posts = getBlogPosts();
  const categories = getAllCategories();
  const { category: selectedCategory } = await searchParams;

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.metadata.category === selectedCategory)
    : posts;


  const featuredPosts = posts.slice(0, 5);


  const listPosts = filteredPosts;

  return (
    <main className="min-h-screen bg-background pt-24 pb-16 sm:px-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <CategoryFilter categories={categories} />

            {listPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {listPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border">
                <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
                <p className="text-muted-foreground">
                  Try selecting a different category or check back later.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar Sticky Area */}
          <aside className="hidden lg:block lg:col-span-1 space-y-8 sticky top-28 h-fit">
            <div>
              <div className="pl-4 mb-6 border-l-4 border-primary">
                <h2 className="text-xl font-bold text-foreground">
                  Popular Posts
                </h2>
              </div>
              <div className="space-y-4">
                {featuredPosts.map((post) => (
                  <FeaturedPost key={post.slug} post={post} />
                ))}
              </div>
            </div>

            {/* Newsletter or other sidebar content could go here */}
          </aside>
        </div>
      </div>
    </main>
  );
}
