"use client";

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; // Assuming you have a utils file for merging classes

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentCategory = searchParams.get('category');

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
        params.delete(name);
    } else {
        params.set(name, value);
    }
    return params.toString();
  };

  const handleCategoryClick = (category: string) => {
    router.push(pathname + '?' + createQueryString('category', category));
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => handleCategoryClick('all')}
        className={cn(
          "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
          !currentCategory
            ? "bg-primary text-primary-foreground border-primary shadow-sm"
            : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:bg-muted"
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
            currentCategory === category
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:bg-muted"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
