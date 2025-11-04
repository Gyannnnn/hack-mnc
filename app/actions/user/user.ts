import { userOverallProgressResponse, userProgressResponse } from "@/types/type"
import axios from "axios"

export const getUserProgress = async ({ userId }: { userId: string }) => {
    try {
        const res = await axios.post<userProgressResponse>("https://api.hackmnc.com/api/v1/user/progress", {
            userId
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserOverallProgress = async ({ userId }: { userId: string }) => {
    try {
        const res = await axios.get<userOverallProgressResponse>(`https://api.hackmnc.com/api/v1/user/progress/overall/${userId}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }

}