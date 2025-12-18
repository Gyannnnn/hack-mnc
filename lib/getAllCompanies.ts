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

export interface AllTopicResponse {
  success: boolean,
  message: string
  data: [
    {
      name: string
    },
  ]
}

export const getAllCompaniesForSeo = async (): Promise<Company[]> => {
  try {
    const res = await axios.get<CompanyResponse>(
      'https://api.hackmnc.com/api/v1/company/sitemap-details'
    );


    return res.data.data || [];
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
};

export const getAllTopicsForSeo = async (): Promise<Company[]> => {
  try {
    const res = await axios.get<CompanyResponse>(
      'https://api.hackmnc.com/api/v1/question-topic/sitemap-details'
    );


    return res.data.data || [];
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
};
