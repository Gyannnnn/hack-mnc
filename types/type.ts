import { boolean } from "zod"

export interface company {
  id: string
  name: string,
  type: string,
  ctc: number,
  logo: string,
  _count: {
    questions: number
  }
  logoSmall: string,
  questions: featuredQuestions[]
}

export interface companyDetails {
  name: string,

}




export interface companyResponse {
  success: boolean
  message: string,
  data: company[]
}


export interface topic {
  id: string
  name: string
  _count: {
    questions: number
  }

}

export interface topicResponse {
  success: boolean
  message: string,
  data: topic[]

}

export interface featuredQuestions {
  name: string
  frequency: number
  acceptanceRate: number
  difficulty: string
  leetCodeLink: string,
  id: string,
  topics: Array<{
    id: string
    questionId: string
    topicId: string
    topic: {
      name: string
    }
  }>
  companies: Array<{
    company: {
      logoSmall: string,
      name: string
    }
  }>
  isSolved: boolean
}

export interface featuredQuestionResponse {
  success: boolean
  message: string
  data: {
    fetchQuestions: featuredQuestions[]
    hasMore: boolean
  }
}

export interface companyDetailResponse {
  success: boolean,
  message: string,
  data: company
}

export interface questionsByCompanyResponse {
  success: boolean,
  message: string
  data: featuredQuestions[]
}


export interface queryQuestionResponse {
  total: number;
  page: number;
  pageSize: number;
  data: featuredQuestions[];
}

export interface topicStats {
  topic: {
    name: string
  },
  totalNumberOfQuestions: number,
  easy: number,
  medium: number,
  hard: number,
  easySolved: number,
  mediumSolved: number,
  hardSolved: number
}

export interface topicDetailResponse {
  success: boolean,
  message: string,
  data: topicStats
}



export interface signInResponse {
  success: boolean,
  message: string,
  data: {
    user: {
      id: string
      name: string
      email: string
      password: string
      role: string,
      streak: number,
      emailVerified: string,
      image: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date
    },
    token: string
  }
}


export interface companyCardDetails{

    success: boolean,
    message: string
    data: {
        company: {
            id: string
            name: string
            type:string
            ctc: number,
            logo:string
            logoSmall: string
        },
        totalNumberOfQuestions: number,
        easy: number,
        medium: number,
        hard: number,
        userProgressData: {
            totalQuestionsSolved: number,
            percentageCompleted: number,
            easySolved: number,
            mediumSolved: number,
            hardSolved: number
        }
    }

}