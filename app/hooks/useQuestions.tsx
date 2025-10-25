// hooks/useQuestions.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { queryQuestionResponse } from "@/types/type";

type Params = {
  q?: string;
  difficulty?: string;
  topic?: string;
  sort?: string;
  order?: "asc"|"desc";
  page?: number;
  pageSize?: number;
};

export function useQuestions(initialParams: Params = {}) {
  const [params, setParams] = useState<Params>(initialParams);
  const [data, setData] = useState<queryQuestionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async (p: Params) => {
    setLoading(true);
    setError(null);
    const url = new URL("http://localhost:8080/api/v1/question/question-search-query", location.origin);
    Object.entries(p).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    });
    try {
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      console.log(res)
      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return { data, loading, error, params, setParams, refresh: () => fetchData(params) };
}
