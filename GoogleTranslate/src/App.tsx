import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect} from "react";
import { useStore } from "./hooks/useStore";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AUTO_LENGUAGE } from "./constants";
import {ArrowIcon} from "./components/icons"
import {LanguageSelector} from "./components/LanguageSelector"
import { SectionType } from "./types.d";
import { TextArea } from "./components/TextArea";
import { translate } from "./services/traslate";
function App() {
 const {
  fromLenguage,
  toLenguage,
  fromText,
  result,
  loading,
  changeFromLenguage,
  interChangeLenguages,
  changeResult,
  changeFromText,
  changeToLenguage
  
} = useStore();

 useEffect(()=>{
  if(fromText === "") return;
translate(fromText,fromLenguage,toLenguage)
.then((result)=>{
  if (result === null) return;
  changeResult(result)})
},[fromText])

  return(
  <>
    <Container fluid>
    <Row>
      <Col>
      <LanguageSelector type={SectionType.From} value={fromLenguage} onChange={changeFromLenguage}></LanguageSelector>
      <TextArea loading={loading} value={fromText} onChange={changeFromText}   type={SectionType.From} ></TextArea>
      </Col>
      <Col><Button variant='link'
       disabled={fromLenguage === AUTO_LENGUAGE} onClick={()=>interChangeLenguages()}>
        <ArrowIcon></ArrowIcon>
        </Button></Col>
      <Col>
       <LanguageSelector type={SectionType.To} value={toLenguage} onChange={changeToLenguage}></LanguageSelector>
        <TextArea loading={loading} placeholder="translated" value={result} onChange={changeResult} type={SectionType.To}></TextArea>
      </Col>

    </Row>
    </Container>
  </>
  )
}

export default App;
