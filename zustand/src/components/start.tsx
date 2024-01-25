import { Button} from '@mui/material';
import { useQuestions } from '../store/questions';

const LIMIT = 10

export const Start = () => {
    const fecthQuestions = useQuestions(state => state.fecthQuestions)
    const handelClick =  () => {
         fecthQuestions(LIMIT)
    }
    return (
    <>
    <Button onClick={handelClick} variant="contained" color="primary">
    Empezar
    </Button>

    </>
    )   
}