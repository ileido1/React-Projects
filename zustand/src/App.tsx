import "./App.css";
import { Container, Stack } from "@mui/material";
import { Jslogo } from "./assets/logo";
import { Start } from "./components/start";
import { useQuestions } from "./store/questions";
import { Game } from "./Game";
function App() {
  const questions = useQuestions((state) => state.questions);
  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction={"row"}
          gap={2}
          alignItems={"center"}
          justifyContent="center"
        >
          <Jslogo />
            <h1>React Typescript</h1>
        </Stack>
        {questions.length > 0 && <Game></Game> }
        {questions.length === 0 &&<Start></Start>}
      </Container>
    </main>
  );
}

export default App;
