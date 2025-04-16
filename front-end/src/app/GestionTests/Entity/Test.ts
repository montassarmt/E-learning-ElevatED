import { Question } from './Question';

export enum TestType {
  QUIZ = 'QUIZ',
  EXAMEN = 'EXAMEN',
}

export interface Test {
  id: number;
  title: string;
  duration: number;
  type: TestType;
  resultat: string;
  questions: Question[];
  createdBy?: {  // Add createdBy field
    id: number;
    username: string;
    email: string;
  };
}