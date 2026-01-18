import { companyCardDetails, companyDetailResponse, companyResponse } from '@/types/type';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.hackmnc.com";

export const getAllFeaturedCompany = async () => {
    try {
        const res = await axios.get<companyResponse>(`${API_URL}/api/v1/company/featured/get/`);
        return res.data;
    } catch (error) {
        console.log(error);

    }
}

export const getAllCompanies = async () => {
    try {
        const res = await axios.get<companyResponse>(`${API_URL}/api/v1/company/all`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}



export const getCompanyById = async (id: string) => {
    try {
        const res = await axios.get<companyDetailResponse>(`${API_URL}/api/v1/company/get/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export const getCompanyDetails = async ({ companyName, userId, token }: { companyName: string, userId: string, token?: string }) => {
    try {
        const headers: Record<string, string> = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        const res = await axios.post<companyCardDetails>(`${API_URL}/api/v1/company/detailsByname`, {
            companyName,
            userId: userId
        }, { headers })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}