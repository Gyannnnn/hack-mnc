import axios from "axios";
import { AuthorResponse } from "@/types/author.types";


export const GetAllAuthors = async (): Promise<AuthorResponse | null> => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/author/all");
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}