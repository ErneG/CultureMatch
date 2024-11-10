export interface Question {
  question: string;
  description: string;
  attribute: string;
}

export interface Questionnaire {
  jobseeker_questionnaire: Question[];
}
