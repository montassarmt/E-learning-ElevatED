import { Question } from './Question';

export enum TestType {
  QUIZ = 'QUIZ',
  EXAMEN = 'EXAMEN',
}

export interface Test {
  id: number;
  title: string;
  duration: number;
  type: TestType; // Use the enum here
  resultat: string;
  questions: Question[];
}