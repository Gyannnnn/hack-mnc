import { companyCardDetails, companyDetailResponse, companyResponse } from '@/types/type';
import axios from 'axios';


export const getAllFeaturedCompany = async () => {
    try {
        const res = await axios.get<companyResponse>("https://api.hackmnc.com/api/v1/company/featured/get/");
        return res.data;
    } catch (error) {
        console.log(error);

    }
}

export const getAllCompanies = async () => {
    try {
        const res = await axios.get<companyResponse>("https://api.hackmnc.com/api/v1/company/all");
        return res.data;
    } catch (error) {
        console.log(error)
    }
}



export const getCompanyById = async (id: string) => {
    try {
        const res = await axios.get<companyDetailResponse>(`https://api.hackmnc.com/api/v1/company/get/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export const getCompanyDetails = async ({ companyName, userId }: { companyName: string, userId: string }) => {
    try {
        const res = await axios.post<companyCardDetails>(" https://api.hackmnc.com/api/v1/company/detailsByname", {
            companyName,
            userId: userId
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}