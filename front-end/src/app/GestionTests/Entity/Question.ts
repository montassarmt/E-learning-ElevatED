import { Answer } from "./Answer";
import { Test } from "./Test";

export interface Question {
  id: number;
  text: string;
  test: {
    id: number;  // Only the ID of the Test, not the full object
  };
  answers: Answer[]; // Assuming Answer is another interface
}
