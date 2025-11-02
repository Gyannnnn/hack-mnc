"use client";
import { getQuestions } from "@/app/actions/questions/questions";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderCircle, LoaderCircleIcon } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import QuestionCard from "./ui/questionCard";
import { useSession } from "next-auth/react";


const levelColor = (level: string): string => {
  if (level === "EASY") return "text-green-500";
  if (level === "MEDIUM") return "text-yellow-500";
  return "text-red-500";
};


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

const LoadingState = () => (
  <div className="flex justify-center items-center py-8 gap-2">
    <LoaderCircle className="animate-spin h-8 w-8" />
    <span className="ml-2">Loading questions...</span>
  </div>
);

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
          : "No questions available"}
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

export default function Q2({userId}:{userId:string}) {
  // --- SORT & FILTER STATES ---
  const [sortOption, setSortOption] = useState("default");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
 
//   const { data: session } = useSession();

// const userId = session?.user.id ? session.user.id : "noid";
console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
console.log(userId);
if(userId === "noid"){ return <div><h1>pelo</h1></div>}
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["questions"], 
    queryFn: ({ pageParam = 1 }) => getQuestions({ 
      pageParam, 
      search: "", 
      userId
    }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.hasMore ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    enabled: true,
    staleTime: 5 * 60 * 1000, 
  });

  // Flatten all questions with useMemo
  const allQuestions = useMemo(() =>
    data?.pages.flatMap((page) => page.data.fetchQuestions) || [],
    [data]
  );

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 500; // Increased threshold for earlier loading
    
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

  // Filter and sort logic with useMemo
  const filteredAndSortedQuestions = useMemo(() => {
    let result = [...allQuestions];

    // Apply difficulty filter
    if (difficultyFilter !== "all") {
      result = result.filter((q) => q.difficulty === difficultyFilter);
    }

    // Apply topic filter
    if (topicFilter !== "all") {
      result = result.filter((q) =>
        q.topics.some((t) =>
          t.topic.name.toLowerCase().includes(topicFilter.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortOption === "acceptance-high") {
      result.sort((a, b) => b.acceptanceRate - a.acceptanceRate);
    } else if (sortOption === "acceptance-low") {
      result.sort((a, b) => a.acceptanceRate - b.acceptanceRate);
    } else if (sortOption === "frequency") {
      result.sort((a, b) => b.frequency - a.frequency);
    } else if (sortOption === "title") {
      result.sort((a, b) => a.name.localeCompare(b.name));
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

  // Memoize question cards to prevent unnecessary re-renders
  const questionCards = useMemo(() => 
    filteredAndSortedQuestions.map((question, index) => (        
      <QuestionCard 
        key={`${question.name}-${index}`} 
        data={question} 
        index={index}
        type="topic"
        companyId="" 
     
      />
    )),
    [filteredAndSortedQuestions]
  );




  // --- RENDER LOGIC ---
  if (isLoading) {
    return <LoadingState />;
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