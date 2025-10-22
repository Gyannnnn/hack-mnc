import { featuredQuestionResponse } from "@/types/type";
import axios from "axios";


export const getFeaturedQuestions = async()=>{
    try {
        const res = await axios.get<featuredQuestionResponse>("http://localhost:8080/api/v1/question/featured/get");
        return res.data;
    } catch (error) {
        console.log("Failed to fetch featured Questions");
    }
}


export const getQuestions = async ({ pageParam = 1 }: { pageParam?: number }): Promise<featuredQuestionResponse> => {
  try {
    const res = await axios.get<featuredQuestionResponse>(
      `http://localhost:8080/api/v1/question/paginated-questions/get?limit=30&page=${pageParam}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export const getQuestionsByTopic = async(id:string)=>{
  try {
    const res = await axios.get<featuredQuestionResponse>(`http://localhost:8080/api/v1/question/get/topic/${id}`);
    console.log(res.data)
    return res.data;
    
  } catch (error) {
    console.log(error);
  }
}