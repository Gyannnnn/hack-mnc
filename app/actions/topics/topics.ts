import { topicDetailResponse, topicResponse } from "@/types/type";
import axios from "axios"

export const getTopics = async()=>{
    try {
        const res = await axios.get<topicResponse>("https://api.hackmnc.com/api/v1/question-topic/get/all");
        return res.data;
    } catch (error) {
        
        console.log("Failed to fetch Topic: \n",error);
    }
}

// stopped using getTopicDetails route after seo 20 

export const getTopicDetails = async ({ id, userId }: { id: string; userId: string }) => {
    try {
        const res = await axios.post<topicDetailResponse>(
            `https://api.hackmnc.com/api/v1/question-topic/detail/${id}`,
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

// new route for topic card after seo 2.0
export const getTopicDetailsByName = async ({ name, userId }: { name: string; userId: string }) => {
    try {
        const res = await axios.post<topicDetailResponse>(
            `https://api.hackmnc.com/api/v1/question-topic/detail-by-name/${name}`,
            { userId }
        );
        

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