import { getBlogPosts } from '@/lib/mdx';
import { BlogCard } from '@/components/blog/blog-card';
import { notFound } from 'next/navigation';
import { User, MapPin, Link as LinkIcon, Twitter, Github } from 'lucide-react';

export default async function AuthorPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const posts = getBlogPosts();
  
  // Filter posts by author
  const authorPosts = posts.filter(
    (post) => post.metadata.author.toLowerCase() === decodedName.toLowerCase()
  );

  if (authorPosts.length === 0) {
    // Ideally we would have a separate authors data source, but for now we infer existence from posts
    // If no posts, maybe author doesn't exist or just hasn't written anything
    return notFound();
  }

  const authorName = authorPosts[0].metadata.author; // formatting (e.g. "Gyanaranjan Patra")

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Author Profile Header */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary flex-shrink-0 border-4 border-background shadow-lg">
                {authorName.charAt(0)}
            </div>
            
            <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{authorName}</h1>
                <p className="text-muted-foreground mb-4 max-w-2xl">
                    Software Engineer and Tech Enthusiast. Passionate about distributed systems, operating systems, and helping others crack their dream interviews.
                </p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> Bangalore, India
                    </div>
                    <div className="flex items-center gap-1">
                        <LinkIcon className="w-4 h-4" /> hackmnc.com
                    </div>
                    {/* Socials */}
                    <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border">
                        <a href="#" className="hover:text-foreground transition-colors"><Twitter className="w-4 h-4" /></a>
                        <a href="#" className="hover:text-foreground transition-colors"><Github className="w-4 h-4" /></a>
                    </div>
                </div>
            </div>

            <div className="text-center px-6 py-4 bg-muted/50 rounded-xl">
                 <div className="text-3xl font-bold text-primary">{authorPosts.length}</div>
                 <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Articles Published</div>
            </div>
        </div>

        {/* Author's Posts */}
        <h2 className="text-2xl font-bold mb-6">Articles by {authorName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
            ))}
        </div>

      </div>
    </main>
  );
}
