import { Answer } from "./Answer";
import { Test } from "./Test";

export interface Question {
  id: number;
  text: string;
  testId: number;
  answers: Answer[];
  correctAnswerIndex?: number; // Add correctAnswerIndex
 }