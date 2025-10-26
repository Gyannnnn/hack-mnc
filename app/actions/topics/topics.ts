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

export const getTopicDetails = async({id}:{id: string})=>{
    try {
        const res = await axios.get<topicDetailResponse>(`http://localhost:8080/api/v1/question-topic/detail/${id}`);
        return res.data
    } catch (error) {
        console.log(error);
    }
}