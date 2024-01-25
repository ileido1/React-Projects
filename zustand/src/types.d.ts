export interface Question{
        id: number;
        question: string;
        code: string;
        answers: string[];
        correctAnswer: number;
        useSelectedAnswer: number;
        isCorrect: boolean;
}
export type Store = {
    count: number
    inc: () => void
  }