import { Question } from "./Question";

export interface Answer {
 id: number;
 text: string;
 isCorrect: boolean;
 questionId: number;  // This should correspond to the Question ID
}