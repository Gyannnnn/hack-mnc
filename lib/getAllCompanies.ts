import axios from 'axios';

export interface FeaturedQuestion {
  id: string;
  title: string;
  difficulty?: string;
  topic?: string;
}

export interface Company {
  id: string;
  name: string;
  type: string;
  ctc: number;
  logo: string;
  logoSmall: string;
  _count: {
    questions: number;
  };
  questions: FeaturedQuestion[];
}

export interface CompanyResponse {
  success: boolean;
  message: string;
  data: Company[];
}

export const getAllCompaniesForSeo = async (): Promise<Company[]> => {
  try {
    const res = await axios.get<CompanyResponse>(
      'https://api.hackmnc.com/api/v1/company/all'
    );

    // ✅ Return only the array of companies, not the wrapper object
    return res.data.data || [];
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
};
