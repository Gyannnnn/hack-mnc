import { featuredQuestionResponse, questionsByCompanyResponse } from "@/types/type";
import axios from "axios";


export const getFeaturedQuestions = async()=>{
    try {
        const res = await axios.get<featuredQuestionResponse>("http://localhost:8080/api/v1/question/featured/get");
        return res.data;
    } catch (error) {
        console.log("Failed to fetch featured Questions");
    }
}

// Enhanced getQuestions with better error handling and caching
let questionCache: Map<string, any> = new Map();

export const getQuestions = async ({ 
  pageParam = 1, 
  search = "" 
}: { 
  pageParam?: number; 
  search: string;
}): Promise<featuredQuestionResponse> => {
  const cacheKey = `questions-${pageParam}-${search}`;
  
  // Check cache first
  if (questionCache.has(cacheKey)) {
    return questionCache.get(cacheKey);
  }

  try {
    const res = await axios.get<featuredQuestionResponse>(
      `http://localhost:8080/api/v1/question/paginated-questions/get?page=${pageParam}&limit=20&search=${encodeURIComponent(search)}`,
      { 
        timeout: 8000, // 8 second timeout
        headers: {
          'Cache-Control': 'max-age=300' // 5 minutes
        }
      }
    );
    
    // Cache successful responses
    questionCache.set(cacheKey, res.data);
    
    // Limit cache size
    if (questionCache.size > 50) {
      const firstKey = questionCache.keys().next().value;
      questionCache.delete(firstKey as string);
    }
    
    return res.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const prefetchFirstPage = () => {
    getQuestions({ pageParam: 1, search: "" })
        .then(() => console.log('First page pre-fetched'))
        .catch(err => console.log('Pre-fetch failed:', err));
};

export const getQuestionsByTopic = async ({ id, pageParam = 1 }: { id: string, pageParam: number }) => {
  try {
    const res = await axios.get<featuredQuestionResponse>(`http://localhost:8080/api/v1/question/get/topic/${id}?page=${pageParam}&limit=20`);
    console.log('API Response:', res.data);
    return res.data;
  } catch (error) {
    console.log('API Error:', error);
    throw error; // Important: throw error so React Query can handle it
  }
}
export const getQuestionsByCompany = async({id,pageParam}:{id: string, pageParam: number})=>{
  try {
    const res = await axios.get<featuredQuestionResponse>(`http://localhost:8080/api/v1/question/company/${id}?page=${pageParam}&limit=20`);
    return res.data
  } catch (error) {
    console.log(error)
  }
}