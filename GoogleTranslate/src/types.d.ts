import { type SUPPORTED_LENGUAGES, AUTO_LENGUAGE } from "./constants";

export interface State {
  fromLenguage: FromLenguage;
  toLenguage: Language;
  fromText: string;
  result: string;
  loading: boolean;
}

export type Action =
  | { type: "CHANGE_FROM_LENGUAGE"; payload: FromLenguage }
  | { type: "INTERCHANGE_LENGUAGES" }
  | { type: "CHANGE_TO_LENGUAGE"; payload: Language }
  | { type: "CHANGE_FROM_TEXT"; payload: string }
  | { type: "CHANGE_RESULT"; payload: string };

  export type Language = keyof typeof SUPPORTED_LENGUAGES;
  export type AutoLanguage = typeof AUTO_LENGUAGE;
  export type FromLenguage = Language | AutoLanguage;

  export enum SectionType{
    From = "from",
    To = "to"
  }