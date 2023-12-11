import { useReducer } from "react";
import { Action, Language, FromLenguage, type State } from "../types.d";
import { AUTO_LENGUAGE } from "../constants";

export const initialState: State = {
    fromLenguage: "auto",
    toLenguage: "en",
    fromText: "",
    result: "",
    loading: false,
  };
 export function reducer(state: State, action: Action) {
    const { type } = action;
    if (type === "INTERCHANGE_LENGUAGES") {
        //logica del estado dentro del reducer
        if(state.fromLenguage === AUTO_LENGUAGE)return state;
      return {
        ...state,
        fromLenguage: state.toLenguage,
        toLenguage: state.fromLenguage,
      };
    }
    if (type === "CHANGE_FROM_LENGUAGE") {
      console.log(state.fromLenguage)
      return {
        ...state,
        fromLenguage: action.payload,
       
      };
    }
    if (type === "CHANGE_TO_LENGUAGE") {
      return {
        ...state,
        toLenguage: action.payload,
      };
    }
    if (type === "CHANGE_FROM_TEXT") {
      return {
        ...state,
        loading: true,
        fromText: action.payload,
        result: "",
      };
    }
    if (type === "CHANGE_RESULT") {
      return {
        ...state,
        result: action.payload,
        loading: false,
      };
    }
    return state;
  }
  
  export function useStore(){
    const [{ fromLenguage, toLenguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);


    const interChangeLenguages = () => {
        dispatch({ type: "INTERCHANGE_LENGUAGES" });
        
    }
    const changeFromLenguage = (payload: FromLenguage) => {
        dispatch({ type: "CHANGE_FROM_LENGUAGE", payload });
    }
    const changeToLenguage = (payload: Language) => { 
        dispatch({ type: "CHANGE_TO_LENGUAGE", payload });
    }
    const changeFromText = (payload: string) => {
        dispatch({ type: "CHANGE_FROM_TEXT", payload });
    
    }
    const changeResult = (payload: string) => {
        dispatch({ type: "CHANGE_RESULT", payload });
    }

    return{
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
        
    }
  }