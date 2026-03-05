import { getBlogPosts, getAllCategories } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/blog-card";
import { FeaturedPost } from "@/components/blog/featured-post";
import { CategoryFilter } from "@/components/blog/category-filter";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
            Blogs
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl">
            Real coding interview questions, DSA insights, and developer journeys from the community.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <CategoryFilter categories={categories} />
            </div>

            <div className="max-w-3xl">
              {listPosts.length > 0 ? (
                <div className="flex flex-col space-y-2">
                  {listPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-muted/20 rounded-2xl border border-dashed border-border/50">
                  <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
                  <p className="text-muted-foreground text-sm">
                    Try selecting a different category or check back later.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32 space-y-10">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h2 className="text-xl font-bold text-foreground tracking-tight">
                    Popular Posts
                  </h2>
                </div>
                <div className="flex flex-col gap-6">
                  {featuredPosts.map((post) => (
                    <FeaturedPost key={post.slug} post={post} />
                  ))}
                </div>
              </section>

              {/* Newsletter or other sidebar content */}
              {/* <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <h3 className="font-bold mb-2">Subscribe</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest articles delivered to your inbox.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
                  />
                  <button className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                    Join
                  </button>
                </div>
              </div> */}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
