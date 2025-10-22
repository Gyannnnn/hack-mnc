// components/CategoryFilter.tsx
'use client'

import { useState } from 'react'
import { Article } from '@/utils/notion'

interface Props {
  articles: Article[]
  categories: string[]
}

export function CategoryFilter({ articles, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.categories.includes(selectedCategory))

  return (
    <div>
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filtered Articles */}
      <div className="grid gap-4">
        {filteredArticles.map(article => (
          <div key={article.id} className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg">{article.title}</h3>
            <p className="text-gray-600">{article.summary}</p>
          </div>
        ))}
      </div>
    </div>
  )
}