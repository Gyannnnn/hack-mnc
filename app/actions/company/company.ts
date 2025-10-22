import { companyResponse } from '@/types/type';
import axios from 'axios';


export const getAllCompanies = async()=>{
    try {
        const res = await axios.get<companyResponse>("http://localhost:8080/api/v1/company/featured/get/");
        return res.data;
    } catch (error) {
        console.log(error);

    }
}