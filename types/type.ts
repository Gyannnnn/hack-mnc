export interface company {
  id: string
  name: string,
  type: string,
  ctc: number,
  logo: string,
  _count: {
    questions: number
  }
  logoSmall: string
}




export interface companyResponse {
  success: boolean
  message: string,
  data: company[]
}


interface topic {
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

interface featuredQuestions {
  name: string
  frequency: number
  acceptanceRate: number
  difficulty: string
  leetCodeLink: string
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
      logoSmall: string
    }
  }>
}

export interface featuredQuestionResponse {
  success: boolean
  message: string
  data: {
    fetchQuestions: featuredQuestions[]
    hasMore: boolean
  }
}