import { topicDetailResponse, topicResponse } from "@/types/type";
import axios from "axios"

export const getTopics = async()=>{
    try {
        const res = await axios.get<topicResponse>("http://localhost:8080/api/v1/question-topic/get/all");
        return res.data;
    } catch (error) {
        console.log("Failed to fetch Topic: \n",error);
    }
}

export const getTopicDetails = async ({ id, userId }: { id: string; userId: string }) => {
    try {
        const res = await axios.post<topicDetailResponse>(
            `http://localhost:8080/api/v1/question-topic/detail/${id}`,
            { userId }
        );
        
        // Return the data with proper structure
        return {
            success: res.data.success,
            message: res.data.message,
            data: res.data.data
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}