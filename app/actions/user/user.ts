import { userOverallProgressResponse, userProgressResponse } from "@/types/type"
import axios from "axios"

export const getUserProgress = async ({ userId }: { userId: string }) => {
    try {
        const res = await axios.post<userProgressResponse>("http://localhost:8080/api/v1/user/progress", {
            userId
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserOverallProgress = async ({ userId }: { userId: string }) => {
    try {
        const res = await axios.get<userOverallProgressResponse>(`http://localhost:8080/api/v1/user/progress/overall/${userId}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }

}