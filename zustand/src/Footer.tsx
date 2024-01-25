import { Button } from "@mui/material"
import { useQuestions } from "./store/questions"

export const Footer = () => {
    const questions = useQuestions(state => state.questions)
    let correct =0 
    let incorrect =0
    let unanswered =0

    questions.forEach((question) => {
        if(question.useSelectedAnswer == null) unanswered++
        if(question.isCorrect) correct++
        if(question.isCorrect === false) incorrect++
    })

    const reset = useQuestions(state => state.reset)


    return(
       <footer>
              <h2>Results</h2>
              <p>Correct: {correct}</p>
              <p>Incorrect: {incorrect}</p>
              <p>Unanswered: {unanswered}</p>
              <Button variant="contained" onClick={() => reset()}>Restart</Button>
       </footer>
    )

}