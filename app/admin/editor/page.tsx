"use client";

import { useActionState } from 'react';
import { createBlogAction } from '@/actions/create-blog';
import { Loader2 } from 'lucide-react';

const initialState = {
  message: '',
  error: '',
  success: false
};

export default function EditorPage() {
  // @ts-expect-error - useActionState types can be tricky
  const [state, formAction, isPending] = useActionState(createBlogAction, initialState);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>

        {state?.error && (
            <div className="p-4 mb-6 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg">
                {state.error}
            </div>
        )}
        
        {state?.success && (
            <div className="p-4 mb-6 bg-green-500/10 border border-green-500/50 text-green-500 rounded-lg">
                {state.message}
            </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <input name="title" required className="w-full p-2 border rounded-md bg-background" placeholder="Blog Title" />
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-medium">Slug</label>
                <input name="slug" required className="w-full p-2 border rounded-md bg-background" placeholder="blog-url-slug" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Author</label>
                <input name="author" defaultValue="Gyanaranjan Patra" className="w-full p-2 border rounded-md bg-background" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                 <select name="category" className="w-full p-2 border rounded-md bg-background">
                    <option value="Operating System">Operating System</option>
                    <option value="System Design">System Design</option>
                    <option value="Interview Experience">Interview Experience</option>
                    <option value="Computer Networks">Computer Networks</option>
                    <option value="DBMS">DBMS</option>
                 </select>
            </div>
          </div>
          
          <div className="space-y-2">
               <label className="text-sm font-medium">Cover Image URL</label>
               <input name="coverImage" className="w-full p-2 border rounded-md bg-background" placeholder="https://..." />
          </div>

          <div className="space-y-2">
               <label className="text-sm font-medium">Summary</label>
               <textarea name="summary" required className="w-full p-2 border rounded-md bg-background min-h-[80px]" placeholder="Short description for SEO and cards..." />
          </div>

          <div className="space-y-2">
               <label className="text-sm font-medium">Content (MDX Supported)</label>
               <textarea name="content" required className="w-full p-4 border rounded-md bg-background min-h-[400px] font-mono text-sm" placeholder="# Hello World..." />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? 'Publishing...' : 'Publish Blog'}
          </button>
        </form>
      </div>
    </div>
  );
}
