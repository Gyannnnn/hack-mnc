export interface Company {
  logoSmall: string;
  logo: string;
  name: string;
}
export interface QuestionCompany {
  id: string;
  companyId: string;
  questionId: string;
  frequency: number;
  lastAskedAt: string | null;
  questionName: string;
  company: Company;
}
export interface Topic {
  name: string;
}
export interface QuestionTopic {
  id: string;
  questionId: string;
  topicId: string;
  topic: Topic;
}
export interface Question {
  name: string;
  leetCodeLink: string;
  frequency: number;
  acceptanceRate: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  companies: QuestionCompany[];
  topics: QuestionTopic[];
}