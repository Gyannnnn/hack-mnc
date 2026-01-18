import { userOverallProgressResponse, userProgressResponse } from "@/types/type"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.hackmnc.com";

export const getUserProgress = async ({ userId, token }: { userId: string, token?: string }) => {
    try {
        const headers: Record<string, string> = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        const res = await axios.post<userProgressResponse>(`${API_URL}/api/v1/user/progress`, {
            userId
        }, { headers })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserOverallProgress = async ({ userId, token }: { userId: string, token?: string }) => {
    try {
        const headers: Record<string, string> = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        const res = await axios.get<userOverallProgressResponse>(`${API_URL}/api/v1/user/progress/overall/${userId}`, { headers });
        return res.data;
    } catch (error) {
        console.log(error)
    }

}