export interface QuizSubmission {
 testId: number;
 answers: {
   questionId: number;
   answerId: number;
 }[];
}

// Add this interface for the result
export interface QuizResult {
 score: number;
 totalQuestions: number;
 passed: boolean;
 timeTaken: number;
}