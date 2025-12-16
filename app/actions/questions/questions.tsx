import { featuredQuestionResponse } from "@/types/type";
import axios from "axios";

export const getFeaturedQuestions = async () => {
  try {
    const res = await axios.get<featuredQuestionResponse>(
      "https://api.hackmnc.com/api/v1/question/featured/get"
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestions = async ({
  pageParam = 1,
  search = "",
  userId,
}: {
  pageParam?: number;
  search: string;
  userId: string;
}): Promise<featuredQuestionResponse> => {
  console.log("=== FRONTEND DEBUG ===");
  console.log("Sending request with:");
  console.log("pageParam:", pageParam);
  console.log("search:", search);
  console.log("userId:", userId);
  console.log("=====================");

  try {
    // Add cache busting for "noid" and valid users
    const cacheBuster =
      userId && userId !== "loading" ? `&_t=${Date.now()}` : "";

    const res = await axios.post<featuredQuestionResponse>(
      `https://api.hackmnc.com/api/v1/question/paginated-questions/get?page=${pageParam}&limit=20&search=${encodeURIComponent(
        search
      )}${cacheBuster}`,
      {
        userId: userId,
      },
      {
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          // Don't cache for "noid" or valid users
          "Cache-Control":
            userId && userId !== "loading" ? "no-cache" : "max-age=300",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getQuestionsByTopic = async ({
  id,
  pageParam = 1,
  userId,
}: {
  id: string;
  pageParam: number;
  userId: string;
}) => {
  try {
    const res = await axios.get<featuredQuestionResponse>(
      `https://api.hackmnc.com/api/v1/question/get/topic/${id}/${userId}?page=${pageParam}&limit=20`
    );
    console.log("API Response:", res.data);
    return res.data;
  } catch (error) {
    console.log("API Error:", error);
    throw error;
  }
};

export const getQuestionsByCompany = async ({
  companyName,
  pageParam,
  userId,
}: {
  companyName: string;
  pageParam: number;
  userId: string;
}) => {
  try {
    const res = await axios.post<featuredQuestionResponse>(
      `https://api.hackmnc.com/api/v1/question/companyName/${companyName}?page=${pageParam}&limit=20`,
      {
        userId,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
