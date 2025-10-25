"use client";
import { getQuestions } from "@/app/actions/questions/questions";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderCircle, LoaderCircleIcon, Search } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import QuestionCard from "./ui/questionCard";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";

export default function Q2() {
  // --- SEARCH STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Debounce search to avoid too many API calls
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setDebouncedSearchQuery(query);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery, debouncedSearch]);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch, // Add refetch for search
  } = useInfiniteQuery({
    queryKey: ["questions", debouncedSearchQuery], // Include search in query key
    queryFn: ({ pageParam = 1 }) => getQuestions({ 
      pageParam, 
      search: debouncedSearchQuery // Pass search to API
    }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.hasMore ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    enabled: true, // Ensure queries run
  });

  const allQuestions =
    data?.pages.flatMap((page) => page.data.fetchQuestions) || [];

  // --- SORT & FILTER STATES ---
  const [sortOption, setSortOption] = useState("default");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");

  // --- HANDLE SCROLL ---
  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100;
    if (bottom && hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  // --- COLOR FUNCTION ---
  const levelColor = (level: string): string => {
    if (level === "EASY") return "text-green-500";
    else if (level === "MEDIUM") return "text-yellow-500";
    else return "text-red-500";
  };

  // --- FILTER + SORT LOGIC ---
  const filteredAndSortedQuestions = useMemo(() => {
    let result = [...(allQuestions || [])];

    // Client-side filtering (complements server-side search)
    if (difficultyFilter !== "all") {
      result = result.filter((q) => q.difficulty === difficultyFilter);
    }

    if (topicFilter !== "all") {
      result = result.filter((q) =>
        q.topics.some((t) =>
          t.topic.name.toLowerCase().includes(topicFilter.toLowerCase())
        )
      );
    }

    // Client-side sorting
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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

  // --- RENDER LOGIC (after all hooks) ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoaderCircle className="animate-spin h-8 w-8" />
        <span className="ml-2">Loading questions...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-8 text-red-500">
        Error loading questions: {error?.message || "Unknown error"}
      </div>
    );
  }

  return (
    <div className="cnt flex flex-col gap-3">
      {/* --- Search Bar --- */}
      <div className="relative mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search questions (e.g., 2sum, reverse string, etc.)"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-10 py-2 w-full"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          )}
        </div>
        {debouncedSearchQuery && (
          <p className="text-sm text-muted-foreground mt-2">
            Searching for: "{debouncedSearchQuery}"
          </p>
        )}
      </div>

      {/* --- Filter + Sort Controls --- */}
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

      {/* --- Questions List --- */}
      {filteredAndSortedQuestions.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">No questions found</p>
            <p className="text-muted-foreground">
              {searchQuery || topicFilter !== "all" || difficultyFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No questions available"}
            </p>
            {(searchQuery || topicFilter !== "all" || difficultyFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setTopicFilter("all");
                  setDifficultyFilter("all");
                }}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {filteredAndSortedQuestions.map((question, index) => (        
            <QuestionCard key={`${question.name}-${index}`} data={question} index={index} />
          ))}
        </>
      )}

      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <LoaderCircleIcon className="h-10 w-10 animate-[spin_0.5s_linear_infinite] text-primary" />
          <span className="ml-2">Loading more questions...</span>
        </div>
      )}

      {!hasNextPage && filteredAndSortedQuestions.length > 0 && (
        <div className="flex justify-center py-4">
          <p>No more questions to load.</p>
        </div>
      )}
    </div>
  );
}