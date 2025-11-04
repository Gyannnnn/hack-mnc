"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LoaderCircle, LoaderCircleIcon } from 'lucide-react';
import QuestionCard from './ui/questionCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getQuestionsByCompany } from '@/app/actions/questions/questions';
import QuestionCardLoader from './QuestionCardLoader';



const FilterControls = React.memo(({
  sortOption,
  setSortOption,
  difficultyFilter,
  setDifficultyFilter,
  topicFilter,
  setTopicFilter
}: {
  sortOption: string;
  setSortOption: (value: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (value: string) => void;
  topicFilter: string;
  setTopicFilter: (value: string) => void;
}) => (
  <div className="flex flex-wrap gap-3 mb-4 justify-between items-center">
    {/* Sort */}
    <div className="flex gap-2 items-center">
      <p className="font-semibold">Sort by:</p>
      <Select value={sortOption} onValueChange={setSortOption}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Sort option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="acceptance-high">Acceptance ↑</SelectItem>
          <SelectItem value="acceptance-low">Acceptance ↓</SelectItem>
          <SelectItem value="frequency">Frequency</SelectItem>
          <SelectItem value="title">Title (A–Z)</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Filter Difficulty */}
    <div className="flex gap-2 items-center">
      <p className="font-semibold">Difficulty:</p>
      <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="EASY">Easy</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="HARD">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Filter Topic */}
    <div className="flex gap-2 items-center">
      <p className="font-semibold">Topic:</p>
      <input
        type="text"
        placeholder="Search topic..."
        className="border rounded-md px-2 py-1 w-48"
        value={topicFilter === "all" ? "" : topicFilter}
        onChange={(e) =>
          setTopicFilter(e.target.value.trim() === "" ? "all" : e.target.value)
        }
      />
    </div>
  </div>
));

FilterControls.displayName = 'FilterControls';

// const LoadingState = () => (
//   <div className="flex justify-center items-center py-8 gap-2">
//     <LoaderCircle className="animate-spin h-8 w-8" />
//     <span className="ml-2">Loading questions...</span>
//   </div>
// );

const ErrorState = ({ error }: { error: Error }) => (
  <div className="flex justify-center items-center py-8 text-red-500">
    Error loading questions: {error?.message || "Unknown error"}
  </div>
);

const NoResultsState = ({ 
  hasFilters, 
  onClearFilters 
}: { 
  hasFilters: boolean; 
  onClearFilters: () => void; 
}) => (
  <div className="flex justify-center items-center py-8">
    <div className="text-center">
      <p className="text-lg font-semibold mb-2">No questions found</p>
      <p className="text-muted-foreground">
        {hasFilters
          ? "Try adjusting your filters"
          : "No questions available for this company"}
      </p>
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Clear all filters
        </button>
      )}
    </div>
  </div>
);

const LoadingMoreState = () => (
  <div className="flex justify-center py-4">
    <LoaderCircleIcon className="h-10 w-10 animate-[spin_0.5s_linear_infinite] text-primary" />
    <span className="ml-2">Loading more questions...</span>
  </div>
);

const NoMoreResultsState = () => (
  <div className="flex justify-center py-4">
    <p>No more questions to load.</p>
  </div>
);

export default function CompanyDetails({ id,userId }: { id: string, userId: string, companyId:string }) {
  const [sortOption, setSortOption] = useState("default");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["company-questions", id], // Include company ID in query key
    queryFn: ({ pageParam = 1 }) => getQuestionsByCompany({ 
      id,
      pageParam,
      userId
    }),
    getNextPageParam: (lastPage, allPages) => {
      // Fix: Check if lastPage exists and has data with hasMore
      return lastPage?.data?.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!id, // Only enable when id is available
    staleTime: 5 * 60 * 1000,
  });

  // Flatten all questions with useMemo and safe access
  const allQuestions = useMemo(() => {
    if (!data?.pages) return [];
    
    return data.pages.flatMap((page) => {
      // Safely access fetchQuestions with fallback
      return page?.data?.fetchQuestions || [];
    });
  }, [data]);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 500;
    
    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Optimized scroll event listener
  useEffect(() => {
    let ticking = false;
    
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  // Filter and sort logic with useMemo and safe access
  const filteredAndSortedQuestions = useMemo(() => {
    let result = [...allQuestions];

    // Apply difficulty filter
    if (difficultyFilter !== "all") {
      result = result.filter((q) => q?.difficulty === difficultyFilter);
    }

    // Apply topic filter with safe access
    if (topicFilter !== "all") {
      result = result.filter((q) =>
        q?.topics?.some((t) =>
          t?.topic?.name?.toLowerCase().includes(topicFilter.toLowerCase())
        )
      );
    }

    // Apply sorting with safe access
    if (sortOption === "acceptance-high") {
      result.sort((a, b) => (b?.acceptanceRate || 0) - (a?.acceptanceRate || 0));
    } else if (sortOption === "acceptance-low") {
      result.sort((a, b) => (a?.acceptanceRate || 0) - (b?.acceptanceRate || 0));
    } else if (sortOption === "frequency") {
      result.sort((a, b) => (b?.frequency || 0) - (a?.frequency || 0));
    } else if (sortOption === "title") {
      result.sort((a, b) => (a?.name || '').localeCompare(b?.name || ''));
    }
    // Default sorting (by frequency)
    else {
      result.sort((a, b) => (b?.frequency || 0) - (a?.frequency || 0));
    }

    return result;
  }, [allQuestions, sortOption, difficultyFilter, topicFilter]);

  // Clear filters handler
  const handleClearFilters = useCallback(() => {
    setSortOption("default");
    setDifficultyFilter("all");
    setTopicFilter("all");
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => 
    sortOption !== "default" || difficultyFilter !== "all" || topicFilter !== "all",
    [sortOption, difficultyFilter, topicFilter]
  );

  // Memoize question cards to prevent unnecessary re-renders with safe access
  const questionCards = useMemo(() => 
    filteredAndSortedQuestions.map((question, index) => {        
      if (!question) return null;
     
      return (
        <QuestionCard 
          key={`${question?.name}-${index}`} 
          data={question} 
          index={index} 
          companyId={id}
          type='company'
          
        />
      );
    }).filter(Boolean), // Remove any null entries
    [filteredAndSortedQuestions,id]
  );

  // --- RENDER LOGIC ---
  if (isLoading) {
    return <QuestionCardLoader />;
  }

  if (isError) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Filter Controls */}
      <FilterControls
        sortOption={sortOption}
        setSortOption={setSortOption}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
        topicFilter={topicFilter}
        setTopicFilter={setTopicFilter}
      />

      {/* Questions List */}
      {filteredAndSortedQuestions.length === 0 ? (
        <NoResultsState 
          hasFilters={hasActiveFilters} 
          onClearFilters={handleClearFilters} 
        />
      ) : (
        <>
          {questionCards}
        </>
      )}

      {/* Loading and pagination states */}
      {isFetchingNextPage && <LoadingMoreState />}
      {!hasNextPage && filteredAndSortedQuestions.length > 0 && <NoMoreResultsState />}
    </div>
  );
}