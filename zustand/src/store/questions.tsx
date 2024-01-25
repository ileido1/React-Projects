import { create } from 'zustand'
import { Question } from '../types.d'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'
interface State{
    questions: Question[]
    currentQuestion: number
    fecthQuestions: (limit:number) => Promise<void>
    selectAnswer: (questionid: number, answerindex: number) => void
    goNext: () => void,
    goPrev: () => void ,
    reset: () => void
}

export const useQuestions = create<State>()(persist((set,get) => {
return {
    questions: [],
    currentQuestion: 0,
    fecthQuestions: async (limit: number) => {
        const response = await fetch(`http://localhost:5173/data.json`)
        const json = await response.json()
        const questions= json.sort(() => Math.random() - 0.5).slice(0,limit)
        set({questions})
    },
    selectAnswer: (questionid: number, answerindex: number) => {
   
        const newquestions= structuredClone(get().questions)
        const questionindex=  newquestions.findIndex((question) => question.id === questionid)
        const isCorrect = newquestions[questionindex].correctAnswer === answerindex
       if(isCorrect) confetti()
       
        newquestions[questionindex]= {
            ...newquestions[questionindex],
            isCorrect,
            useSelectedAnswer:answerindex}
            set({questions: newquestions})
},
    goNext: () => {
        const {currentQuestion, questions} = get()
        const nextQuestion = currentQuestion + 1
        if (nextQuestion >= questions.length) return
        if (nextQuestion < 0) return
        if (nextQuestion < questions.length) set({currentQuestion: nextQuestion})
    },
goPrev: () => {
        const {currentQuestion} = get()
        const nextQuestion = currentQuestion - 1
        if (nextQuestion >= 0) set({currentQuestion: nextQuestion})
},
reset: () => {
    set({currentQuestion: 0, questions: []})
}
}}, {name: 'questions'
}) )