import { Card,IconButton,List,ListItem,ListItemButton,ListItemText, Stack } from "@mui/material"
import { useQuestions } from "./store/questions"
import { Question } from "./types.d"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Footer } from "./Footer";
const Question= ({info}:{info:Question}) => {
    const selectAnswer = useQuestions(state => state.selectAnswer)
    
    const createHandleClick = ( answerindex: number) => () => {
        selectAnswer(info.id, answerindex)
    }

    const getbackgroundcolor=(index:number) => {
        const {useSelectedAnswer, isCorrect} = info
        if (useSelectedAnswer === index && !isCorrect) return 'red'
        if (useSelectedAnswer == null) return 'transparent'
        if (useSelectedAnswer === index) return 'green'
        if (index === info.correctAnswer) return 'green'
        return 'transparent'
    }
    return(
        <Card >
            <h1>{info.question}</h1>
            <SyntaxHighlighter language="javascript" style={docco}>
      {info.code}
    </SyntaxHighlighter>
                <List sx={{textAlign:'center'}}>
                    {info.answers.map((answer, index) => (
                        <ListItem key={index}> 
                        <ListItemButton 
                         onClick={createHandleClick(index)}
                         disabled={info.useSelectedAnswer != null}
                        sx={{backgroundColor: getbackgroundcolor(index)}}
                        >
                            <ListItemText sx={{textAlign:'center'}} primary={answer}></ListItemText></ListItemButton></ListItem>
                    ))}
                    </List>
             
        </Card>
    )
}




export const Game = () => {
    const Questions = useQuestions(state => state.questions)
    const currentQuestion = useQuestions(state => state.currentQuestion)
    const questioninfo = Questions[currentQuestion]
    const goNext = useQuestions(state => state.goNext)
    const goPrev = useQuestions(state => state.goPrev)
    return(
        <>  
        <Stack direction="row" spacing={2} textAlign={'center'} justifyContent={'center'} alignItems={'center'}>     
            <IconButton onClick={goPrev} disabled={currentQuestion === 0}>Prev</IconButton>
           {currentQuestion + 1} / {Questions.length}
            <IconButton onClick={goNext} disabled={currentQuestion === Questions.length -1}>Next</IconButton>
        </Stack> 
        <Question info={questioninfo} ></Question>
        <Footer></Footer>
      </>

    )


}