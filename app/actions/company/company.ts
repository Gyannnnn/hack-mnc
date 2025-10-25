import { companyDetailResponse, companyResponse } from '@/types/type';
import axios from 'axios';


export const getAllFeaturedCompany = async()=>{
    try {
        const res = await axios.get<companyResponse>("http://localhost:8080/api/v1/company/featured/get/");
        return res.data;
    } catch (error) {
        console.log(error);

    }
}

export const getAllCompanies = async()=>{
    try {
            const res = await axios.get<companyResponse>("http://localhost:8080/api/v1/company/all");
            return res.data;
    } catch (error) {
        console.log(error)
    }
}



export const getCompanyById = async(id:string)=>{
    try {
        const res = await axios.get<companyDetailResponse>(`http://localhost:8080/api/v1/company/get/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}