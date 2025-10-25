"use client"
import { useQuestions } from '@/app/hooks/useQuestions';
import React, { useMemo } from 'react'
import SearchBar from './ui/searchBar';
import QuestionControls from './QuestionControls';
import QuestionCard from './ui/questionCard';

export default function CompanyDetails222() {
    const { data, loading, error, params, setParams } = useQuestions({ page: 1, pageSize: 20, sort: "frequency", order: "desc" });

    const topics = useMemo(() => {
    // you should fetch topics from /api/topics; for now derive from results
    const set = new Set<string>();
    data?.data?.data?.forEach(q => q.topics.forEach(t => set.add(t.topic.name)));
    return Array.from(set).sort();
  }, [data]);



  return (
    <div className="cnt">
      <div className="flex flex-col">
        <SearchBar initial={params.q ?? ""} onSearch={(val) => setParams({ ...params, q: val, page: 1 })} />
        <QuestionControls
          difficulty={params.difficulty}
          onDifficultyChange={(d) => setParams({ ...params, difficulty: d, page: 1 })}
          topics={topics}
          topic={params.topic}
          onTopicChange={(t) => setParams({ ...params, topic: t, page: 1 })}
          sort={params.sort}
          onSortChange={(s) => setParams({ ...params, sort: s })}
          order={params.order as any ?? "desc"}
          onOrderChange={(o) => setParams({ ...params, order: o })}
        />

        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">Error: {String(error)}</div>}
        {data && data.data.data.map((d,index)=>(
             <QuestionCard index={index} data={d}/>
        )) }
            {/* {
                data?.data?.data?.map((d,index)=>(
                    <QuestionCard index={index} data={d}/>
                ))
            } */}

      

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4">
          <div>Showing {(data?.data?.data?.length ?? 0)} of {data?.total ?? 0}</div>
          <div className="flex gap-2">
            <button
              disabled={(data?.page ?? 1) <= 1}
              onClick={() => setParams({ ...params, page: (data?.page ?? 1) - 1 })}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              disabled={(data?.page ?? 1) * (data?.pageSize ?? 20) >= (data?.total ?? 0)}
              onClick={() => setParams({ ...params, page: (data?.page ?? 1) + 1 })}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
